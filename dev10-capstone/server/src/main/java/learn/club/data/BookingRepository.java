package learn.club.data;

import learn.club.models.Booking;

import java.util.List;

public interface BookingRepository {
    List<Booking> findBookingsByClubId(int clubId);

    Booking findById(int bookingId);

    Booking add(Booking booking);

    boolean update(Booking booking);

    boolean deleteById(int bookingId);
}
