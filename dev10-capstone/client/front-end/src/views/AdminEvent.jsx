import {useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import EventTable from '../components/EventTable';

function AdminEvent() {

    const auth = useContext(AuthContext);

    const [events, setEvents] = useState([]);

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
            fetch(`http://localhost:8080/club/${clubId}/event`)
            .then((response) => {
                if (response.status !== 200) {
                return Promise.reject("No events found");
                }
                return response.json();
            })
            .then(setEvents)
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        <Link className="button is-pulled-right mr-5" id="btnAdd" to='/event/add'>Add Event</Link>
        {events.length == 0 ?
            <div className="alert alert-warning py-4">
                No events found.<br />
                Do you want to add a club event?
            </div>
            : <EventTable events={events} />}
        </div>
        
    );
}

export default AdminEvent;