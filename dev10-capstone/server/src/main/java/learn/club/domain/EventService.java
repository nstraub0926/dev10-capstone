package learn.club.domain;

import learn.club.data.EventRepository;
import learn.club.models.Club;
import learn.club.models.Event;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class EventService {

    private final EventRepository repository;

    private final Validator validator;

    public EventService(EventRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }
    public List<Event> findAll() { return repository.findAll(); }
    public List<Event> findEventsByClubId(int clubId) {
        return repository.findEventsByClubId(clubId);
    }

    public Result<Event> add(Event event) {
        Result<Event> result = validate(event);
        if (result.isSuccess()) {
            result.setPayload(repository.add(event));
        }
        return result;
    }

    public Result<Event> update(Event event) {
        Result<Event> result = validate(event);
        if (result.isSuccess()) {
            if (repository.update(event)) {
                result.setPayload(event);
            } else {
                result.addMessage(ActionStatus.INVALID, "eventId not found: " + event.getEventId());
            }
        }
        return result;
    }

    public Result<Event> deleteById(int eventId) {
        Result<Event> result = new Result<>();
        if (!repository.deleteById(eventId)) {
            result.addMessage(ActionStatus.NOT_FOUND, "eventId not found: " + eventId);
        }
        return result;
    }

    private Result<Event> validate(Event event) {
        Result<Event> result = new Result<>();
        if (event == null) {
            result.addMessage(ActionStatus.INVALID, "club cannot be null");
            return result;
        }

        Set<ConstraintViolation<Event>> violations = validator.validate(event);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<Event> violation : violations) {
                result.addMessage(ActionStatus.INVALID, violation.getMessage());
            }
            return result;
        }

        return result;
    }
}
