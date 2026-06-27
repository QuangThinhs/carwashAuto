package com.autowashpro.dto;

import java.time.LocalDate;

public class AdminPromotionResponse {

    private Long id;
    private String code;
    private String name;
    private String description;
    private int discountPercent;
    private String minTier;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean active;

    public AdminPromotionResponse(Long id, String code, String name, String description, int discountPercent,
                                  String minTier, LocalDate startDate, LocalDate endDate, boolean active) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.discountPercent = discountPercent;
        this.minTier = minTier;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    public String getMinTier() {
        return minTier;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public boolean isActive() {
        return active;
    }
}
