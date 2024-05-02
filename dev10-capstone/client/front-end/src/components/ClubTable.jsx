import {useState, useEffect} from 'react';

export default function ClubTable({clubs, searchTerm}) {
    
    // useEffect(() => {
    //     fetch(`http://localhost:8080/club/search?input=${searchTerm.searchTerm}`)
    //     .then((response) => {
    //         if (response.status !== 200) {
    //           return Promise.reject("No clubs found");
    //         }
    //         return response.json();
    //       })
    //       .then(setClubs)
    //       .catch(console.log);
    //   }, []);

    return (
        <div className="container is-fluid">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Club Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Membership Fee</th>
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
                                <td><button className="button is-primary">Join</button></td>
                            </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}