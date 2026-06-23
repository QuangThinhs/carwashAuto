# 🚿 AutoWash Pro

> Hệ thống quản lý rửa xe (máy) tự động thông minh — đặt lịch trước & chương trình khách hàng thân thiết.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)

---

## 📌 Mục lục
1. [Giới thiệu](#-giới-thiệu)
2. [Tính năng chính](#-tính-năng-chính)
3. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
4. [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
5. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
6. [Cơ sở dữ liệu](#-cơ-sở-dữ-liệu)
7. [Cài đặt & chạy](#-cài-đặt--chạy)
8. [Phân công & tiến độ](#-phân-công--tiến-độ)
9. [Thành viên nhóm](#-thành-viên-nhóm)

---

## 🎯 Giới thiệu

**AutoWash Pro** là ứng dụng web giúp tiệm rửa xe máy quản lý việc **đặt lịch trước** và vận hành
**chương trình khách hàng thân thiết nhiều hạng** (Member → Silver → Gold → Platinum).

Khách hàng đặt lịch online, tích điểm sau mỗi lần rửa và đổi điểm lấy ưu đãi; hạng càng cao thì
**được đặt lịch sớm hơn** và **ưu tiên hàng đợi**. Quản trị viên cấu hình hạng/điểm/ưu đãi và chạy
khuyến mãi nhắm theo nhóm khách.


---

## ✨ Tính năng chính

### 👤 Khách hàng (Customer)
- Đăng ký/đăng nhập (gắn **số điện thoại + biển số xe**).
- Quản lý xe máy của mình.
- **Đặt lịch rửa xe** trong cửa sổ thời gian theo hạng (xem bảng dưới).
- Xem **số điểm**, lịch sử rửa xe, ưu đãi đang có.
- **Đổi điểm** lấy giảm giá / rửa miễn phí / dịch vụ thêm.

### ⭐ Loyalty (chương trình thân thiết)
- Tích điểm theo số tiền chi tiêu; điểm **hết hạn sau 12 tháng**.
- **Tự động nâng/hạ hạng** khi rà soát hàng tháng (theo chi tiêu/điểm/số lần rửa).
- Mỗi hạng có cửa sổ đặt lịch & quyền ưu tiên riêng:

  | Hạng | Cửa sổ đặt trước | Ưu tiên hàng đợi |
  | :--- | :---: | :---: |
  | Member | 7 ngày | Thấp |
  | Silver | 10 ngày | Trung bình |
  | Gold | 12 ngày | Cao |
  | Platinum | 14 ngày | Cao nhất |

### 🛠️ Quản trị viên (Admin)
- Cấu hình **quy tắc hạng, tỉ lệ tích điểm, ưu đãi**.
- Quản lý dịch vụ (gói rửa, dịch vụ thêm) và lịch đặt.
- Tạo **khuyến mãi nhắm nhóm** (ví dụ: chỉ gửi cho "Silver trở lên").
- Xem thống kê doanh thu / phân bố hạng / lượt đặt.

---

## 🧰 Công nghệ sử dụng

| Lớp | Công nghệ | Phiên bản |
| :--- | :--- | :--- |
| **Backend** | Java | 17 |
| | Spring Boot (Web, Data JPA, Security) | 3.x |
| | JWT (`jjwt`) | 0.12.x |
| | Maven | 3.9+ |
| **Database** | MySQL | 8.x |
| **Frontend** | Next.js (React) | 14 |
| | TypeScript | 5 |
| | Tailwind CSS | 3 |
| | Axios | latest |
| **Công cụ** | Node.js / npm · Git | 18+ |

---

## 🏗️ Kiến trúc hệ thống

Ứng dụng web tách **Frontend** và **Backend**, giao tiếp qua REST API (JSON).

```
┌──────────────┐     REST API (JSON)     ┌──────────────────┐      JPA      ┌─────────┐
│  Next.js     │  ────────────────────►  │   Spring Boot    │  ──────────►  │  MySQL  │
│  (React)     │  ◄────────────────────  │   REST API       │  ◄──────────  │   8.x   │
│  :3000       │       JWT (Bearer)      │   :8080          │               │  :3306  │
└──────────────┘                         └──────────────────┘               └─────────┘
```

Backend theo mô hình **phân lớp (layered)** quen thuộc:
`Controller → Service → Repository → Entity (JPA) → Database`.

---

## 📂 Cấu trúc thư mục

```text
carwashAuto/
├── README.md                       # Tài liệu này
├── PLAN.md                         # Kế hoạch làm việc nhóm
├── .gitignore
│
├── backend/                        # ☕ Spring Boot REST API (Java 17)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/autowashpro/
│       │   ├── AutoWashProApplication.java   # Điểm khởi chạy
│       │   ├── config/             # SecurityConfig, CorsConfig
│       │   ├── security/           # JWT filter, UserDetails
│       │   ├── controller/         # REST endpoints (Auth, Booking, Loyalty, Admin...)
│       │   ├── service/            # Xử lý nghiệp vụ
│       │   ├── repository/         # Spring Data JPA
│       │   ├── entity/             # JPA entities (User, Customer, Booking...)
│       │   └── dto/                # Request/Response objects
│       └── resources/
│           └── application.properties        # Cấu hình DB, JWT, port
│
├── frontend/                       # ⚛️ Next.js (React) web app
│   ├── package.json
│   └── src/
│       ├── app/                    # Các trang: home, login, register, booking, admin
│       ├── components/             # Component dùng lại (Navbar, Card, Form...)
│       ├── services/               # Gọi API backend (axios)
│       └── lib/                    # Hàm tiện ích (format, auth helper)
│
└── database/
    └── schema.sql                  # Script tạo bảng + dữ liệu mẫu
```

---

## 🗄️ Cơ sở dữ liệu

Các bảng chính (MySQL):

| Bảng | Mô tả |
| :--- | :--- |
| `users` | Tài khoản đăng nhập + vai trò (CUSTOMER / STAFF / ADMIN) |
| `customers` | Hồ sơ khách (tên, số điện thoại, gắn với `users`) |
| `vehicles` | Xe máy của khách (biển số, loại xe) |
| `services` | Gói rửa & dịch vụ thêm (tên, giá, thời lượng) |
| `tiers` | 4 hạng + quy tắc (cửa sổ đặt lịch, tỉ lệ điểm, ưu tiên) |
| `bookings` | Lịch đặt (khách, xe, thời gian, trạng thái) |
| `booking_details` | Dịch vụ trong mỗi lịch đặt |
| `wash_transactions` | Lần rửa hoàn tất (tổng tiền, điểm tích, điểm đổi) |
| `loyalty_accounts` | Số dư điểm, tổng chi tiêu, số lần rửa của khách |
| `point_transactions` | Sổ điểm: tích / đổi / hết hạn (12 tháng) |
| `promotions` | Khuyến mãi nhắm nhóm (điều kiện hạng, giảm giá, thời hạn) |

> Quan hệ tóm tắt: `users 1–1 customers`, `customers 1–n vehicles / bookings`,
> `customers 1–1 loyalty_accounts 1–n point_transactions`, `bookings 1–n booking_details`,
> `bookings 1–1 wash_transactions`.

---

## ⚙️ Cài đặt & chạy

### Yêu cầu
- JDK 17+, Maven 3.9+
- Node.js 18+, npm
- MySQL 8.x

### 1. Tạo database
```bash
mysql -u root -p -e "CREATE DATABASE autowash CHARACTER SET utf8mb4;"
mysql -u root -p autowash < database/schema.sql
```

### 2. Chạy Backend (cổng `8080`)
Sửa thông tin DB trong `backend/src/main/resources/application.properties`, rồi:
```bash
cd backend
mvn spring-boot:run
```
API: `http://localhost:8080`

### 3. Chạy Frontend (cổng `3000`)
```bash
cd frontend
npm install
npm run dev
```
Web: `http://localhost:3000`

---

## 🗓️ Phân công & tiến độ

Chi tiết xem [PLAN.md](PLAN.md). Tóm tắt:

| Tuần | Công việc |
| :--- | :--- |
| 1 | Khảo sát yêu cầu, thiết kế CSDL, dựng khung dự án (Git, cấu trúc thư mục) |
| 2 | Dựng giao diện & kết nối database (entity, repository) |
| 3 | Chức năng cốt lõi: đăng nhập, đặt lịch |
| 4 | Hoàn thiện loyalty, promotion, trang admin; ráp frontend với backend |
| 5 | Kiểm thử, sửa lỗi, viết báo cáo |

---
