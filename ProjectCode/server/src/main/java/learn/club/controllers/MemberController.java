package learn.club.controllers;

import learn.club.domain.MemberService;
import learn.club.domain.Result;
import learn.club.models.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping
    public List<Member> findAll() {
        return service.findAll();
    }

    @GetMapping("/app_user/{appUserId}")
    public ResponseEntity<Member> findByAppUserId(@PathVariable int appUserId) {
        Member member = service.findByAppUserId(appUserId);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<Member> findById(@PathVariable int memberId) {
        Member member = service.findById(memberId);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    @PostMapping
    public ResponseEntity<Member> add(@RequestBody Member member) {
        Result<Member> result = service.add(member);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Void> update(@PathVariable int memberId, @RequestBody Member member) {
        if (memberId != member.getMemberId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Member> result = service.update(member);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteById(@PathVariable int memberId) {
        Result<Member> result = service.deleteById(memberId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NOT_FOUND));
    }

    private HttpStatus getStatus(Result<Member> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.BAD_REQUEST;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }

}
