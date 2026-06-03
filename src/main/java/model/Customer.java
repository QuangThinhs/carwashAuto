package model;

public class Customer {
    private int customerId;
    private String phoneNumber;
    private String fullName;
    private String currentTier;

    // Constructor rỗng (Bắt buộc phải có)
    public Customer() {
    }

    // Constructor đầy đủ
    public Customer(int customerId, String phoneNumber, String fullName, String currentTier) {
        this.customerId = customerId;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.currentTier = currentTier;
    }

    // Các hàm Getter / Setter để lấy và gán dữ liệu
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCurrentTier() { return currentTier; }
    public void setCurrentTier(String currentTier) { this.currentTier = currentTier; }

    // Hàm "cứu giá" để đồng bộ với LoginServlet
    public String getName() {
        return this.fullName;
    }
}