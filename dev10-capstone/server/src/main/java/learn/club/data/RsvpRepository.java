package learn.club.data;

import learn.club.models.Rsvp;

import java.util.List;

public interface RsvpRepository {
    List<Rsvp> findRsvpByMemberId(int memberId);

    Rsvp add(Rsvp rsvp);
}
