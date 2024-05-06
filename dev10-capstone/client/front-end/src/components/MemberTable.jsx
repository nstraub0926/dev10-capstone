function convertDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString( "en-US", { timeZone: "UTC" } );
}

function MemberTable({ setMemberId, members, handleOpen, handleDeleteOpen}) {
    
    function handleClick(memberId, toggle) {
        setMemberId(memberId);
        if (toggle) {
            handleOpen();
        } else {
            handleDeleteOpen();
        }
    }

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
                        <td>{convertDate(member.joinDate)}</td>
                        <td>{convertDate(member.expirationDate)}</td>
                        <td>
                            <button type="button" className="button is-danger is-outlined is-rounded is-small" onClick={() => handleClick(member.memberId, false)}>Delete</button>
                            <button type="button" className="button is-warning is-outlined is-rounded is-small" onClick={() => handleClick(member.memberId, true)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default MemberTable;