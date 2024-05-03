package learn.club.data;

import learn.club.models.ClubMember;
import org.springframework.jdbc.core.RowMapper;

public class ClubMemberMapper implements RowMapper<ClubMember> {

    @Override
    public ClubMember mapRow(java.sql.ResultSet resultSet, int i) throws java.sql.SQLException {
        ClubMember clubMember = new ClubMember();
        clubMember.setClubMemberId(resultSet.getInt("club_member_id"));
        clubMember.setClubId(resultSet.getInt("club_id"));
        clubMember.setMemberId(resultSet.getInt("member_id"));
        return clubMember;
    }

}
