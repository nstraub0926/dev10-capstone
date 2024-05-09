package learn.club.data;

import org.springframework.jdbc.core.RowMapper;

import learn.club.models.Member;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MemberMapper implements RowMapper<Member> {

    @Override
    public Member mapRow(ResultSet resultSet, int i) throws SQLException {
        Member member = new Member();
        member.setMemberId(resultSet.getInt("member_id"));
        member.setAppUserId(resultSet.getInt("app_user_id"));
        member.setName(resultSet.getString("name"));
        member.setPhone(resultSet.getString("phone"));
        member.setAddress(resultSet.getString("address"));
        member.setMembershipStatus(resultSet.getString("membership_status"));
        member.setMembershipType(resultSet.getString("membership_type"));
        member.setJoinDate(resultSet.getDate("join_date").toLocalDate());
        member.setExpirationDate(resultSet.getDate("expiration_date").toLocalDate());
        return member;
    }
}
