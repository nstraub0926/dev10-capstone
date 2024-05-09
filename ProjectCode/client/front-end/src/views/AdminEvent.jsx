import {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/AuthContext";
import EventDelete from '../components/EventDelete';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';

function AdminEvent() {

    const auth = useContext(AuthContext);

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(null);
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
        setEventId(null);
        setIsModalOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteModalOpen(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/club/app_user/${auth.user.appUserId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
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
            .then(() => setClubId(clubId))
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        {isModalOpen && <EventForm eventId={eventId} clubId={clubId} handleClose={handleClose} />}
        {deleteModalOpen && <EventDelete eventId={eventId} clubId={clubId} handleDeleteClose={handleDeleteClose} />}
        <button className="button is-pulled-right mr-5" id="btnAdd" onClick={handleOpen}>Add Event</button>
        {events.length == 0 ?
            <div className="alert alert-warning py-4">
                No events found.<br />
                Do you want to add a club event?
            </div>
            : <EventTable setEventId={setEventId} events={events} handleOpen={handleOpen} handleDeleteOpen={handleDeleteOpen}/>}
        </div>
        
    );
}

export default AdminEvent;