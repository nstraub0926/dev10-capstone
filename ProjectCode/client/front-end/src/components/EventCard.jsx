import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/event-card.css";

function convertDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString( "en-US", { timeZone: "UTC" } );
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

function handleClick(auth, event, member) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify({
            memberId: member.memberId,
            eventId: event.eventId,
            bookingId: null,
        }),
    };

    fetch(`http://localhost:8080/rsvp`, init)
    .then((response) => {
        if (response.status !== 201) {
            return Promise.reject("Failed to RSVP");
        }
        alert(`Successfully RSVP'd to ${event.title}!`);
        return response.json();
    })
    .catch(console.log)
}

export default function EventCard({ event, member}) {

    const auth = useContext(AuthContext);

    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="card is-horizontal shadow-md is-cursor-pointer transform is-duration-500 hover-shadow-xl hover-translate-y is-showdow-2xl is-shadow-none">
                            <div className="card-image">
                                <figure className="image">
                                    <img src={event.imgUrl ? event.imgUrl : "https://bulma.io/images/placeholders/1280x960.png"}
                                        alt="Event image"/>
                                </figure>
                            </div>
                            <div className="card-content p-0 is-flex is-flex-direction-column">
                                <div className="content p-5 has-text-grey-light">
                                    <h3>{event.title}</h3>
                                <p className="is-size-6 has-text-weight-normal">{event.description}</p>
                                </div>
                                <div className="content p-5 has-background-success-light">
                                    <div className="columns">
                                        <div className="column">
                                            <div className="is-size-6">
                                                <span className="has-text-weight-semibold">{event.location}</span>
                                            </div>
                                            <div className="is-size-6">
                                                <span className="has-text-primary-dark">{convertDate(event.date)}</span> 
                                            </div>
                                            <div className="is-size-6">
                                                <span className="has-text-primary-dark">{convertTime(event.startTime)} - {convertTime(event.endTime)}</span>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <button style={{"backgroundColor": "#305140", "color": "white"}} className="button is-medium is-fullwidth has-text-weight-semibold" onClick={() => handleClick(auth, event, member)}><em>RSVP</em></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}