package utils;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBContext {
    private final String serverName = "localhost";
    private final String dbName = "autowash_pro"; // Tên database trong MySQL
    private final String portNumber = "3306";
    private final String userID = "root";
    private final String password = ""; // Pass mặc định của XAMPP thường là để trống

    public Connection getConnection() throws Exception {
        String url = "jdbc:mysql://" + serverName + ":" + portNumber + "/" + dbName + "?useSSL=false&characterEncoding=UTF-8";
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, userID, password);
    }
}