package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Customer;
import utils.DBContext;

public class CustomerDAO {
    
    // Hàm này để kiểm tra xem số điện thoại đã có trong Database chưa (Dùng cho Đăng nhập)
    public Customer checkCustomerExist(String phone) {
        String query = "SELECT * FROM Customers WHERE phone_number = ?";
        
        try {
            DBContext db = new DBContext();
            Connection conn = db.getConnection();
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, phone);
            
            ResultSet rs = ps.executeQuery();
            
            // Nếu tìm thấy khách hàng
            if (rs.next()) {
                return new Customer(
                    rs.getInt("customer_id"),
                    rs.getString("phone_number"),
                    rs.getString("full_name"),
                    rs.getString("current_tier")
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null; // Trả về null nếu không tìm thấy
    }

    // Hàm này để thêm khách mới (Dùng cho Đăng ký)
    public boolean addCustomer(String phone, String fullName) {
        // Mặc định khách mới vào là hạng Đồng (Bronze)
        String query = "INSERT INTO Customers (phone_number, full_name, current_tier) VALUES (?, ?, 'Bronze')";
        
        try {
            DBContext db = new DBContext();
            Connection conn = db.getConnection();
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, phone);
            ps.setString(2, fullName);
            
            int result = ps.executeUpdate(); // Trả về số dòng bị ảnh hưởng
            return result > 0;
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}