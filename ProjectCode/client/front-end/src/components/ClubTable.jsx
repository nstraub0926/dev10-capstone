import {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';

export default function ClubTable({clubs}) {

    const auth = useContext(AuthContext);
    
    async function handleJoin(clubId) {
        
        await fetch(`http://localhost:8080/member/app_user/${auth.user.appUserId}`)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject("Member not found");
            }
            return response.json();
        })
        .then((member) => {
            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.user.token}`,
                },
                body: JSON.stringify({clubId: clubId, memberId: member.memberId})
            }
            fetch("http://localhost:8080/club-member", init)
            .then((response) => {
                if (response.status === 201) {
                    alert("Successfully joined the club");
                } else {
                    return Promise.reject("Failed to join the club");
                }
            })
            .catch(console.log);
        })
        .catch(console.log);
        
    }
    
    return (
        <div className="container is-fluid">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Club Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th> Membership Fee </th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clubs.map((club, index) => {
                        return (
                            <tr key={index}>
                                <td>{club.name}</td>
                                <td>{club.category}</td>
                                <td>{club.location}</td>
                                <td>${club.membershipFee}</td>
                                <td>{club.description}</td>
                                <td><button onClick={() => handleJoin(club.clubId)} className="button is-primary">Join</button></td>
                            </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}