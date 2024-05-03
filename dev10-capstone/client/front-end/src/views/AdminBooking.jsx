import {useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import BookingTable from '../components/BookingTable';

function AdminBooking() {

    const auth = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);

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
            fetch(`http://localhost:8080/club/${clubId}/booking`)
            .then((response) => {
                if (response.status !== 200) {
                return Promise.reject("No bookings found");
                }
                return response.json();
            })
            .then(setBookings)
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        <Link className="button is-pulled-right mr-5" id="btnAdd" to='/booking/add'>Add Booking</Link>
        {bookings.length == 0 ?
            <div className="alert alert-warning py-4">
                No bookings found.<br />
                Do you want to add a club booking?
            </div>
            : <BookingTable bookings={bookings} />}
        </div>
        
    );
}

export default AdminBooking;