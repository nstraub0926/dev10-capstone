package learn.club.data;

import learn.club.models.Event;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EventJdbcTemplateRepository implements EventRepository {

    private final JdbcTemplate jdbcTemplate;

    public EventJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Event> findAll() {
        final String sql = "select event_id, club_id, title, `date`, start_time, end_time, location, description, img_url "
                + "from `event`";
        return jdbcTemplate.query(sql, new EventMapper());
    }

    @Override
    public List<Event> findEventsByClubId(int clubId) {
        final String sql = "select event_id, club_id, title, `date`, start_time, end_time, location, description, img_url "
                + "from `event` "
                + "where club_id = ?";
        return jdbcTemplate.query(sql, new EventMapper(), clubId);
    }

    @Override
    public Event findById(int eventId) {
        final String sql = "select event_id, club_id, title, `date`, start_time, end_time, location, description, img_url "
                + "from `event` "
                + "where event_id = ?";
        return jdbcTemplate.query(sql, new EventMapper(), eventId).stream().findFirst().orElse(null);
    }

    @Override
    public Event add(Event event) {
        final String sql = "insert into `event` (club_id, title, `date`, start_time, end_time, location, description, img_url) "
                + "values (?, ?, ?, ?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, event.getClubId(), event.getTitle(), event.getDate(), event.getStartTime(),
                event.getEndTime(), event.getLocation(), event.getDescription(), event.getImgUrl());

        if (rowsAffected <= 0) {
            return null;
        }

        return event;
    }

    @Override
    public boolean update(Event event) {
        final String sql = "update `event` set "
                + "title = ?, "
                + "`date` = ?, "
                + "start_time = ?, "
                + "end_time = ?, "
                + "location = ?, "
                + "description = ?, "
                + "img_url = ? "
                + "where event_id = ?";
        return jdbcTemplate.update(sql, event.getTitle(), event.getDate(), event.getStartTime(), event.getEndTime(),
                event.getLocation(), event.getDescription(), event.getImgUrl(), event.getEventId()) > 0;
    }

    @Override
    public boolean deleteById(int eventId) {
        final String sql = "delete from `event` where event_id = ?";
        return jdbcTemplate.update(sql, eventId) > 0;
    }
}
