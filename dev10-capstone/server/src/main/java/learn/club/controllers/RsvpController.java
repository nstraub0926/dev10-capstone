package learn.club.controllers;

import learn.club.domain.Result;
import learn.club.domain.RsvpService;
import learn.club.models.Rsvp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rsvp")
public class RsvpController {

    private final RsvpService service;

    public RsvpController(RsvpService service) { this.service = service; }

    @GetMapping("/{memberId}")
    public ResponseEntity<List<Rsvp>> findRsvpByMemberId(@PathVariable int memberId) {
        List<Rsvp> rsvps = service.findRsvpByMemberId(memberId);
        if (rsvps == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rsvps);
    }

    @PostMapping
    public ResponseEntity<Rsvp> add(@RequestBody Rsvp rsvp) {
        Result<Rsvp> result = service.add(rsvp);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }


    private HttpStatus getStatus(Result<Rsvp> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.BAD_REQUEST;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }
}
