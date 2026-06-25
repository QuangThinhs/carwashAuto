package com.autowashpro.repository;

import com.autowashpro.entity.PointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointTransactionRepository extends JpaRepository<PointTransaction, Long> {

    List<PointTransaction> findByLoyaltyAccountIdOrderByCreatedAtDesc(Long loyaltyAccountId);
}
