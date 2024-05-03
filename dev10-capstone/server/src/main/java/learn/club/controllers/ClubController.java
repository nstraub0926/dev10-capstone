package learn.club.controllers;

import learn.club.domain.ClubService;
import learn.club.domain.Result;
import learn.club.models.Booking;
import learn.club.models.Club;
import learn.club.models.Event;
import learn.club.models.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/club")
public class ClubController {

    private final ClubService service;

    public ClubController(ClubService service) { this.service = service; }

    @GetMapping
    public List<Club> findAll() { return service.findAll(); }

    @GetMapping("/{clubId}")
    public ResponseEntity<Club> findById(@PathVariable int clubId) {
        Club club = service.findById(clubId);
        if (club == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(club);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Club>> filterClubsByInput(@RequestParam String input) {
        List<Club> clubs = service.filterClubsByInput(input);
        if (clubs == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/{clubId}/member")
    public ResponseEntity<List<Member>> findMembersByClubId(@PathVariable int clubId) {
        List<Member> members = service.findMembersByClubId(clubId);
        if (members == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(members);
    }

    @GetMapping("/{clubId}/event")
    public ResponseEntity<List<Event>> findEventsByClubId(@PathVariable int clubId) {
        List<Event> events = service.findEventsByClubId(clubId);
        if (events == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{clubId}/booking")
    public ResponseEntity<List<Booking>> findBookingsByClubId(@PathVariable int clubId) {
        List<Booking> bookings = service.findBookingsByClubId(clubId);
        if (bookings == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/app_user/{appUserId}")
    public ResponseEntity<Integer> getClubIdByAppUserId(@PathVariable int appUserId) {
        int clubId = service.getClubIdByAppUserId(appUserId);
        if (clubId == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clubId);
    }

    @PostMapping
    public ResponseEntity<Club> add(@RequestBody Club club) {
        Result<Club> result = service.add(club);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{clubId}")
    public ResponseEntity<Void> update(@PathVariable int clubId, @RequestBody Club club) {
        if (clubId != club.getClubId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Club> result = service.update(club);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<Void> deleteById(@PathVariable int clubId) {
        Result<Club> result = service.deleteById(clubId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NOT_FOUND));
    }

    private HttpStatus getStatus(Result<Club> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.FORBIDDEN;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }
}
