package learn.club.data;

import learn.club.models.Booking;

import java.util.List;

public interface BookingRepository {
    List<Booking> findBookingsByClubId(int clubId);

    List<Booking> findBookingsByMemberId(int memberId);

    void add(Booking booking);

    boolean update(Booking booking);

    boolean deleteById(int bookingId);
}
