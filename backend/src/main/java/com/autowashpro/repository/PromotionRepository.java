package com.autowashpro.repository;

import com.autowashpro.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    List<Promotion> findByActiveTrueOrderByDiscountPercentDesc();
}
