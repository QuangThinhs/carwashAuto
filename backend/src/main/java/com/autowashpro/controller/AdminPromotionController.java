package com.autowashpro.controller;

import com.autowashpro.dto.AdminPromotionResponse;
import com.autowashpro.dto.PromotionRequest;
import com.autowashpro.service.PromotionAdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/promotions")
public class AdminPromotionController {

    private final PromotionAdminService promotionAdminService;

    public AdminPromotionController(PromotionAdminService promotionAdminService) {
        this.promotionAdminService = promotionAdminService;
    }

    @GetMapping
    public List<AdminPromotionResponse> list() {
        return promotionAdminService.listAll();
    }

    @PostMapping
    public AdminPromotionResponse create(@Valid @RequestBody PromotionRequest req) {
        return promotionAdminService.create(req);
    }

    @PutMapping("/{id}")
    public AdminPromotionResponse update(@PathVariable Long id, @Valid @RequestBody PromotionRequest req) {
        return promotionAdminService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        promotionAdminService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
