import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

function convertDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString( "en-US", { timeZone: "UTC" } );
}

function generateImageByCategory(category) {
    switch (category) {
        case "Fitness":
            return "https://cdn-icons-png.flaticon.com/128/3043/3043888.png";
        case "Hobby": 
            return "https://cdn-icons-png.flaticon.com/128/12663/12663042.png";
        case "Social":
            return "https://cdn-icons-png.flaticon.com/128/2907/2907439.png";
        case "Service":
            return "https://cdn-icons-png.flaticon.com/128/2252/2252184.png";
    }
}

function Profile() {

    const [member, setMember] = useState([]);
    const [clubs, setClubs] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:8080/member/${auth.user.appUserId}`)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject("Member not found");
            }
            return response.json();
        })
        .then((member) => {
            setMember(member);
            fetch(`http://localhost:8080/club-member/${member.memberId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("Clubs not found");
                }
                return response.json();
            })
            .then(setClubs)
            .catch(console.log);
        })
    }, []);

    return (
        <section className="hero is-primary is-fullheight section" id="profile">
            <div className="hero-body">
                <div className="container">
                <div className="columns has-same-height is-centered">
                <div className="column">
                    <div className="box has-text-centered has-background-white">
                        <div>
                            <div className="flex-shrink-0 image is-128x128 m-auto">
                                <img alt="profile" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LWtsaGRkM2FuLmpwZw.jpg" className="is-rounded"/>
                            </div>
                            <div className="mb-4">
                                <p className="has-text-grey-dark m-4 is-size-4">
                                    {member.name}
                                </p>
                                <p className="has-text-grey-dark-light is-size-7">
                                    {member.membershipType}
                                </p>
                                <p className="has-text-grey-dark-light is-size-7">
                                    {member.membershipStatus}
                                </p>
                            </div>
                            <button>
                            <div className="file">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" />
                                    <span className="file-cta">
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-upload"></i>
                                    </span>
                                    <span className="file-label"> Upload… </span>
                                    </span>
                                </label>
                            </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="card-content">
                            <h3 className="has-text-grey-dark-light subtitle m-4 is-4"><strong>Profile</strong></h3>
                            <div className="content">
                                <table className="table-profile">
                                    <tr>
                                        <th colSpan="1"></th>
                                        <th colSpan="2"></th>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{member.address}</td>    
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td>{member.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Join Date:</td>
                                        <td>{convertDate(member.joinDate)}</td>
                                    </tr>
                                    <tr>
                                        <td>Expiration Date:</td>
                                        <td>{convertDate(member.expirationDate)}</td>
                                    </tr>
                                </table>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                    <div className="card-content">
                        <h3 className="has-text-grey-dark-light subtitle m-4 is-4"><strong>Clubs</strong></h3>
                        <div className="content">
                            <ul>
                                {clubs.map((club) => (
                                    <li key={club.clubId} className="box mb-1 has-background-white">
                                        <article className="media">
                                            <figure className="media-left">
                                                <div className="flex-shrink-0 image is-64x64 m-auto">
                                                    <img src={generateImageByCategory(club.category)} className="is-rounded"/>
                                                </div>
                                            </figure>
                                            <div className="media-content">
                                                <div className="content">
                                                    <p>
                                                        <strong className="has-text-dark">
                                                            {club.name}
                                                        </strong>
                                                        <br/>
                                                        <span className="has-text-grey-dark">
                                                            {club.description}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Profile;