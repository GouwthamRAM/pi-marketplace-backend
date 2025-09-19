# Pi Marketplace Backend 🟣🟡
_Express + PostgreSQL API powering the Pi Marketplace (Pi Hackathon 2025)_

## 🚀 Overview
This is the **backend API** for the Pi Marketplace — a hyperlocal buy/sell platform for the **Pi Network**.  
It provides RESTful endpoints for:
- Users
- Listings
- Orders (with mock Pi payment flow)

Deployed on **Railway** with PostgreSQL, and consumed by the [frontend](https://your-vercel-url.vercel.app).

---

## ✨ Features
- **Users API**: fetch Pioneer profile (buyer/seller)
- **Listings API**: browse and view local items
- **Orders API**: create, confirm, cancel orders
- **Mock Pi Payments**: placeholder escrow flow for midpoint demo
- **Sequelize ORM** with PostgreSQL
- **Production-ready** on Railway

---

## 🛠 Tech Stack
- Node.js + Express
- Sequelize ORM
- PostgreSQL (Railway-hosted)
- Railway (deployment)
- dotenv for config

---

## 🔗 Demo Links
- **Backend API (Railway)** → [Listings Endpoint](https://your-railway-backend-url.up.railway.app/api/v1/listings)  
- **Frontend App (Vercel)** → [Pi Marketplace UI](https://your-vercel-url.vercel.app)

---

## 👥 Demo Users (Seeded Data)
- **Buyer** → Bob Buyer (id = 2)  
- **Seller** → Anna Seller (id = 1)  

---

## ⚙️ Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/pi-marketplace-backend.git
cd pi-marketplace-backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pimarketplace
PORT=8080
```

### 3. Run Migrations & Seed Data
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 4. Start Server
```bash
npm run dev
```

---

## 📡 API Routes

### Users
- `GET /api/v1/users` → all users
- `GET /api/v1/users/:id` → single user

### Listings
- `GET /api/v1/listings` → all listings
- `GET /api/v1/listings/:id` → single listing
- `POST /api/v1/listings` → create listing

### Orders
- `POST /api/v1/orders` → create order
- `PUT /api/v1/orders/:id/confirm` → confirm order
- `PUT /api/v1/orders/:id/cancel` → cancel order
- `POST /api/v1/orders/mock` → mock Pi payment order (for demo)

---

## 📅 Hackathon Timeline
- **Midpoint (19 Sep)** → Working backend deployed on Railway ✅
- **Final (19 Oct)** → Integrate real Pi Payments SDK + improve order lifecycle

---

## 👨‍💻 Author
Built by **Gouwtham Ravikumar** for **Pi Hackathon 2025**.
