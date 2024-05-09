package learn.club.data;

import learn.club.models.Club;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ClubMapper implements RowMapper<Club> {

    @Override
    public Club mapRow(ResultSet resultSet, int i) throws SQLException {
        Club club = new Club();
        club.setClubId(resultSet.getInt("club_id"));
        club.setAppUserId(resultSet.getInt("app_user_id"));
        club.setName(resultSet.getString("name"));
        club.setCategory(resultSet.getString("category"));
        club.setLocation(resultSet.getString("location"));
        club.setMembershipFee(resultSet.getInt("membership_fee"));
        club.setDescription(resultSet.getString("description"));
        return club;
    }
}
