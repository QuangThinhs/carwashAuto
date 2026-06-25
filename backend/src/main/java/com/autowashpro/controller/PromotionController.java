package com.autowashpro.controller;

import com.autowashpro.dto.PromotionResponse;
import com.autowashpro.service.PromotionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping
    public List<PromotionResponse> list(Principal principal) {
        return promotionService.getForCustomer(principal.getName());
    }
}
