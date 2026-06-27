package com.autowashpro.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class PromotionRequest {

    @NotBlank(message = "Vui lòng nhập mã khuyến mãi")
    private String code;

    @NotBlank(message = "Vui lòng nhập tên khuyến mãi")
    private String name;

    private String description;

    @Min(value = 1, message = "Phần trăm giảm phải từ 1 đến 100")
    @Max(value = 100, message = "Phần trăm giảm phải từ 1 đến 100")
    private int discountPercent;

    /** "" hoac null = moi hang; hoac MEMBER/SILVER/GOLD/PLATINUM. */
    private String minTier;

    @NotNull(message = "Vui lòng chọn ngày bắt đầu")
    private LocalDate startDate;

    @NotNull(message = "Vui lòng chọn ngày kết thúc")
    private LocalDate endDate;

    private boolean active;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(int discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getMinTier() {
        return minTier;
    }

    public void setMinTier(String minTier) {
        this.minTier = minTier;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
