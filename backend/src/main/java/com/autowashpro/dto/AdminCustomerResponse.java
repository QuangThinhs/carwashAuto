package com.autowashpro.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class AdminCustomerResponse {

    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private LocalDateTime createdAt;
    private boolean enabled;
    private String tier;
    private int pointsBalance;
    private long lifetimeSpend;
    private int visitCount;
    private long totalBookings;
    private long completedBookings;
    private long revenue;
    private List<VehicleResponse> vehicles;
    private List<AdminBookingResponse> recentBookings;

    public AdminCustomerResponse(Long id, String fullName, String phone, String email, LocalDate dateOfBirth,
                                 String gender, String address, LocalDateTime createdAt, boolean enabled,
                                 String tier, int pointsBalance, long lifetimeSpend, int visitCount,
                                 long totalBookings, long completedBookings, long revenue,
                                 List<VehicleResponse> vehicles, List<AdminBookingResponse> recentBookings) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.createdAt = createdAt;
        this.enabled = enabled;
        this.tier = tier;
        this.pointsBalance = pointsBalance;
        this.lifetimeSpend = lifetimeSpend;
        this.visitCount = visitCount;
        this.totalBookings = totalBookings;
        this.completedBookings = completedBookings;
        this.revenue = revenue;
        this.vehicles = vehicles;
        this.recentBookings = recentBookings;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public String getAddress() {
        return address;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public String getTier() {
        return tier;
    }

    public int getPointsBalance() {
        return pointsBalance;
    }

    public long getLifetimeSpend() {
        return lifetimeSpend;
    }

    public int getVisitCount() {
        return visitCount;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public long getCompletedBookings() {
        return completedBookings;
    }

    public long getRevenue() {
        return revenue;
    }

    public List<VehicleResponse> getVehicles() {
        return vehicles;
    }

    public List<AdminBookingResponse> getRecentBookings() {
        return recentBookings;
    }
}
