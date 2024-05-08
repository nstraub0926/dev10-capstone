package learn.club.data;

import learn.club.models.Booking;
import learn.club.models.Club;
import learn.club.models.Event;
import learn.club.models.Member;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubJdbcTemplateRepository implements ClubRepository {

    private final JdbcTemplate jdbcTemplate;

    public ClubJdbcTemplateRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Club> findAll() {
        final String sql = "select club_id, app_user_id, `name`, category, location, membership_fee, `description`"
                + " from club;";
        return jdbcTemplate.query(sql, new ClubMapper());
    }

    @Override
    public Club findById(int clubId) {
        final String sql = "select club_id, app_user_id, `name`, category, location, membership_fee, `description`"
                + " from club"
                + " where club_id = ?;";
        return jdbcTemplate.query(sql, new ClubMapper(), clubId)
                .stream().findFirst().orElse(null);
    }

    @Override
    public List<Club> filterClubsByInput(String input) {
        final String sql = "select club_id, app_user_id, `name`, category, location, membership_fee, `description`"
                + " from club"
                + " where `name` like ?;";
        return jdbcTemplate.query(sql, new ClubMapper(), "%" + input + "%");
    }

    @Override
    public List<Member> findMembersByClubId(int clubId) {
        final String sql = "select * "
                + " from `member` "
                + " inner join club_member on `member`.member_id = club_member.member_id "
                + " where club_member.club_id = ?;";
        return jdbcTemplate.query(sql, new MemberMapper(), clubId);
    }

    @Override
    public List<Event> findEventsByClubId(int clubId) {
        final String sql = "select * "
                + " from event "
                + " where club_id = ?;";
        return jdbcTemplate.query(sql, new EventMapper(), clubId);
    }

    @Override
    public List<Booking> findBookingsByClubId(int clubId) {
        final String sql = "select * "
                + " from booking "
                + " where club_id = ?;";
        return jdbcTemplate.query(sql, new BookingMapper(), clubId);
    }

    @Override
    public int getClubIdByAppUserId(int appUserId) {
        final String sql = "select club_id "
                + " from club "
                + " where app_user_id = ?;";
        return jdbcTemplate.queryForObject(sql, Integer.class, appUserId);
    }

    @Override
    public Club add(Club club) {
        final String sql = "insert into club "
                + "(app_user_id, `name`, category, location, membership_fee, `description`) "
                + "values (?,?,?,?,?,?);";
        int rowsAffected = jdbcTemplate.update(sql,
                club.getAppUserId(),
                club.getName(),
                club.getCategory(),
                club.getLocation(),
                club.getMembershipFee(),
                club.getDescription());

        if (rowsAffected <= 0) {
            return null;
        }

        return club;
    }

    @Override
    public boolean update(Club club) {
        final String sql = "update club set "
                + "`name` = ?, "
                + "category = ?, "
                + "location = ?, "
                + "membership_fee = ?, "
                + "`description` = ? "
                + "where club_id = ?;";
        return jdbcTemplate.update(sql,
                club.getName(),
                club.getCategory(),
                club.getLocation(),
                club.getMembershipFee(),
                club.getDescription(),
                club.getClubId()) > 0;
    }

    @Override
    public boolean deleteById(int clubId) {
        return jdbcTemplate.update("delete from club where club_id = ?;", clubId) > 0;
    }
}
