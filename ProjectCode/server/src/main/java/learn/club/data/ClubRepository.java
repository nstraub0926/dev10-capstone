package learn.club.data;

import learn.club.models.Booking;
import learn.club.models.Club;
import learn.club.models.Event;
import learn.club.models.Member;

import java.util.List;

public interface ClubRepository {
    List<Club> findAll();

    Club findById(int clubId);

    List<Club> filterClubsByInput(String input);

    List<Member> findMembersByClubId(int clubId);

    List<Event> findEventsByClubId(int clubId);

    List<Booking> findBookingsByClubId(int clubId);

    int getClubIdByAppUserId(int appUserId);

    Club add(Club club);

    boolean update(Club club);

    boolean deleteById(int clubId);
}
