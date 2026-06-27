package com.autowashpro.controller;

import com.autowashpro.dto.WashBayResponse;
import com.autowashpro.service.OperationsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bays")
public class AdminBayController {

    private final OperationsService operationsService;

    public AdminBayController(OperationsService operationsService) {
        this.operationsService = operationsService;
    }

    @GetMapping
    public List<WashBayResponse> list() {
        return operationsService.listBays();
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<Void> assign(@PathVariable Long id, @RequestParam Long bookingId) {
        operationsService.assign(id, bookingId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Void> complete(@PathVariable Long id) {
        operationsService.completeBay(id);
        return ResponseEntity.noContent().build();
    }
}
