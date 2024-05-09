package learn.club.data;

import learn.club.models.Rsvp;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RsvpMapper implements RowMapper<Rsvp> {

    @Override
    public Rsvp mapRow(ResultSet rs, int rowNum) throws SQLException {
        Rsvp rsvp = new Rsvp();
        rsvp.setRsvpId(rs.getInt("rsvp_id"));
        rsvp.setMemberId(rs.getInt("member_id"));
        rsvp.setEventId(rs.getInt("event_id"));
        rsvp.setBookingId(rs.getInt("booking_id"));
        return rsvp;
    }
}
