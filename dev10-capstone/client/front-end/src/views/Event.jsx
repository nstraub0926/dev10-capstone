import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import EventCard from "../components/EventCard";

function Event() {

    const [member, setMember] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const auth = useContext(AuthContext);

    async function fetchEvents(clubId) {
        const response = await fetch(`http://localhost:8080/club/event/${clubId}`);
        return response.json();
    }

    useEffect(() => {
        fetch(`http://localhost:8080/member/app_user/${auth.user.appUserId}`)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject("Member not found");
            }
            return response.json();
        })
        .then((member) => {
            setMember(member);
            fetch(`http://localhost:8080/club-member/${member.memberId}`)
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject("Clubs not found");
                }
                return response.json();
            })
            .then((clubs) => {
                setClubs(clubs);
                {clubs.map((club) => 
                    fetchEvents(club.clubId)
                    .then((clubEvents) => {
                        setEvents((values) => {
                            return [...values, ...clubEvents];
                        })
                    })
                )}
            })
        .catch(console.log);
        }, []);
    }, []);

    return (
        <section className="hero is-primary is-fullheight section" id="profile">
            <div className="hero-body">
                <div className="container">
                    <div className="fixed-grid has-3-cols">
                        <div className="cell">
                            {events.map((event, index) => {
                                return (
                                    <EventCard key={index} event={event} member={member}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Event;