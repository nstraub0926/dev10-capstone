package learn.club.data;

import learn.club.models.ClubMember;
import learn.club.models.Member;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubMemberJdbcTemplateRepository implements ClubMemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public ClubMemberJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Member> findMembersByClubId(int clubId) {
        final String sql = "select * "
                + " from `member` "
                + " inner join club_member on `member`.member_id = club_member.member_id "
                + " where club_member.club_id = ?;";
        return jdbcTemplate.query(sql, new MemberMapper(), clubId);
    }

    @Override
    public ClubMember add(ClubMember clubMember) {
        final String sql = "insert into club_member (club_id, member_id) values (?, ?);";
        int rowsAffected = jdbcTemplate.update(sql, clubMember.getClubId(), clubMember.getMemberId());
        if (rowsAffected <= 0) {
            return null;
        }
        return clubMember;
    }

    @Override
    public boolean update(ClubMember clubMember) {
        final String sql = "update club_member set club_id = ?, member_id = ? where club_id = ? and member_id = ?;";
        return jdbcTemplate.update(sql, clubMember.getClubId(), clubMember.getMemberId(), clubMember.getClubId(), clubMember.getMemberId()) > 0;
    }

    @Override
    public boolean delete(int clubMemberId) {
        final String sql = "delete from club_member where club_member_id = ?;";
        return jdbcTemplate.update(sql, clubMemberId) > 0;
    }
}
