package com.shopkart.repository;

import com.shopkart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :kw, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :kw, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :kw, '%'))")
    List<Product> search(@Param("kw") String keyword);

    List<Product> findByStockGreaterThan(Integer minStock);
}
