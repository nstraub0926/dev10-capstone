package learn.club.controllers;

import learn.club.domain.EventService;
import learn.club.models.Event;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("club/event")
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


}
