package com.autowashpro.dto;

import java.time.LocalDateTime;

public class PointHistoryResponse {

    private Long id;
    private String type;
    private int points;
    private String description;
    private LocalDateTime createdAt;

    public PointHistoryResponse(Long id, String type, int points, String description, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.points = points;
        this.description = description;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public int getPoints() {
        return points;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
