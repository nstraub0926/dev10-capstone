package learn.club.models;

import java.time.LocalDate;
import java.time.LocalTime;

public class Booking {

    private int bookingId;
    private int clubId;
    private String facility;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

    public Booking() { }

    public Booking(int bookingId, int clubId, String facility, String status, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime) {
        this.bookingId = bookingId;
        this.clubId = clubId;
        this.facility = facility;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public int getBookingId() { return bookingId; }

    public void setBookingId(int bookingId) { this.bookingId = bookingId; }

    public int getClubId() { return clubId; }

    public void setClubId(int clubId) { this.clubId = clubId; }

    public String getFacility() { return facility; }

    public void setFacility(String facility) { this.facility = facility; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartDate() { return startDate; }

    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }

    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public LocalTime getStartTime() { return startTime; }

    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }

    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
}
