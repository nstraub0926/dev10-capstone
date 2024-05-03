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

function EventTable({ events }) {
    return (
        <table className="table is-fullwidth is-hoverable table-striped">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Description</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.eventId}>
                        <td>{event.title}</td>
                        <td>{event.location}</td>
                        <td>{convertDate(event.date)}</td>
                        <td>{convertTime(event.startTime)}</td>
                        <td>{convertTime(event.endTime)}</td>
                        <td>{event.description}</td>
                        <td>
                            <Link type="button" className="button is-danger is-outlined is-rounded is-small" to={`../event/delete/${event.eventId}`}>Delete</Link>
                            <Link type="button" className="button is-warning is-outlined is-rounded is-small" to={`../event/edit/${event.eventId}`}>Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default EventTable;