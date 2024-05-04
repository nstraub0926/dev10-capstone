import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import AuthContext from "../context/AuthContext";

function MemberForm({memberId, clubId, handleClose}) {

    const [member, setMember] = useState({
        appUserId: "",
        name: "",
        phone: "",
        address: "",
        membershipStatus: "",
        membershipType: "",
        joinDate: "",
        expirationDate: "",
    });

    const auth = useContext(AuthContext);
    
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(memberId) {
            fetch(`http://localhost:8080/member/${memberId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("No member found");
                }
                return response.json();
                })
                .then((data) => setMember(data))
                .catch(console.log);
            }
        }, [memberId]);

    function handleChange(evt) {

        setMember(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            return next;
        });

    }

    async function add(member) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(member)
        }
    
        await fetch("http://localhost:8080/member", init)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
        })
        .then((data) => {
            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.user.token}`,
                },
                body: JSON.stringify({clubId: clubId, memberId: data.memberId})
            }
            fetch("http://localhost:8080/club-member", init)
            .then((response) => {
                if (response.status === 201) {  
                    handleClose();
                    navigate("/admin/members");
                    location.reload();
                    return response.json();
                }
            })
            .catch(console.log);

        });
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function update(member) {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(member)
        }
    
        await fetch(`http://localhost:8080/member/${member.memberId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleClose();
                navigate("/admin/members");
                location.reload();
                return response.json();
            }
        })
        .catch(console.log);
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function save(member) {
        return member.memberId ? update(member) : add(member);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(member)
        .catch(errors => setErrors(errors));
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background is-light"></div>
                <div className="modal-content card has-text-centered">
                    {errors && errors.length > 0 && <div className="alert alert-danger">
                        <ul className="mb-0">
                            {errors.map(err => <li key={err}>{err}</li>)}
                        </ul>
                    </div>}
                    <section className="modal-card-body">
                        <form onSubmit={handleSubmit}>
                            <header className="modal-card-head title b* is-3">{memberId ? "Edit Member" : "Add Member"}</header>
                            <div className="columns is-centered m-5">
                                <input type="hidden" name="memberId" value={member.memberId} />
                                <div className="field m-1">
                                    <label className="label" htmlFor="appUserId">User ID</label>
                                    <div className="control">
                                        <input className="input" id="appUserId" name="appUserId" type="text" required
                                            onChange={handleChange} value={member.appUserId} />
                                    </div>
                                </div>
                                <div className="field m-1">
                                    <label className="label" htmlFor="name">Name</label>
                                    <div className="control">
                                        <input id="name" name="name" type="text" className="input" required
                                            onChange={handleChange} value={member.name} />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field m-1">
                                    <label className="label" htmlFor="phone">Phone</label>
                                    <div className="control">
                                        <input id="phone" name="phone" type="text" className="input" required
                                            onChange={handleChange} value={member.phone} />
                                    </div>
                                </div>
                                <div className="field m-1">
                                    <label className="label" htmlFor="address">Address</label>
                                    <div className="control">
                                        <input id="address" name="address" type="text" className="input" required
                                            onChange={handleChange} value={member.address} />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="field m-1">
                                    <label className="label" htmlFor="membershipStatus">Membership Status</label>
                                    <label className="radio">
                                    <input id="membershipStatus" name="membershipStatus" type="radio" className="control" required
                                        onChange={handleChange} value="Active" checked={member.membershipStatus === "Active"}/>
                                        Active
                                    </label>
                                    <label className="radio">
                                    <input id="membershipStatus" name="membershipStatus" type="radio" className="control" required
                                        onChange={handleChange} value="Inactive" checked={member.membershipStatus === "Inactive"}/>
                                        Inactive
                                    </label>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="field m-1">
                                    <label className="label" htmlFor="membershipType">Membership Type</label>
                                    <div className="control">
                                        <select id="membershipType" name="membershipType" className="select" required 
                                            onChange={handleChange} value={member.membershipType}>
                                            <option value="Basic">Basic</option>
                                            <option value="Premium">Premium</option>
                                            <option value="VIP">VIP</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered">
                                <div className="field m-1">
                                    <label className="label" htmlFor="joinDate">Join Date</label>
                                    <Calendar id="joinDate" name="joinDate" className="control" required
                                        onChange={handleChange} value={member.joinDate} />
                                </div>
                                <div className="field m-1">
                                    <label className="label" htmlFor="expirationDate">Expiration Date</label>
                                    <Calendar id="expirationDate" name="expirationDate" className="control" required
                                        onChange={handleChange} value={member.expirationDate} />
                                </div>
                            </div>
                            <footer className="modal-card-foot">
                                <div className="field is-grouped is-pulled-right mt-5">
                                    <div className="control">
                                        <button className="button is-success" type="submit">Save</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-danger" type="button" onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>
                            </footer>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default MemberForm;