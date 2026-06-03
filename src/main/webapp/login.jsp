<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>AutoWash Pro - Đăng nhập</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f4f7fa; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .login-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); width: 400px; }
    </style>
</head>
<body>
    <div class="login-card">
        <h3 class="text-center text-primary mb-4">🚗 AutoWash Pro</h3>
        
        <% if(request.getAttribute("message") != null) { %>
            <div class="alert alert-info text-center">
                <%= request.getAttribute("message") %>
            </div>
        <% } %>

        <form action="login" method="POST">
            <div class="mb-3">
                <label>Số điện thoại</label>
                <input type="text" class="form-control" name="phone" placeholder="Nhập số điện thoại..." required>
            </div>
            
            <div class="mb-3">
                <label>Họ và Tên (Nếu là khách mới)</label>
                <input type="text" class="form-control" name="name" placeholder="Nhập họ tên...">
            </div>
            
            <button type="submit" class="btn btn-primary w-100">Vào Hệ Thống</button>
        </form>
    </div>
</body>
</html>