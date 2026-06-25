package com.autowashpro.controller;

import com.autowashpro.dto.LoyaltySummaryResponse;
import com.autowashpro.dto.PointHistoryResponse;
import com.autowashpro.service.LoyaltyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/loyalty")
public class LoyaltyController {

    private final LoyaltyService loyaltyService;

    public LoyaltyController(LoyaltyService loyaltyService) {
        this.loyaltyService = loyaltyService;
    }

    @GetMapping("/me")
    public LoyaltySummaryResponse me(Principal principal) {
        return loyaltyService.getSummary(principal.getName());
    }

    @GetMapping("/me/history")
    public List<PointHistoryResponse> history(Principal principal) {
        return loyaltyService.getLedger(principal.getName());
    }
}
