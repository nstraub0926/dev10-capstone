package learn.club.models;

public class Rsvp {

    private int rsvpId;
    private int memberId;
    private int eventId;
    private int bookingId;

    public Rsvp() { }

    public Rsvp(int rsvpId, int memberId, int eventId, int bookingId) {
        this.rsvpId = rsvpId;
        this.memberId = memberId;
        this.eventId = eventId;
        this.bookingId = bookingId;
    }

    public int getRsvpId() {
        return rsvpId;
    }

    public void setRsvpId(int rsvpId) {
        this.rsvpId = rsvpId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
}
