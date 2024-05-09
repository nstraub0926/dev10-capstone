package learn.club.controllers;

import learn.club.domain.EventService;
import learn.club.domain.Result;
import learn.club.models.Event;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/club/event")
public class EventController {

    private final EventService service;

    public EventController(EventService service) { this.service = service; }

    @GetMapping
    public List<Event> findAll() {
        return service.findAll();
    }

    @GetMapping("/{clubId}")
    public List<Event> findEventsByClubId(@PathVariable int clubId) {
        return service.findEventsByClubId(clubId);
    }

    @GetMapping("/{clubId}/{eventId}")
    public ResponseEntity<Event> findById(@PathVariable int eventId) {
        Event event = service.findById(eventId);
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<Event> add(@RequestBody Event event) {
        Result<Event> result = service.add(event);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Void> update(@PathVariable int eventId, @RequestBody Event event) {
        if (eventId != event.getEventId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Event> result = service.update(event);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> delete(@PathVariable int eventId) {
        Result<Event> result = service.deleteById(eventId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    private HttpStatus getStatus(Result<Event> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.BAD_REQUEST;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }

}
