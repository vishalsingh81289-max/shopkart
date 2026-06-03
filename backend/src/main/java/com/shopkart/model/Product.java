package com.shopkart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    private Double price;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    private Double rating;
    private Integer reviewCount;
    private String  image;
    private String  badge;

    // Default constructor
    public Product() {}

    // Constructor used by DataSeeder
    public Product(String name, String category, String description,
                   Double price, Integer stock, String image, String badge,
                   Double rating, Integer reviewCount) {
        this.name        = name;
        this.category    = category;
        this.description = description;
        this.price       = price;
        this.stock       = stock;
        this.image       = image;
        this.badge       = badge;
        this.rating      = rating;
        this.reviewCount = reviewCount;
    }

    // ── Getters & Setters ──────────────────────────────────────────────────
    public Long    getId()           { return id; }
    public void    setId(Long id)    { this.id = id; }

    public String  getName()              { return name; }
    public void    setName(String name)   { this.name = name; }

    public String  getCategory()                   { return category; }
    public void    setCategory(String category)    { this.category = category; }

    public String  getDescription()                     { return description; }
    public void    setDescription(String description)   { this.description = description; }

    public Double  getPrice()              { return price; }
    public void    setPrice(Double price)  { this.price = price; }

    public Integer getStock()              { return stock; }
    public void    setStock(Integer stock) { this.stock = stock; }

    public Double  getRating()               { return rating; }
    public void    setRating(Double rating)  { this.rating = rating; }

    public Integer getReviewCount()                    { return reviewCount; }
    public void    setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String  getImage()              { return image; }
    public void    setImage(String image)  { this.image = image; }

    public String  getBadge()              { return badge; }
    public void    setBadge(String badge)  { this.badge = badge; }
}
