package com.shopkart.controller;

import com.shopkart.model.Order;
import com.shopkart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    /** POST /api/orders  — place a new order */
    @PostMapping
    public ResponseEntity<Order> place(@RequestBody Order order) {
        return ResponseEntity.ok(service.placeOrder(order));
    }

    /** GET /api/orders/{orderId} */
    @GetMapping("/{order}")
    public ResponseEntity<Order> getByOrderId(@PathVariable String order) {
        return service.getByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /** GET /api/orders?email=user@example.com  (or all orders if no param) */
    @GetMapping
    public List<Order> getOrders(@RequestParam(required = false) String email) {
        return (email != null) ? service.getByEmail(email) : service.getAll();
    }

    /** GET /api/orders/count  — total number of orders */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> count() {
        return ResponseEntity.ok(Map.of("count", service.getAll().size()));
    }

    /** PATCH /api/orders/{orderId}/status  body: { "status": "SHIPPED" } */
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable String orderId,
                                              @RequestBody Map<String, String> body) {
        return service.updateStatus(orderId, body.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
