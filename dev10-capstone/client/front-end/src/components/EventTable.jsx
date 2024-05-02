import { Link } from "react-router-dom";

function EventTable({ events }) {
    return (
        <table className="table is-fullwidth is-hoverable table-striped">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Location</th>
                    <th>Event Date</th>
                    <th>Event Time</th>
                    <th>Event Description</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.eventId}>
                        <td>{event.title}</td>
                        <td>{event.location}</td>
                        <td>{event.date}</td>
                        <td>{event.startTime} - {event.endTime}</td>
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