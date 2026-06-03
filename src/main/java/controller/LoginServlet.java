package controller;

import dao.CustomerDAO;
import model.Customer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Dòng này cực kỳ quan trọng, nó báo cho Tomcat biết đây là đường dẫn /login
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Cài đặt tiếng Việt để không bị lỗi font khi lấy Tên
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 1. Lấy dữ liệu từ ô nhập của trang login.jsp gửi xuống
        String phone = request.getParameter("phone");
        String name = request.getParameter("name");

        CustomerDAO dao = new CustomerDAO();
        
        try {
            // 2. Gọi hàm kiểm tra xem SĐT này có trong Database chưa
            Customer customer = dao.checkCustomerExist(phone);
            
            if (customer != null) {
                // Đã có trong DB -> Đăng nhập thành công
                request.setAttribute("message", "Đăng nhập thành công! Chào " + customer.getName());
            } else {
                // Chưa có -> Khách mới -> Đăng ký (Ông nhớ viết thêm hàm insert vào DAO nhé)
                // dao.insertCustomer(phone, name); 
                request.setAttribute("message", "Đăng ký thành công! Chào mừng " + name);
            }
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("message", "Lỗi Server hoặc chưa bật Database!");
        }

        // 3. Đẩy thông báo về lại trang login.jsp để hiển thị cho người dùng thấy
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }
}