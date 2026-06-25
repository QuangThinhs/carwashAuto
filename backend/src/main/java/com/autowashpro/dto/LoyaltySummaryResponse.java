package com.autowashpro.dto;

public class LoyaltySummaryResponse {

    private String tier;
    private String tierLabel;
    private int pointsBalance;
    private long lifetimeSpend;
    private int visitCount;
    private int discountPercent;
    private int bookingWindowDays;
    private String nextTierLabel;
    private long spendToNextTier;
    private int progressPercent;

    public LoyaltySummaryResponse(String tier, String tierLabel, int pointsBalance, long lifetimeSpend,
                                  int visitCount, int discountPercent, int bookingWindowDays,
                                  String nextTierLabel, long spendToNextTier, int progressPercent) {
        this.tier = tier;
        this.tierLabel = tierLabel;
        this.pointsBalance = pointsBalance;
        this.lifetimeSpend = lifetimeSpend;
        this.visitCount = visitCount;
        this.discountPercent = discountPercent;
        this.bookingWindowDays = bookingWindowDays;
        this.nextTierLabel = nextTierLabel;
        this.spendToNextTier = spendToNextTier;
        this.progressPercent = progressPercent;
    }

    public String getTier() {
        return tier;
    }

    public String getTierLabel() {
        return tierLabel;
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

    public int getDiscountPercent() {
        return discountPercent;
    }

    public int getBookingWindowDays() {
        return bookingWindowDays;
    }

    public String getNextTierLabel() {
        return nextTierLabel;
    }

    public long getSpendToNextTier() {
        return spendToNextTier;
    }

    public int getProgressPercent() {
        return progressPercent;
    }
}
