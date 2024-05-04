package learn.club.data;

import learn.club.models.Event;

import java.util.List;

public interface EventRepository {
    List<Event> findAll();

    List<Event> findEventsByClubId(int clubId);

    Event findById(int eventId);

    Event add(Event event);

    boolean update(Event event);

    boolean deleteById(int eventId);
}
