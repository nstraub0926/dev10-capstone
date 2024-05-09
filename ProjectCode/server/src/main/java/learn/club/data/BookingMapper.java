package learn.club.data;

import learn.club.models.Booking;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookingMapper implements RowMapper<Booking> {

    @Override
    public Booking mapRow(ResultSet resultSet, int i) throws SQLException {
        Booking booking = new Booking();
        booking.setBookingId(resultSet.getInt("booking_id"));
        booking.setClubId(resultSet.getInt("club_id"));
        booking.setFacility(resultSet.getString("facility"));
        booking.setStatus(resultSet.getString("status"));
        booking.setStartDate(resultSet.getDate("start_date").toLocalDate());
        booking.setEndDate(resultSet.getDate("end_date").toLocalDate());
        booking.setStartTime(resultSet.getTime("start_time").toLocalTime());
        booking.setEndTime(resultSet.getTime("end_time").toLocalTime());
        return booking;
    }
}
