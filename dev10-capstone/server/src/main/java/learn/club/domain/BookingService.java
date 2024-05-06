package learn.club.domain;

import learn.club.data.BookingRepository;
import learn.club.models.Booking;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class BookingService {

    private final BookingRepository repository;

    private final Validator validator;

    public BookingService(BookingRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Booking> findBookingsByClubId(int clubId) {
        return repository.findBookingsByClubId(clubId);
    }

    public Booking findById(int booking) {
        return repository.findById(booking);
    }

    public Result<Booking> add(Booking booking) {
        Result<Booking> result = validate(booking);
        if (result.isSuccess()) {
            result.setPayload(repository.add(booking));
        }
        return result;
    }

    public Result<Booking> update(Booking booking) {
        Result<Booking> result = validate(booking);
        if (result.isSuccess()) {
            if (repository.update(booking)) {
                result.setPayload(booking);
            } else {
                result.addMessage(ActionStatus.INVALID, "bookingId not found: " + booking.getBookingId());
            }
        }
        return result;
    }

    public Result<Booking> deleteById(int bookingId) {
        Result<Booking> result = new Result<>();
        if (!repository.deleteById(bookingId)) {
            result.addMessage(ActionStatus.NOT_FOUND, "bookingId not found: " + bookingId);
        }
        return result;
    }

    private Result<Booking> validate(Booking booking) {
        Result<Booking> result = new Result<>();
        if (booking == null) {
            result.addMessage(ActionStatus.INVALID, "booking cannot be null");
            return result;
        }

        Set<ConstraintViolation<Booking>> violations = validator.validate(booking);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<Booking> violation : violations) {
                result.addMessage(ActionStatus.INVALID, violation.getMessage());
            }
            return result;
        }

        return result;
    }
}
