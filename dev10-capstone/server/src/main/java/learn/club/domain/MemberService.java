package learn.club.domain;

import learn.club.data.MemberRepository;
import org.springframework.stereotype.Service;

import learn.club.models.Member;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class MemberService {

    private final MemberRepository repository;

    private final Validator validator;

    public MemberService(MemberRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Member> findAll() {
        return repository.findAll();
    }

    public Member findById(int memberId) {
        return repository.findById(memberId);
    }

    public Result<Member> add(Member member) {
        Result<Member> result = validate(member);
        if (result.isSuccess()) {
            result.setPayload(repository.add(member));
        }
        return result;
    }

    public Result<Member> update(Member member) {
        Result<Member> result = validate(member);
        if (result.isSuccess()) {
            if (repository.update(member)) {
                result.setPayload(member);
            } else {
                result.addMessage(ActionStatus.INVALID, "memberId not found: " + member.getMemberId());
            }
        }
        return result;
    }

    public Result<Member> deleteById(int memberId) {
        Result<Member> result = new Result<>();
        if (!repository.deleteById(memberId)) {
            result.addMessage(ActionStatus.NOT_FOUND, "memberId not found: " + memberId);
        }
        return result;
    }

    private Result<Member> validate(Member member) {
        Result<Member> result = new Result<>();
        if (member == null) {
            result.addMessage(ActionStatus.INVALID, "member cannot be null");
            return result;
        }
        Set<ConstraintViolation<Member>> violations = validator.validate(member);
        if (!violations.isEmpty()) {
            for (ConstraintViolation<Member> violation : violations) {
                result.addMessage(ActionStatus.INVALID, violation.getMessage());
            }
            return result;
        }
        if (repository.findById(member.getMemberId()) != null) {
            result.addMessage(ActionStatus.DUPLICATE, "memberId already exists: " + member.getMemberId());
        }
        return result;
    }



}
