package com.autowashpro.repository;

import com.autowashpro.entity.LoyaltyAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoyaltyAccountRepository extends JpaRepository<LoyaltyAccount, Long> {

    Optional<LoyaltyAccount> findByCustomerId(Long customerId);
}
