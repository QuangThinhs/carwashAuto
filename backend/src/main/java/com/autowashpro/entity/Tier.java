package com.autowashpro.entity;

/** Hang thanh vien + quy tac (nguong chi tieu, ti le diem, cua so dat lich, % giam gia). */
public enum Tier {
    MEMBER("Member", 0L, 1.0, 7, 0),
    SILVER("Silver", 2_000_000L, 1.2, 10, 5),
    GOLD("Gold", 5_000_000L, 1.5, 12, 10),
    PLATINUM("Platinum", 10_000_000L, 2.0, 14, 15);

    private final String label;
    private final long spendThreshold;
    private final double pointRate; // diem tren moi 1000d chi tieu
    private final int bookingWindowDays;
    private final int discountPercent;

    Tier(String label, long spendThreshold, double pointRate, int bookingWindowDays, int discountPercent) {
        this.label = label;
        this.spendThreshold = spendThreshold;
        this.pointRate = pointRate;
        this.bookingWindowDays = bookingWindowDays;
        this.discountPercent = discountPercent;
    }

    public String getLabel() {
        return label;
    }

    public long getSpendThreshold() {
        return spendThreshold;
    }

    public double getPointRate() {
        return pointRate;
    }

    public int getBookingWindowDays() {
        return bookingWindowDays;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    /** Xac dinh hang dua tren tong chi tieu tich luy. */
    public static Tier fromSpend(long spend) {
        Tier result = MEMBER;
        for (Tier t : values()) {
            if (spend >= t.spendThreshold) {
                result = t;
            }
        }
        return result;
    }

    /** Hang ke tiep (null neu da cao nhat). */
    public Tier next() {
        Tier[] all = values();
        return ordinal() < all.length - 1 ? all[ordinal() + 1] : null;
    }
}
