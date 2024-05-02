package learn.club.data;

import learn.club.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EventMapper implements RowMapper<Event> {

    @Override
    public Event mapRow(ResultSet resultSet, int i) throws SQLException {
        Event event = new Event();
        event.setEventId(resultSet.getInt("event_id"));
        event.setClubId(resultSet.getInt("club_id"));
        event.setTitle(resultSet.getString("title"));
        event.setDate(resultSet.getDate("date").toLocalDate());
        event.setStartTime(resultSet.getTime("start_time").toLocalTime());
        event.setEndTime(resultSet.getTime("end_time").toLocalTime());
        event.setLocation(resultSet.getString("location"));
        event.setDescription(resultSet.getString("description"));
        event.setImgUrl(resultSet.getString("img_url"));
        return event;
    }
}
