package learn.club.data;

import learn.club.models.Member;

import java.util.List;

public interface MemberRepository {
    List<Member> findAll();

    Member findById(int appUserId);

    Member add(Member member);

    boolean update(Member member);

    boolean deleteById(int memberId);
}
