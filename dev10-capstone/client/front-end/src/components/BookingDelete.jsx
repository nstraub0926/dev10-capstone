import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

function BookingDelete({bookingId, clubId, handleDeleteClose}) {

    const [booking, setBooking] = useState([]);

    const auth = useContext(AuthContext);
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

    async function handleDelete(evt) {
        evt.preventDefault();
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
        };
        await fetch(`http://localhost:8080/club/booking/${booking.bookingId}`, init)
        .then((response) => {
            if (response.status === 204) {
                handleDeleteClose();
                navigate("/admin/bookings");
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
                            <h1 className="title is-3 has-text-centered">Delete Booking</h1>
                            <p className="subtitle">Are you sure you want to delete this booking?</p>
                            <ul>
                                <li>Facility | Utility: {booking.facility}</li>
                            </ul>
                        </div>
                        <footer className="modal-card-foot">
                            <p className="card-footer-item">
                                <span><button className="button" id="btnDelete" type="submit">Delete</button></span>
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

export default BookingDelete;