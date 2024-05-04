import {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/AuthContext";
import MemberDelete from '../components/MemberDelete';
import MemberForm from '../components/MemberForm';
import MemberTable from '../components/MemberTable';

function AdminMember() {

    const auth = useContext(AuthContext);

    const [members, setMembers] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [clubId, setClubId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleDeleteOpen = () => {
        setDeleteModalOpen(true);
    }

    const handleClose = () => {
        setMemberId(null);
        setIsModalOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteModalOpen(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/club/app_user/${auth.user.appUserId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
        .then((response) => {
            if (response.status !== 200) {
              return Promise.reject("No clubs found");
            }
            return response.text();
          })
          .then(clubId => {
            fetch(`http://localhost:8080/club/${clubId}/member`)
            .then((response) => {
                if (response.status !== 200) {
                return Promise.reject("No members found");
                }
                return response.json();
            })
            .then(setMembers)
            .then(() => setClubId(clubId))
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        {isModalOpen && <MemberForm memberId={memberId} clubId={clubId} handleClose={handleClose} />}
        {deleteModalOpen && <MemberDelete memberId={memberId} clubId={clubId} handleDeleteClose={handleDeleteClose} />}
        <button className="button is-pulled-right mr-5" id="btnAdd" onClick={handleOpen}>Add Member</button>
        {members.length == 0 ?
            <div className="alert alert-warning py-4">
                No members found.<br />
                Do you want to add a club member?
            </div>
            : <MemberTable setMemberId={setMemberId} members={members} handleOpen={handleOpen} handleDeleteOpen={handleDeleteOpen}/>}
        </div>
        
    );
}

export default AdminMember;