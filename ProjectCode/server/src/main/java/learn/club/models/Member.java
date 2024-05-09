package learn.club.models;

import java.time.LocalDate;

public class Member {

    private int memberId;
    private int appUserId;
    private String name;
    private String phone;
    private String address;
    private String membershipStatus;
    private String membershipType;
    private LocalDate joinDate;
    private LocalDate expirationDate;

    public Member() { }

    public Member(int memberId, int appUserId, String name, String phone, String address, String membershipStatus, String membershipType, LocalDate joinDate, LocalDate expirationDate) {
        this.memberId = memberId;
        this.appUserId = appUserId;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.membershipStatus = membershipStatus;
        this.membershipType = membershipType;
        this.joinDate = joinDate;
        this.expirationDate = expirationDate;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public int getAppUserId() { return appUserId; }

    public void setAppUserId(int appUserId) { this.appUserId = appUserId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMembershipStatus() {
        return membershipStatus;
    }

    public void setMembershipStatus(String membershipStatus) {
        this.membershipStatus = membershipStatus;
    }

    public String getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(String membershipType) {
        this.membershipType = membershipType;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}
