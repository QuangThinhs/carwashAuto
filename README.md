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

### 0. Yêu cầu môi trường

| Công cụ | Phiên bản | Ghi chú |
| :--- | :--- | :--- |
| **JDK** | 17 trở lên | Khuyến nghị LTS (17/21). Dự án vẫn chạy được trên JDK 26 (đã cấu hình sẵn cờ tương thích trong `pom.xml`). |
| **Maven** | 3.9+ | Hoặc dùng IDE (IntelliJ/Eclipse/VS Code) để chạy. |
| **Node.js** | 18+ | Đi kèm `npm`. |
| **MySQL** | 8.x | Phải đang chạy (mặc định cổng `3306`). |

### 1. Lấy mã nguồn

```bash
git clone <URL-repo-cua-ban>
cd carwashAuto
```

### 2. Cấu hình & chạy Backend (cổng `8080`)

**Bước 2.1 — Khai báo mật khẩu MySQL.** Mở `backend/src/main/resources/application.properties`
và sửa dòng mật khẩu cho khớp MySQL của bạn:

```properties
spring.datasource.username=root
spring.datasource.password=your_password   # đổi thành mật khẩu MySQL thật (để trống nếu root không có mật khẩu)
```

> 💡 Không cần tự tạo database — chuỗi kết nối đã có `createDatabaseIfNotExist=true` nên MySQL sẽ
> tự tạo database `autowash`, và Hibernate (`ddl-auto=update`) tự tạo các bảng từ entity.
> *(Tuỳ chọn: muốn có sẵn đủ 11 bảng + dữ liệu mẫu thì chạy `mysql -u root -p autowash < database/schema.sql`.)*

**Bước 2.2 — Chạy backend:**

```bash
cd backend
mvn spring-boot:run
```

Thành công khi log hiện:
```
Tomcat started on port 8080 (http)
Started AutoWashProApplication in X.XXX seconds
```
- REST API: `http://localhost:8080`

### 3. Chạy Frontend (cổng `3000`)

```bash
cd frontend
cp .env.local.example .env.local   # Windows PowerShell: copy .env.local.example .env.local
npm install
npm run dev
```
- Web app: `http://localhost:3000`
- File `.env.local` trỏ tới backend qua biến `NEXT_PUBLIC_API_BASE_URL` (mặc định `http://localhost:8080`).

### 4. Trải nghiệm thử (demo)

1. Mở `http://localhost:3000`.
2. Bấm **Đăng ký** → nhập họ tên, số điện thoại (10 số, bắt đầu bằng `0`), mật khẩu (≥ 6 ký tự).
3. Hệ thống tự đăng nhập và chuyển vào **Dashboard** ("Xin chào, [tên] 👋").
4. Bấm **Đăng xuất** rồi **Đăng nhập** lại bằng số điện thoại + mật khẩu vừa tạo.

### 5. Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân & cách khắc phục |
| :--- | :--- |
| `Access denied for user 'root'@'localhost'` | Sai mật khẩu MySQL → sửa lại `spring.datasource.password` ở bước 2.1. |
| `Communications link failure` / `Connection refused` | MySQL chưa chạy → bật service MySQL rồi chạy lại. |
| `Port 8080 was already in use` | Cổng bị chiếm → tắt ứng dụng đang dùng cổng, hoặc đổi `server.port` trong `application.properties`. |
| Frontend báo `Network Error` khi đăng nhập | Backend chưa chạy, hoặc sai `NEXT_PUBLIC_API_BASE_URL` trong `.env.local`. |
| Lỗi **CORS** trên trình duyệt | Đảm bảo backend chạy ở `8080` và frontend ở `3000` (đã cấu hình CORS cho 2 cổng này). |

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
