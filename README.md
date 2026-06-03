# 🛍 ShopKart — React + Spring Boot

Full-stack shopping app: React (Vite) frontend + Spring Boot REST API backend.

---

## ✅ Prerequisites — install these first

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org  (choose LTS) |
| JDK | 17+ | https://adoptium.net |
| Maven | 3.9+ | https://maven.apache.org/download.cgi |

After installing, verify in PowerShell:
```
node -v
npm -v
java -version
mvn -v
```

---

## 🚀 How to run (Windows PowerShell)

### Step 1 — Start the Spring Boot backend

Open **PowerShell Window 1**:
```powershell
cd C:\Users\YOUR_NAME\Downloads\shopkart\backend
mvn spring-boot:run
```

Wait for:  `Started ShopKartApplication` + `✅  12 products seeded`
Backend runs at → **http://localhost:8080**

### Step 2 — Start the React frontend

Open **PowerShell Window 2**:
```powershell
cd C:\Users\YOUR_NAME\Downloads\shopkart\frontend
npm install
npm run dev
```

Wait for: `Local: http://localhost:3000/`
Open → **http://localhost:3000** in your browser

> ⚠️  Keep BOTH windows open while using the app.

---

## 📁 Project Structure

```
shopkart/
├── frontend/                        ← React + Vite
│   ├── index.html
│   ├── vite.config.js               ← proxies /api → localhost:8080
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                  ← Routes
│       ├── index.css
│       ├── api.js                   ← Axios calls to Spring Boot
│       ├── context/
│       │   └── CartContext.jsx      ← Global cart state
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ProductCard.jsx
│       └── pages/
│           ├── Home.jsx             ← Product listing + filter
│           ├── ProductDetail.jsx
│           ├── Cart.jsx
│           ├── Checkout.jsx         ← Calls POST /api/orders
│           └── OrderSuccess.jsx
│
└── backend/                         ← Spring Boot 3 + JPA + H2
    ├── pom.xml
    └── src/main/java/com/shopkart/
        ├── ShopKartApplication.java
        ├── model/    Product, Order, OrderItem
        ├── repository/
        ├── service/
        ├── controller/
        └── config/   CorsConfig, DataSeeder
```

---

## 🔌 REST API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | /api/products | All products |
| GET    | /api/products/{id} | Single product |
| GET    | /api/products/category/{cat} | Filter by category |
| GET    | /api/products/search?keyword= | Search |
| POST   | /api/products | Create product |
| PUT    | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Delete product |
| POST   | /api/orders | Place order |
| GET    | /api/orders/{orderId} | Get order |
| GET    | /api/orders?email= | Orders by email |
| PATCH  | /api/orders/{orderId}/status | Update status |

H2 Console (view DB): http://localhost:8080/h2-console
  JDBC URL: jdbc:h2:mem:shopkartdb  |  User: sa  |  Password: (blank)

---

## 🗄 Switch to MySQL (Production)

1. Edit `backend/pom.xml` — comment out H2, uncomment MySQL dependency
2. Edit `backend/src/main/resources/application.properties` — comment out H2 block, uncomment MySQL block and set your credentials
3. Create the database: `CREATE DATABASE shopkartdb;`
