package com.shopkart.service;

import com.shopkart.model.Order;
import com.shopkart.model.OrderItem;
import com.shopkart.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductService productService;

    @Transactional
    public Order placeOrder(Order order) {
        // Generate human-readable order ID
        String uid = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        order.setOrderId("ORD-" + uid);
        order.setStatus("CONFIRMED");
        order.setCreatedAt(LocalDateTime.now());

        // Link items to order and calculate total
        double total = 0.0;
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
                total += item.getPrice() * item.getQuantity();
                // Reduce stock (best-effort; doesn't rollback if product not found)
                productService.reduceStock(item.getProductId(), item.getQuantity());
            }
        }
        order.setTotalAmount(total);

        return orderRepo.save(order);
    }

    public Optional<Order> getByOrderId(String orderId) { return orderRepo.findByOrderId(orderId); }
    public List<Order>     getByEmail(String email)      { return orderRepo.findByCustomerEmail(email); }
    public List<Order>     getAll()                      { return orderRepo.findAll(); }

    public Optional<Order> updateStatus(String orderId, String status) {
        return orderRepo.findByOrderId(orderId).map(o -> {
            o.setStatus(status);
            return orderRepo.save(o);
        });
    }
}
