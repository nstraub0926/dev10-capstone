import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import AuthContext from "../context/AuthContext";

function BookingForm({bookingId, clubId, handleClose}) {

    const [booking, setBooking] = useState({
        clubId: clubId,
        facility: "",
        status: 0,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    });

    const auth = useContext(AuthContext);
    
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(bookingId) {
            fetch(`http://localhost:8080/club/booking/${clubId}/${bookingId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("No booking found");
                }
                return response.json();
                })
                .then((data) => setBooking(data))
                .catch(console.log);
            }
        }, [clubId, bookingId]);

    function handleChange(evt) {

        setBooking(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            return next;
        });

    }

    async function add(booking) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(booking)
        }
    
        await fetch("http://localhost:8080/club/booking", init)
        .then((response) => {
            if (response.status === 201) {  
                handleClose();
                navigate("/admin/bookings");
                location.reload();
                return response.json();
            }
        })
        .catch(console.log);
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function update(booking) {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(booking)
        }
    
        await fetch(`http://localhost:8080/club/booking/${booking.bookingId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleClose();
                navigate("/admin/bookings");
                location.reload();
                return response.json();
            }
        })
        .catch(console.log);
    
        const errors = await response.json();
        return Promise.reject(errors);
    }
    
    async function save(booking) {
        return booking.bookingId ? update(booking) : add(booking);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(booking)
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
                            <header className="modal-card-head title b* is-3">{bookingId ? "Edit Booking" : "Add Booking"}</header>
                            <div className="field">
                                <label className="label">Facility | Utility</label>
                                <div className="control">
                                    <input className="input" type="text" name="facility" value={booking.facility} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Start Date</label>
                                <div className="control">
                                    <Calendar name="startDate" value={booking.startDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">End Date</label>
                                <div className="control">
                                    <Calendar name="endDate" value={booking.endDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="columns is-centered m-5">
                                <div className="field column is-4">
                                    <label className="label">Start Time</label>
                                    <div className="control">
                                        <input className="input" type="time" name="startTime" value={booking.startTime} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="field column is-4">
                                    <label className="label">End Time</label>
                                    <div className="control">
                                        <input className="input" type="time" name="endTime" value={booking.endTime} onChange={handleChange} required />
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

export default BookingForm;