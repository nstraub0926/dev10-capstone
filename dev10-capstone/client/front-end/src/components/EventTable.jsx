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

function EventTable({ setEventId, events, handleOpen, handleDeleteOpen }) {
    
    function handleClick(eventId, toggle) {
        setEventId(eventId);
        if (toggle) {
            handleOpen();
        } else {
            handleDeleteOpen();
        }
    }

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
                            <button type="button" className="button is-danger is-outlined is-rounded is-small" onClick={() => handleClick(event.eventId, false)}>Delete</button>
                            <button type="button" className="button is-warning is-outlined is-rounded is-small" onClick={() => handleClick(event.eventId, true)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}

export default EventTable;