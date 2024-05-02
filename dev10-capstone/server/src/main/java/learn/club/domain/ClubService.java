package learn.club.domain;

import learn.club.data.ClubRepository;
import learn.club.models.Club;
import learn.club.models.Event;
import learn.club.models.Member;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class ClubService {

    private final ClubRepository repository;

    private final Validator validator;

    public ClubService(ClubRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Club> findAll() {
        return repository.findAll();
    }

    public Club findById(int clubId) {
        return repository.findById(clubId);
    }

    public List<Club> filterClubsByInput(String input) { return repository.filterClubsByInput(input); }

    public List<Member> findMembersByClubId(int clubId) { return repository.findMembersByClubId(clubId); }

    public List<Event> findEventsByClubId(int clubId) { return repository.findEventsByClubId(clubId); }

    public int getClubIdByAppUserId(int appUserId) { return repository.getClubIdByAppUserId(appUserId); }

    public Result<Club> add(Club club) {
        Result<Club> result = validate(club);
        if (result.isSuccess()) {
            result.setPayload(repository.add(club));
        }
        return result;
    }

    public Result<Club> update(Club club) {
        Result<Club> result = validate(club);
        if (result.isSuccess()) {
            if (repository.update(club)) {
                result.setPayload(club);
            } else {
                result.addMessage(ActionStatus.INVALID, "clubId not found: " + club.getClubId());
            }
        }
        return result;
    }

    public Result<Club> deleteById(int clubId) {
        Result<Club> result = new Result<>();
        if (!repository.deleteById(clubId)) {
            result.addMessage(ActionStatus.NOT_FOUND, "clubId not found: " + clubId);
        }
        return result;
    }

    private Result<Club> validate(Club club) {
        Result<Club> result = new Result<>();
        if (club == null) {
            result.addMessage(ActionStatus.INVALID, "club cannot be null");
            return result;
        }

        Set<ConstraintViolation<Club>> violations = validator.validate(club);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<Club> violation : violations) {
                result.addMessage(ActionStatus.INVALID, violation.getMessage());
            }
            return result;
        }

        if (repository.findById(club.getClubId()) != null) {
            result.addMessage(ActionStatus.DUPLICATE, "club name already exists");
        }

        return result;
    }
}
