package com.shopkart.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String orderId;          // e.g. ORD-A1B2C3D4
    private String customerName;
    private String customerEmail;
    private String phone;
    private String address;
    private String paymentMethod;
    private Double totalAmount;
    private String status;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    // ── Getters & Setters ──────────────────────────────────────────────────
    public Long   getId()          { return id; }
    public void   setId(Long id)   { this.id = id; }

    public String getOrderId()               { return orderId; }
    public void   setOrderId(String orderId) { this.orderId = orderId; }

    public String getCustomerName()                       { return customerName; }
    public void   setCustomerName(String customerName)    { this.customerName = customerName; }

    public String getCustomerEmail()                        { return customerEmail; }
    public void   setCustomerEmail(String customerEmail)    { this.customerEmail = customerEmail; }

    public String getPhone()             { return phone; }
    public void   setPhone(String phone) { this.phone = phone; }

    public String getAddress()               { return address; }
    public void   setAddress(String address) { this.address = address; }

    public String getPaymentMethod()                      { return paymentMethod; }
    public void   setPaymentMethod(String paymentMethod)  { this.paymentMethod = paymentMethod; }

    public Double getTotalAmount()                    { return totalAmount; }
    public void   setTotalAmount(Double totalAmount)  { this.totalAmount = totalAmount; }

    public String getStatus()              { return status; }
    public void   setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt()                   { return createdAt; }
    public void          setCreatedAt(LocalDateTime t)    { this.createdAt = t; }

    public List<OrderItem> getItems()              { return items; }
    public void            setItems(List<OrderItem> items) { this.items = items; }
}
