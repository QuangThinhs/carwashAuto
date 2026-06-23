package com.autowashpro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Vui long nhap ho ten")
    private String fullName;

    @NotBlank(message = "Vui long nhap so dien thoai")
    @Pattern(regexp = "^0\\d{9}$", message = "So dien thoai khong hop le (10 so, bat dau bang 0)")
    private String phone;

    @Email(message = "Email khong hop le")
    private String email;

    @NotBlank(message = "Vui long nhap mat khau")
    @Size(min = 6, message = "Mat khau toi thieu 6 ky tu")
    private String password;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
