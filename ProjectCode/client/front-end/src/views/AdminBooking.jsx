import {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/AuthContext";
import BookingDelete from '../components/BookingDelete';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingTable';

function AdminBooking() {

    const auth = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);
    const [bookingId, setBookingId] = useState(null);
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
        setBookingId(null);
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
            fetch(`http://localhost:8080/club/${clubId}/booking`)
            .then((response) => {
                if (response.status !== 200) {
                return Promise.reject("No bookings found");
                }
                return response.json();
            })
            .then(setBookings)
            .then(() => setClubId(clubId))
            .catch(console.log)
            })
          .catch(console.log)
    }, []);

    return (
        <div className="container is-fluid m-5">
        {isModalOpen && <BookingForm bookingId={bookingId} clubId={clubId} handleClose={handleClose} />}
        {deleteModalOpen && <BookingDelete bookingId={bookingId} clubId={clubId} handleDeleteClose={handleDeleteClose} />}
        <button className="button is-pulled-right mr-5" id="btnAdd" onClick={handleOpen}>Add booking</button>
        {bookings.length == 0 ?
            <div className="alert alert-warning py-4">
                No bookings found.<br />
                Do you want to add a club booking?
            </div>
            : <BookingTable setBookingId={setBookingId} bookings={bookings} handleOpen={handleOpen} handleDeleteOpen={handleDeleteOpen}/>}
        </div>
        
    );
}

export default AdminBooking;