package learn.club.data;

import learn.club.models.Booking;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookingJdbcTemplateRepository implements BookingRepository {

    private final JdbcTemplate jdbcTemplate;

    public BookingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Booking> findBookingsByClubId(int clubId) {
        final String sql = "select booking_id, club_id, facility, `status`, start_date, end_date, start_time, end_time "
                + "from booking "
                + "where club_id = ?";
        return jdbcTemplate.query(sql, new BookingMapper(), clubId);
    }

    @Override
    public Booking findById(int bookingId) {
        final String sql = "select booking_id, club_id, facility, `status`, start_date, end_date, start_time, end_time "
                + "from booking "
                + "where booking_id = ?";
        return jdbcTemplate.query(sql, new BookingMapper(), bookingId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Booking add(Booking booking) {
        final String sql = "insert into booking (club_id, facility, `status`, start_date, end_date, start_time, end_time) "
                + "values (?, ?, ?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, booking.getClubId(), booking.getFacility(), booking.getStatus(),
                booking.getStartDate(), booking.getEndDate(), booking.getStartTime(), booking.getEndTime());
        if (rowsAffected <= 0) {
            return null;
        }
        return booking;
    }

    @Override
    public boolean update(Booking booking) {
        final String sql = "update booking set "
                + "club_id = ?, "
                + "facility = ?, "
                + "`status` = ?, "
                + "start_date = ?, "
                + "end_date = ?, "
                + "start_time = ?, "
                + "end_time = ? "
                + "where booking_id = ?";
        return jdbcTemplate.update(sql, booking.getClubId(), booking.getFacility(), booking.getStatus(),
                booking.getStartDate(), booking.getEndDate(), booking.getStartTime(), booking.getEndTime(), booking.getBookingId()) > 0;
    }

    @Override
    public boolean deleteById(int bookingId) {
        final String sql = "delete from booking where booking_id = ?";
        return jdbcTemplate.update(sql, bookingId) > 0;
    }
}
