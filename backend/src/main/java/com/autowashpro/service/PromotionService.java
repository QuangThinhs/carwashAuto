package com.autowashpro.service;

import com.autowashpro.dto.PromotionResponse;
import com.autowashpro.entity.Tier;
import com.autowashpro.repository.PromotionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final LoyaltyService loyaltyService;

    public PromotionService(PromotionRepository promotionRepository, LoyaltyService loyaltyService) {
        this.promotionRepository = promotionRepository;
        this.loyaltyService = loyaltyService;
    }

    /** Khuyen mai dang hieu luc va phu hop voi hang cua khach. */
    @Transactional
    public List<PromotionResponse> getForCustomer(String username) {
        Tier tier = loyaltyService.getTier(username);
        LocalDate today = LocalDate.now();
        return promotionRepository.findByActiveTrueOrderByDiscountPercentDesc().stream()
                .filter(p -> !today.isBefore(p.getStartDate()) && !today.isAfter(p.getEndDate()))
                .filter(p -> p.getMinTier() == null || tier.ordinal() >= p.getMinTier().ordinal())
                .map(p -> new PromotionResponse(p.getId(), p.getCode(), p.getName(), p.getDescription(),
                        p.getDiscountPercent(), p.getMinTier() != null ? p.getMinTier().getLabel() : null))
                .toList();
    }
}
