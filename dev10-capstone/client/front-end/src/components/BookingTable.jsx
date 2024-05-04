import { Link } from "react-router-dom";

function convertDate(date) {
    const d = new Date(date);
    return d.toDateString();
}

function convertTime(time) {
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M" : " A.M";

    return timeValue;
}

function BookingTable({ bookings }) {
    return (
        <table className="table is-fullwidth is-hoverable table-striped">
            <thead>
                <tr>
                    <th>Vacant/Reserved</th>
                    <th>Facility | Utility</th>
                    <th>Rent From</th>
                    <th>Return By</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.bookingId}>
                        <td>{booking.status === "1" ? "Reserved" : "Vacant"}</td>
                        <td>{booking.facility}</td>
                        <td>{convertTime(booking.startTime)} on {convertDate(booking.startDate)}</td>
                        <td>{convertTime(booking.endTime)} on {convertDate(booking.endDate)}</td>
                        <td>
                            <Link type="button" className="button is-danger is-outlined is-rounded is-small" to={`../booking/delete/${booking.bookingId}`}>Delete</Link>
                            <Link type="button" className="button is-warning is-outlined is-rounded is-small" to={`../booking/edit/${booking.bookingId}`}>Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default BookingTable;