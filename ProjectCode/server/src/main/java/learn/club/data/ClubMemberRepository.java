package learn.club.data;

import learn.club.models.Club;
import learn.club.models.ClubMember;
import learn.club.models.Member;

import java.util.List;

public interface ClubMemberRepository {
    List<Member> findMembersByClubId(int clubId);

    List<Club> findClubsByMemberId(int memberId);

    int findClubMemberId(int clubId, int memberId);

    ClubMember add(ClubMember clubMember);

    boolean update(ClubMember clubMember);

    boolean delete(int clubMemberId);
}
