package com.autowashpro.repository;

import com.autowashpro.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByPhone(String phone);

    Optional<Customer> findByUserUsername(String username);
}
