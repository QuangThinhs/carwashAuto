package com.autowashpro.dto;

public class PromotionResponse {

    private Long id;
    private String code;
    private String name;
    private String description;
    private int discountPercent;
    private String minTierLabel;

    public PromotionResponse(Long id, String code, String name, String description,
                             int discountPercent, String minTierLabel) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.discountPercent = discountPercent;
        this.minTierLabel = minTierLabel;
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

    public String getMinTierLabel() {
        return minTierLabel;
    }
}
