package learn.club.domain;

import learn.club.data.RsvpRepository;
import learn.club.models.Rsvp;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class RsvpService {

    private final RsvpRepository repository;

    private final Validator validator;

    public RsvpService(RsvpRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Rsvp> findRsvpByMemberId(int memberId) {
        return repository.findRsvpByMemberId(memberId);
    }

    public Result<Rsvp> add(Rsvp rsvp) {
        Result<Rsvp> result = validate(rsvp);
        if (result.isSuccess()) {
            result.setPayload(repository.add(rsvp));
        }
        return result;
    }

    private Result<Rsvp> validate(Rsvp rsvp) {
        Result<Rsvp> result = new Result<>();
        if (rsvp == null) {
            result.addMessage(ActionStatus.INVALID, "rsvp cannot be null");
            return result;
        }

        Set<ConstraintViolation<Rsvp>> violations = validator.validate(rsvp);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<Rsvp> v : violations) {
                result.addMessage(ActionStatus.INVALID, v.getMessage());
            }
            return result;
        }

        return result;
    }
}
