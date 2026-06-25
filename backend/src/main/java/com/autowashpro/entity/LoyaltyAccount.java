package com.autowashpro.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/** Tai khoan diem thuong cua khach (bang `loyalty_accounts`), 1-1 voi Customer. */
@Entity
@Table(name = "loyalty_accounts")
public class LoyaltyAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false, unique = true)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Tier tier;

    @Column(name = "points_balance", nullable = false)
    private int pointsBalance;

    @Column(name = "lifetime_spend", nullable = false)
    private long lifetimeSpend;

    @Column(name = "visit_count", nullable = false)
    private int visitCount;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Tier getTier() {
        return tier;
    }

    public void setTier(Tier tier) {
        this.tier = tier;
    }

    public int getPointsBalance() {
        return pointsBalance;
    }

    public void setPointsBalance(int pointsBalance) {
        this.pointsBalance = pointsBalance;
    }

    public long getLifetimeSpend() {
        return lifetimeSpend;
    }

    public void setLifetimeSpend(long lifetimeSpend) {
        this.lifetimeSpend = lifetimeSpend;
    }

    public int getVisitCount() {
        return visitCount;
    }

    public void setVisitCount(int visitCount) {
        this.visitCount = visitCount;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
