package com.autowashpro.service;

import com.autowashpro.dto.AdminBookingResponse;
import com.autowashpro.dto.WashBayResponse;
import com.autowashpro.entity.BayStatus;
import com.autowashpro.entity.Booking;
import com.autowashpro.entity.BookingStatus;
import com.autowashpro.entity.WashBay;
import com.autowashpro.repository.BookingRepository;
import com.autowashpro.repository.WashBayRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Van hanh: quan ly bai rua + xu ly lich dat phia admin. */
@Service
public class OperationsService {

    private final WashBayRepository bayRepo;
    private final BookingRepository bookingRepo;
    private final LoyaltyService loyaltyService;

    public OperationsService(WashBayRepository bayRepo, BookingRepository bookingRepo, LoyaltyService loyaltyService) {
        this.bayRepo = bayRepo;
        this.bookingRepo = bookingRepo;
        this.loyaltyService = loyaltyService;
    }

    @Transactional(readOnly = true)
    public List<WashBayResponse> listBays() {
        return bayRepo.findAllByOrderByIdAsc().stream().map(this::toBay).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminBookingResponse> listBookings() {
        return bookingRepo.findAll(Sort.by(Sort.Direction.DESC, "id")).stream().map(this::toBooking).toList();
    }

    /** Xep mot lich dat (dang cho) vao mot bai trong -> bat dau rua. */
    @Transactional
    public void assign(Long bayId, Long bookingId) {
        WashBay bay = bay(bayId);
        if (bay.getStatus() != BayStatus.FREE) {
            throw new IllegalArgumentException("Bãi này đang có xe");
        }
        Booking booking = booking(bookingId);
        if (booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalArgumentException("Lịch này không ở trạng thái chờ");
        }
        booking.setStatus(BookingStatus.IN_PROGRESS);
        bookingRepo.save(booking);
        bay.setStatus(BayStatus.OCCUPIED);
        bay.setCurrentBooking(booking);
        bayRepo.save(bay);
    }

    /** Hoan tat rua tai bai -> lich DONE, tich diem, giai phong bai. */
    @Transactional
    public void completeBay(Long bayId) {
        WashBay bay = bay(bayId);
        Booking booking = bay.getCurrentBooking();
        if (bay.getStatus() != BayStatus.OCCUPIED || booking == null) {
            throw new IllegalArgumentException("Bãi này đang trống");
        }
        booking.setStatus(BookingStatus.DONE);
        bookingRepo.save(booking);
        loyaltyService.earnForWash(booking.getCustomer(), booking.getPrice(), booking.getService().getName());
        bay.setStatus(BayStatus.FREE);
        bay.setCurrentBooking(null);
        bayRepo.save(bay);
    }

    @Transactional
    public void confirmBooking(Long id) {
        Booking b = booking(id);
        if (b.getStatus() != BookingStatus.PENDING) {
            throw new IllegalArgumentException("Chỉ xác nhận được lịch đang chờ");
        }
        b.setStatus(BookingStatus.CONFIRMED);
        bookingRepo.save(b);
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking b = booking(id);
        if (b.getStatus() != BookingStatus.PENDING && b.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalArgumentException("Không thể huỷ lịch ở trạng thái này");
        }
        b.setStatus(BookingStatus.CANCELLED);
        bookingRepo.save(b);
    }

    private WashBay bay(Long id) {
        return bayRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bãi rửa"));
    }

    private Booking booking(Long id) {
        return bookingRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch đặt"));
    }

    private WashBayResponse toBay(WashBay bay) {
        Booking b = bay.getCurrentBooking();
        if (b == null) {
            return new WashBayResponse(bay.getId(), bay.getName(), bay.getStatus().name(), null, null, null, null, 0);
        }
        return new WashBayResponse(bay.getId(), bay.getName(), bay.getStatus().name(), b.getId(),
                b.getCustomer().getFullName(), b.getVehicle().getLicensePlate(), b.getService().getName(), b.getPrice());
    }

    private AdminBookingResponse toBooking(Booking b) {
        return new AdminBookingResponse(b.getId(), b.getCustomer().getFullName(), b.getVehicle().getLicensePlate(),
                b.getService().getName(), b.getScheduledTime(), b.getStatus().name(), b.getPrice());
    }
}
