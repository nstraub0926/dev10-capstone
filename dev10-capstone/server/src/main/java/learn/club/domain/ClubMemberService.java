package learn.club.domain;

import learn.club.data.ClubMemberRepository;
import learn.club.models.ClubMember;
import learn.club.models.Member;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class ClubMemberService {

    private final ClubMemberRepository repository;

    private final Validator validator;

    public ClubMemberService(ClubMemberRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Member> findMembersByClubId(int clubId) {
        return repository.findMembersByClubId(clubId);
    }

    public Result<ClubMember> add(ClubMember clubMember) {
        Result<ClubMember> result = validate(clubMember);
        if (result.isSuccess()) {
            result.setPayload(repository.add(clubMember));
        }
        return result;
    }

    public Result<ClubMember> update(ClubMember clubMember) {
        Result<ClubMember> result = validate(clubMember);
        if (result.isSuccess()) {
            if (repository.update(clubMember)) {
                result.setPayload(clubMember);
            } else {
                result.addMessage(ActionStatus.INVALID, "clubMemberId not found: " + clubMember.getClubMemberId());
            }
        }
        return result;
    }

    public Result<ClubMember> delete(int clubMemberId) {
        Result<ClubMember> result = new Result<>();
        if (!repository.delete(clubMemberId)) {
            result.addMessage(ActionStatus.NOT_FOUND, "clubMemberId not found: " + clubMemberId);
        }
        return result;
    }

    private Result<ClubMember> validate(ClubMember clubMember) {
        Result<ClubMember> result = new Result<>();
        if (clubMember == null) {
            result.addMessage(ActionStatus.INVALID, "clubMember cannot be null");
            return result;
        }

        Set<ConstraintViolation<ClubMember>> violations = validator.validate(clubMember);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<ClubMember> v : violations) {
                result.addMessage(ActionStatus.INVALID, v.getMessage());
            }
            return result;
        }

        return result;
    }


}
