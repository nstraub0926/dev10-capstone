import React, { useState, useEffect, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AuthContext from '../context/AuthContext'

export default function Booking() {

  const [member, setMember] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const auth = useContext(AuthContext);

  function transformBooking(booking) {
    return {
      id: String(booking.bookingId),
      title: booking.facility,
      start: booking.startDate + 'T' + booking.startTime,
      end: booking.endDate + 'T' + booking.endTime
    }
  }

  async function fetchBookings(clubId) {
      const response = await fetch(`http://localhost:8080/club/booking/${clubId}`);
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
                  fetchBookings(club.clubId)
                  .then((clubBookings) => {
                      setBookings((values) => {
                          return [...values, ...clubBookings];
                      })
                  })
              )}
          })
          .catch(console.log);
      }, []);
  }, []);

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  return (
    
    <section className="hero is-primary is-fullheight section" id="booking">
         <div className="hero-body">
             <div className="container">
                 <div className="column">
                     <div className="card">
                         <div className="card-content">
                            <div>
                                <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                initialView='dayGridMonth'
                                editable={false}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                events={[...bookings.map((booking) => transformBooking(booking))]}
                                eventContent={renderEventContent}
                                eventClick={handleEventClick}
                                
                                /* you can update a remote database when these fire:
                                eventAdd={function(){}}
                                eventChange={function(){}}
                                eventRemove={function(){}}
                                */
                                />
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}