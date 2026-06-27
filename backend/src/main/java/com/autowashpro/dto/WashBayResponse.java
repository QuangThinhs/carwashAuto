package com.autowashpro.dto;

public class WashBayResponse {

    private Long id;
    private String name;
    private String status;
    private Long bookingId;
    private String customerName;
    private String vehiclePlate;
    private String serviceName;
    private long price;

    public WashBayResponse(Long id, String name, String status, Long bookingId,
                           String customerName, String vehiclePlate, String serviceName, long price) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.bookingId = bookingId;
        this.customerName = customerName;
        this.vehiclePlate = vehiclePlate;
        this.serviceName = serviceName;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }

    public Long getBookingId() {
        return bookingId;
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

    public long getPrice() {
        return price;
    }
}
