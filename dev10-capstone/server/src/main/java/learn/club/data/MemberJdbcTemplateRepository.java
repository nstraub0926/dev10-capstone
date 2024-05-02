package learn.club.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import learn.club.models.Member;

import java.sql.Statement;
import java.util.List;

@Repository
public class MemberJdbcTemplateRepository implements MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public MemberJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Member> findAll() {
        final String sql = "select member_id, app_user_id, `name`, phone, address, membership_status, membership_type, join_date, expiration_date"
                + " from `member`;";
        return jdbcTemplate.query(sql, new MemberMapper());
    }

    @Override
    public Member findById(int memberId) {
        final String sql = "select member_id, app_user_id, `name`, phone, address, membership_status, membership_type, join_date, expiration_date"
                + " from `member`"
                + " where member_id = ?;";
        return jdbcTemplate.query(sql, new MemberMapper(), memberId)
                .stream().findFirst().orElse(null);
    }

    @Override
    public Member add(Member member) {
        final String sql = "insert into `member` "
                + "(app_user_id, `name`, phone, address, membership_status, membership_type, join_date, expiration_date) "
                + "values (?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, member.getAppUserId());
            ps.setString(2, member.getName());
            ps.setString(3, member.getPhone());
            ps.setString(4, member.getAddress());
            ps.setString(5, member.getMembershipStatus());
            ps.setString(6, member.getMembershipType());
            ps.setDate(7, java.sql.Date.valueOf(member.getJoinDate()));
            ps.setDate(8, java.sql.Date.valueOf(member.getExpirationDate()));
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        member.setMemberId(keyHolder.getKey().intValue());
        return member;
    }

    @Override
    public boolean update(Member member) {
        final String sql = "update member set"
                + "app_user_id = ?,"
                + "`name` = ?,"
                + "phone = ?,"
                + "address = ?,"
                + "membership_status = ?,"
                + "membership_type = ?,"
                + "join_date = ?,"
                + "expiration_date = ?"
                + "where member_id = ?;";
        return jdbcTemplate.update(sql,
                member.getAppUserId(),
                member.getName(),
                member.getPhone(),
                member.getAddress(),
                member.getMembershipStatus(),
                member.getMembershipType(),
                member.getJoinDate(),
                member.getExpirationDate(),
                member.getMemberId()) > 0;
    }

    @Override
    public boolean deleteById(int memberId) {
        final String sql = "delete from member where member_id = ?;";
        return jdbcTemplate.update(sql, memberId) > 0;
    }
}
