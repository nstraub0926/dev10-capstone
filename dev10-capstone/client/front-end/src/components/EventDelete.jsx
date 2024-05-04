import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

// function convertDate(date) {
//     const d = new Date(date);
//     return d.toDateString();
// }

// function convertTime(time) {
//     time = time.split(':');
//     var hours = Number(time[0]);
//     var minutes = Number(time[1]);

//     var timeValue;

//     if (hours > 0 && hours <= 12) {
//     timeValue= "" + hours;
//     } else if (hours > 12) {
//     timeValue= "" + (hours - 12);
//     } else if (hours == 0) {
//     timeValue= "12";
//     }
    
//     timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
//     timeValue += (hours >= 12) ? " P.M" : " A.M";

//     return timeValue;
// }

function EventDelete({eventId, clubId, handleDeleteClose}) {

    const [event, setEvent] = useState([]);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(eventId) {
            fetch(`http://localhost:8080/club/event/${clubId}/${eventId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("No event found");
                }
                return response.json();
                })
                .then((data) => setEvent(data))
                .catch(console.log);
            }
        }, [clubId, eventId]);

    async function handleDelete(evt) {
        evt.preventDefault();
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
        };
        await fetch(`http://localhost:8080/club/event/${event.eventId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleDeleteClose();
                navigate("/admin/events");
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
                            <h1 className="title is-3 has-text-centered">Delete Event</h1>
                            <p className="subtitle">Are you sure you want to delete this ?</p>
                            <ul>
                                <li><strong>Event Name:</strong> {event.title}</li>
                                <li><strong>Event Location:</strong> {event.location}</li>
                                <li><strong>Event Date:</strong> {event.date}</li>
                                <li><strong>Event Start Time:</strong> {event.startTime}</li>
                                <li><strong>Event End Time:</strong> {event.endTime}</li>
                            </ul>
                        </div>
                        <footer className="modal-card-foot">
                            <p className="card-footer-item">
                                <span><button className="button" id="btnDelete">Delete</button></span>
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

export default EventDelete;