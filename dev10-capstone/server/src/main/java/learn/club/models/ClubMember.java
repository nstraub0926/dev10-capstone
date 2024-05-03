package learn.club.models;

public class ClubMember {

    private int clubMemberId;
    private int clubId;
    private int memberId;

    public ClubMember() { }

    public ClubMember(int clubMemberId, int clubId, int memberId) {
        this.clubMemberId = clubMemberId;
        this.clubId = clubId;
        this.memberId = memberId;
    }

    public int getClubMemberId() { return clubMemberId; }

    public void setClubMemberId(int clubMemberId) { this.clubMemberId = clubMemberId; }

    public int getClubId() { return clubId; }

    public void setClubId(int clubId) { this.clubId = clubId; }

    public int getMemberId() { return memberId; }

    public void setMemberId(int memberId) { this.memberId = memberId; }
}
