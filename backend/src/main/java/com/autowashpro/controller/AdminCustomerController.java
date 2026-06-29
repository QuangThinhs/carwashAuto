package com.autowashpro.controller;

import com.autowashpro.dto.AdminCustomerRequest;
import com.autowashpro.dto.AdminCustomerResponse;
import com.autowashpro.service.OperationsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
public class AdminCustomerController {

    private final OperationsService operationsService;

    public AdminCustomerController(OperationsService operationsService) {
        this.operationsService = operationsService;
    }

    @GetMapping
    public List<AdminCustomerResponse> list() {
        return operationsService.listCustomers();
    }

    @PutMapping("/{id}")
    public AdminCustomerResponse update(@PathVariable Long id, @Valid @RequestBody AdminCustomerRequest request) {
        return operationsService.updateCustomer(id, request);
    }
}
