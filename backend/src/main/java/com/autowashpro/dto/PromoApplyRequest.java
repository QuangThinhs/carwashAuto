package com.autowashpro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** Khach xem truoc giam gia cua mot ma cho mot dich vu. */
public class PromoApplyRequest {

    @NotBlank(message = "Vui lòng nhập mã khuyến mãi")
    private String code;

    @NotNull(message = "Vui lòng chọn dịch vụ")
    private Long serviceId;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}
