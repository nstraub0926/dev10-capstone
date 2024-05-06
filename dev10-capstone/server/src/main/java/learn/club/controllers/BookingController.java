package learn.club.controllers;

import learn.club.domain.BookingService;
import learn.club.domain.Result;
import learn.club.models.Booking;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/club/booking")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @GetMapping("/{clubId}")
    public List<Booking> findBookingsByClubId(@PathVariable int clubId) {
        return service.findBookingsByClubId(clubId);
    }

    @GetMapping("/{memberId}")
    public List<Booking> findBookingsByMemberId(@PathVariable int memberId) {
        return service.findBookingsByMemberId(memberId);
    }

    @GetMapping("/{clubId}/{bookingId}")
    public Booking findById(@PathVariable int bookingId) {
        return service.findById(bookingId);
    }

    @PostMapping
    public ResponseEntity<Booking> add(@RequestBody Booking booking) {
        Result<Booking> result = service.add(booking);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<Void> update(@PathVariable int bookingId, @RequestBody Booking booking) {
        if (bookingId != booking.getBookingId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Booking> result = service.update(booking);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> delete(@PathVariable int bookingId) {
        Result<Booking> result = service.deleteById(bookingId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NOT_FOUND));
    }

    private HttpStatus getStatus(Result<Booking> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.BAD_REQUEST;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }

}
