import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import AuthContext from "../context/AuthContext";

function EventForm({eventId, clubId, handleClose}) {

    const [event, setEvent] = useState({
        clubId: clubId,
        title: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        imgUrl: "",
    });

    const auth = useContext(AuthContext);
    
    const [errors, setErrors] = useState([]);

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

    function handleChange(evt) {

        setEvent(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            return next;
        });

    }

    async function add(event) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(event)
        }
    
        await fetch("http://localhost:8080/club/event", init)
        .then((response) => {
            if (response.status === 201) {  
                handleClose();
                navigate("/admin/events");
                location.reload();
                return response.json();
            }
        })
        .catch(console.log);
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function update(event) {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(event)
        }
    
        await fetch(`http://localhost:8080/club/event/${event.eventId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleClose();
                navigate("/admin/events");
                location.reload();
                return response.json();
            }
        })
        .catch(console.log);
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function save(event) {
        return event.eventId ? update(event) : add(event);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(event)
        .catch(errors => setErrors(errors));
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background is-light"></div>
                <div className="modal-content card has-text-centered">
                    {errors && errors.length > 0 && <div className="alert alert-danger">
                        <ul className="mb-0">
                            {errors.map(err => <li key={err}>{err}</li>)}
                        </ul>
                    </div>}
                    <section className="modal-card-body">
                        <form onSubmit={handleSubmit}>
                            <header className="modal-card-head title b* is-3">{eventId ? "Edit Event" : "Add Event"}</header>
                            <div className="columns is-centered m-5">
                                <div className="field column is-4">
                                    <label className="label">Event Name</label>
                                    <div className="control">
                                        <input className="input" type="text" name="title" value={event.title} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="field column is-4">
                                    <label className="label">Location</label>
                                    <div className="control">
                                        <input className="input" type="text" name="location" value={event.location} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field column is-4">
                                    <label className="label">Start Time</label>
                                    <div className="control">
                                        <input className="input" type="time" name="startTime" value={event.startTime} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="field column is-4">
                                    <label className="label">End Time</label>
                                    <div className="control">
                                        <input className="input" type="time" name="endTime" value={event.endTime} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field column is-8">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea className="textarea" name="description" value={event.description} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field m-1">
                                    <label className="label" htmlFor="joinDate">Date</label>
                                    <Calendar id="date" name="date" className="control" required
                                        onChange={handleChange} value={event.date} />
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field column is-4">
                                    <label className="label">Image URL</label>
                                    <div className="control">
                                        <input className="input" type="text" name="imgUrl" value={event.imgUrl} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <footer className="modal-card-foot">
                                <div className="field is-grouped is-pulled-right mt-5">
                                    <div className="control">
                                        <button className="button is-success" type="submit">Save</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-danger" type="button" onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>
                            </footer>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default EventForm;