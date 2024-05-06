import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

function MemberDelete({memberId, clubId, handleDeleteClose}) {

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

    const [clubMemberId, setClubMemberId] = useState("");

    const auth = useContext(AuthContext);
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

    useEffect(() => {
        if(clubId) {
            fetch(`http://localhost:8080/club-member/${clubId}/${memberId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("No club member found");
                }
                return response.text();
                })
                .then(clubMemberId => setClubMemberId(clubMemberId))
                .catch(console.log);
            }
        }, [clubId, memberId]);

    async function handleDelete(evt) {
        evt.preventDefault();
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
        };
        await fetch(`http://localhost:8080/club-member/${clubMemberId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleDeleteClose();
                navigate("/admin/members");
                location.reload();
                return response.json();
            }
        })
    
        const errors = await response.json();
        return Promise.reject(errors);
    }

    return (
        <div className="modal is-active">
            <div className="modal-background is-light"></div>
            <section className="modal-content">
                <form onSubmit={handleDelete}>
                    <div className="modal-card-body card container is-fluid has-text-centered">
                        <div className="card-content">
                            <h1 className="title is-3 has-text-centered">Delete Member</h1>
                            <p className="subtitle">Are you sure you want to delete this member?</p>
                            <ul>
                                <li><strong>ID:</strong> {member.appUserId}</li>
                                <li><strong>Name:</strong> {member.name}</li>
                                <li><strong>Phone Number:</strong> {member.phone}</li>
                                <li><strong>Address:</strong> {member.address}</li>
                            </ul>
                        </div>
                        <footer className="modal-card-foot">
                            <p className="card-footer-item">
                                <span><button className="button" id="btnDelete" type="submit">Delete</button></span>
                            </p>
                            <p className="card-footer-item">
                                <span><button className="button" id="btnCancel" onClick={handleDeleteClose}>Cancel</button></span>
                            </p>
                        </footer>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default MemberDelete;