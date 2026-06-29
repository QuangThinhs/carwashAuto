package com.autowashpro.repository;

import com.autowashpro.entity.Booking;
import com.autowashpro.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerIdOrderByScheduledTimeDesc(Long customerId);

    Optional<Booking> findByIdAndCustomerId(Long id, Long customerId);

    long countByCustomerId(Long customerId);

    long countByCustomerIdAndStatus(Long customerId, BookingStatus status);

    long countByStatus(BookingStatus status);

    @Query("select coalesce(sum(b.price), 0) from Booking b where b.customer.id = ?1 and b.status = ?2")
    long sumPriceByCustomerIdAndStatus(Long customerId, BookingStatus status);

    @Query("select coalesce(sum(b.price), 0) from Booking b where b.status = ?1")
    long sumPriceByStatus(BookingStatus status);

    List<Booking> findTop8ByOrderByIdDesc();

    List<Booking> findTop5ByCustomerIdOrderByScheduledTimeDesc(Long customerId);

    List<Booking> findByStatusInOrderByScheduledTimeAsc(List<BookingStatus> statuses);

    List<Booking> findByStatusInOrderByScheduledTimeDesc(List<BookingStatus> statuses);
}
