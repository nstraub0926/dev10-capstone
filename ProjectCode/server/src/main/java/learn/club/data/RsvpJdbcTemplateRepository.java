package learn.club.data;

import learn.club.models.Rsvp;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RsvpJdbcTemplateRepository implements RsvpRepository {

    private final JdbcTemplate jdbcTemplate;

    public RsvpJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Rsvp> findRsvpByMemberId(int memberId) {
        final String sql = "select rsvp_id, member_id, event_id, booking_id "
                + " from rsvp"
                + " where member_id = ?;";
        return jdbcTemplate.query(sql, new RsvpMapper(), memberId);
    }

    @Override
    public Rsvp add(Rsvp rsvp) {
        final String sql = "insert into rsvp "
                + "(member_id, event_id, booking_id) "
                + "values (?,?,?);";
        int rowsAffected = jdbcTemplate.update(sql,
                rsvp.getMemberId(),
                rsvp.getEventId(),
                rsvp.getBookingId());
        if (rowsAffected <= 0) {
            return null;
        }
        return rsvp;
    }
}
