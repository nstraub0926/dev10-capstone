import { Link } from "react-router-dom";

function MemberTable({ members }) {
    return (
        <table className="table is-fullwidth is-hoverable table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Membership Status</th>
                    <th>Membership Type</th>
                    <th>Membership Start Date</th>
                    <th>Membership End Date</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member) => (
                    <tr key={member.memberId}>
                        <td>{member.appUserId}</td>
                        <td>{member.name}</td>
                        <td>{member.phone}</td>
                        <td>{member.address}</td>
                        <td>{member.membershipStatus}</td>
                        <td>{member.membershipType}</td>
                        <td>{member.joinDate}</td>
                        <td>{member.expirationDate}</td>
                        <td>
                            <Link type="button" className="button is-danger is-outlined is-rounded is-small" to={`../member/delete/${member.memberId}`}>Delete</Link>
                            <Link type="button" className="button is-warning is-outlined is-rounded is-small" to={`../member/edit/${member.memberId}`}>Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default MemberTable;