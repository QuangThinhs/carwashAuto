package com.autowashpro.service;

import com.autowashpro.dto.AdminPromotionResponse;
import com.autowashpro.dto.PromotionRequest;
import com.autowashpro.entity.Promotion;
import com.autowashpro.entity.Tier;
import com.autowashpro.repository.PromotionRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PromotionAdminService {

    private final PromotionRepository repository;

    public PromotionAdminService(PromotionRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<AdminPromotionResponse> listAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream().map(this::toResponse).toList();
    }

    @Transactional
    public AdminPromotionResponse create(PromotionRequest req) {
        Promotion p = new Promotion();
        apply(p, req);
        repository.save(p);
        return toResponse(p);
    }

    @Transactional
    public AdminPromotionResponse update(Long id, PromotionRequest req) {
        Promotion p = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khuyến mãi"));
        apply(p, req);
        repository.save(p);
        return toResponse(p);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Không tìm thấy khuyến mãi");
        }
        repository.deleteById(id);
    }

    private void apply(Promotion p, PromotionRequest req) {
        p.setCode(req.getCode());
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setDiscountPercent(req.getDiscountPercent());
        p.setMinTier(parseTier(req.getMinTier()));
        p.setStartDate(req.getStartDate());
        p.setEndDate(req.getEndDate());
        p.setActive(req.isActive());
    }

    private Tier parseTier(String s) {
        if (s == null || s.isBlank()) {
            return null;
        }
        return Tier.valueOf(s);
    }

    private AdminPromotionResponse toResponse(Promotion p) {
        return new AdminPromotionResponse(p.getId(), p.getCode(), p.getName(), p.getDescription(),
                p.getDiscountPercent(), p.getMinTier() != null ? p.getMinTier().name() : null,
                p.getStartDate(), p.getEndDate(), p.isActive());
    }
}
