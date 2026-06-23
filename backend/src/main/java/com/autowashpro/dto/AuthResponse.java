package com.autowashpro.dto;

public class AuthResponse {

    private String token;
    private String fullName;
    private String phone;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String fullName, String phone, String role) {
        this.token = token;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
