package com.shopkart.config;

import com.shopkart.model.Product;
import com.shopkart.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    // Products with stock at or below this level are flagged for restocking.
    private static final int LOW_STOCK_THRESHOLD = 5;

    @Autowired
    private ProductRepository repo;

    @Override
    public void run(String... args) {
        if (repo.count() > 0) return;   // Skip if already seeded

        repo.save(new Product("Wireless Headphones",  "Electronics",  "Premium noise-cancelling headphones with 30-hour battery life and foldable design.",    2499.0,  12, "🎧", "Best Seller", 4.5, 128));
        repo.save(new Product("Running Shoes",         "Footwear",     "Lightweight mesh running shoes with responsive cushioning and breathable upper.",       3299.0,   8, "👟", null,          4.2,  89));
        repo.save(new Product("Smart Watch",           "Electronics",  "Feature-rich smartwatch with GPS, heart-rate monitor, and 7-day battery.",             5999.0,   5, "⌚", "New",          4.7, 204));
        repo.save(new Product("Linen Shirt",           "Clothing",     "Premium breathable linen shirt, perfect for summer. Available in multiple colours.",     899.0,  20, "👔", null,          4.0,  56));
        repo.save(new Product("Coffee Maker",          "Home",         "12-cup drip coffee maker with programmable timer and keep-warm plate.",                 1899.0,   3, "☕", "Hot Deal",     4.6, 312));
        repo.save(new Product("Yoga Mat",              "Sports",       "Non-slip eco-friendly TPE yoga mat, 6mm thick with alignment lines.",                    699.0,  15, "🧘", null,          4.3,  77));
        repo.save(new Product("Mechanical Keyboard",  "Electronics",  "Tactile brown-switch mechanical keyboard with per-key RGB backlight.",                  4499.0,   7, "⌨️", "Top Rated",    4.8, 165));
        repo.save(new Product("Backpack",              "Accessories",  "Durable 30L laptop backpack with USB-charging port and anti-theft zipper.",            1599.0,  10, "🎒", null,          4.1,  93));
        repo.save(new Product("Polarised Sunglasses",  "Accessories",  "UV400 polarised sunglasses with lightweight TR90 frame and scratch-resistant lens.",   1299.0,  18, "🕶️", null,          4.4,  48));
        repo.save(new Product("Air Purifier",          "Home",         "True HEPA air purifier covering up to 400 sq ft with 3-stage filtration.",             3899.0,   6, "💨", "Sale",         4.5, 141));
        repo.save(new Product("Whey Protein",          "Sports",       "2kg whey protein powder, chocolate flavour, 25g protein per serving.",                 1199.0,  25, "💪", null,          4.2, 230));
        repo.save(new Product("Leather Wallet",        "Accessories",  "Slim genuine leather bifold wallet with RFID-blocking inner lining.",                   799.0,  14, "👜", null,          4.6,  67));
        repo.save(new Product("Puma Shoes",            "Footwear",     "Stylish and comfortable Puma shoes for everyday wear.",                                4599.0,  10, "👟", null,          4.4,  95));
        repo.save(new Product("Adidas Shoes",        "Footwear",     "Classic Adidas shoes with iconic design and superior comfort.",                        4299.0,  12, "👟", "New",         4.6, 110));


        logger.info("✅ {} products seeded into the database.", repo.count());

        // Low-stock report: warn about products that need restocking soon.
        List<String> lowStock = repo.findAll().stream()
                .filter(p -> p.getStock() <= LOW_STOCK_THRESHOLD)
                .map(p -> p.getName() + " (" + p.getStock() + " left)")
                .toList();

        if (lowStock.isEmpty()) {
            logger.info("📦 All products are well stocked.");
        } else {
            logger.warn("⚠️ {} product(s) low on stock (≤ {} units): {}",
                    lowStock.size(), LOW_STOCK_THRESHOLD, lowStock);
        }
    }
}
