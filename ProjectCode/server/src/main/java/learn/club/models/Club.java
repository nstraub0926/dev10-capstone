package learn.club.models;

public class Club {

    private int clubId;
    private int appUserId;
    private String name;
    private String category;
    private String location;
    private int membershipFee;
    private String description;

    public Club() { }

    public Club(int clubId, int appUserId, String name, String category, String location, int membershipFee, String description) {
        this.clubId = clubId;
        this.appUserId = appUserId;
        this.name = name;
        this.category = category;
        this.location = location;
        this.membershipFee = membershipFee;
        this.description = description;
    }

    public int getClubId() { return clubId; }

    public void setClubId(int clubId) { this.clubId = clubId; }

    public int getAppUserId() { return appUserId; }

    public void setAppUserId(int appUserId) { this.appUserId = appUserId; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public int getMembershipFee() { return membershipFee; }

    public void setMembershipFee(int membershipFee) { this.membershipFee = membershipFee; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

}
