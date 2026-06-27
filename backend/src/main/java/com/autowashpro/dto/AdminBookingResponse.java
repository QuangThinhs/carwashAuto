package com.autowashpro.dto;

import java.time.LocalDateTime;

public class AdminBookingResponse {

    private Long id;
    private String customerName;
    private String vehiclePlate;
    private String serviceName;
    private LocalDateTime scheduledTime;
    private String status;
    private long price;

    public AdminBookingResponse(Long id, String customerName, String vehiclePlate, String serviceName,
                                LocalDateTime scheduledTime, String status, long price) {
        this.id = id;
        this.customerName = customerName;
        this.vehiclePlate = vehiclePlate;
        this.serviceName = serviceName;
        this.scheduledTime = scheduledTime;
        this.status = status;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public String getServiceName() {
        return serviceName;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public String getStatus() {
        return status;
    }

    public long getPrice() {
        return price;
    }
}
