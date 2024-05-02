import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

function Event() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/club/event`)
        .then((response) => {
            if (response.status !== 200) {
              return Promise.reject("No events found");
            }
            return response.json();
          })
          .then(setEvents)
          .catch(console.log);
      }, []);

    return (
        // <div className="container is-fluid">
            <div className="fixed-grid has-3-cols">
                <div className="cell">
                    {events.map((event, index) => {
                        return (
                            <EventCard key={index} event={event} />
                        );
                    })}
                </div>
            </div>
        // </div>
    );
}

export default Event;