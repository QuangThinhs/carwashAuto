package com.autowashpro.repository;

import com.autowashpro.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    List<Promotion> findByActiveTrueOrderByDiscountPercentDesc();

    Optional<Promotion> findByCodeIgnoreCase(String code);
}
