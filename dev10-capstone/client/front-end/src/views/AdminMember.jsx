import {useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MemberTable from '../components/MemberTable';

function AdminMember() {

    const auth = useContext(AuthContext);

    const [members, setMembers] = useState([]);

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
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        <Link className="button is-pulled-right mr-5" id="btnAdd" to='/member/add'>Add Member</Link>
        {members.length == 0 ?
            <div className="alert alert-warning py-4">
                No members found.<br />
                Do you want to add a club member?
            </div>
            : <MemberTable members={members} />}
        </div>
        
    );
}

export default AdminMember;