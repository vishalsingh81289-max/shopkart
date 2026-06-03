package com.shopkart.service;

import com.shopkart.model.Product;
import com.shopkart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public List<Product> getAll()                    { return repo.findAll(); }
    public Optional<Product> getById(Long id)        { return repo.findById(id); }
    public List<Product> getByCategory(String cat)   { return repo.findByCategory(cat); }
    public List<Product> search(String keyword)      { return repo.search(keyword); }
    public Product save(Product product)             { return repo.save(product); }

    public Optional<Product> update(Long id, Product updated) {
        return repo.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setCategory(updated.getCategory());
            p.setDescription(updated.getDescription());
            p.setPrice(updated.getPrice());
            p.setStock(updated.getStock());
            p.setImage(updated.getImage());
            p.setBadge(updated.getBadge());
            return repo.save(p);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    /** Reduce stock by quantity. Returns false if insufficient stock. */
    public boolean reduceStock(Long productId, int quantity) {
        return repo.findById(productId).map(p -> {
            if (p.getStock() < quantity) return false;
            p.setStock(p.getStock() - quantity);
            repo.save(p);
            return true;
        }).orElse(false);
    }
}
