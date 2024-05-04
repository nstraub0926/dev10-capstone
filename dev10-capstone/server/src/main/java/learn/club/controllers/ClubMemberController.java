package learn.club.controllers;

import learn.club.domain.ClubMemberService;
import learn.club.domain.Result;
import learn.club.models.Club;
import learn.club.models.ClubMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/club-member")
public class ClubMemberController {

    private final ClubMemberService service;

    public ClubMemberController(ClubMemberService service) { this.service = service; }

    @GetMapping("/{clubId}/{memberId}")
    public int findClubMemberId(@PathVariable int clubId, @PathVariable int memberId) {
        return service.findClubMemberId(clubId, memberId);
    }

    @PostMapping
    public ResponseEntity<ClubMember> add(@RequestBody ClubMember clubMember) {
        Result<ClubMember> result = service.add(clubMember);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }

    @PutMapping("/{clubMemberId}")
    public ResponseEntity<Void> update(@PathVariable int clubMemberId, @RequestBody ClubMember clubMember) {
        if (clubMemberId != clubMember.getClubMemberId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<ClubMember> result = service.update(clubMember);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    @DeleteMapping("/{clubMemberId}")
    public ResponseEntity<Void> delete(@PathVariable int clubMemberId) {
        Result<ClubMember> result = service.delete(clubMemberId);
        return new ResponseEntity<>(getStatus(result, HttpStatus.NO_CONTENT));
    }

    private HttpStatus getStatus(Result<ClubMember> result, HttpStatus statusDefault) {
        return switch (result.getStatus()) {
            case INVALID -> HttpStatus.PRECONDITION_FAILED;
            case DUPLICATE -> HttpStatus.FORBIDDEN;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            default -> statusDefault;
        };
    }
}
