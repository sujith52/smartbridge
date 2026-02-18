


# ShopEZ - MERN Stack E-Commerce Store 🛒

ShopEZ is a full-stack e-commerce application built to provide a seamless gift-shopping experience. This project demonstrates the integration of a React frontend with a Node.js/Express backend and a MongoDB database.

## 🌟 The Scenario: Sarah's Gift Discovery
This project was built around a specific user journey: **Sarah** is looking for a "stunning gold bangle" for her friend **Emily**. She explores the curated collection, adds the perfect accessory to her cart, and completes a seamless transaction with instant order confirmation.

## 🚀 Features
* **Product Discovery:** A responsive grid display of fashion accessories fetched directly from a MongoDB database.
* **Dynamic Shopping Cart:** Real-time cart updates and total price calculation using React state management.
* **Order Processing:** A dedicated POST API that records successful transactions into the database.
* **Modern UI:** Built with Tailwind CSS for a clean, mobile-responsive aesthetic.

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router, Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas with Mongoose ODM.
* **Tools:** Git for version control, Dotenv for environment security.

## 🔧 Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/sujith52/smartbridge.git

```

### 2. Backend Setup

```bash
cd backend
npm install

```

* Create a `.env` file and add your `MONGO_URI`.
* Seed the database: `node seed.js`.
* Start the server: `npm start`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev

```

* The store will be available at `http://localhost:5173` (or your configured port).

## 📡 API Endpoints

* `GET /api/products` - Fetches all available jewelry and accessories.
* `POST /api/checkout` - Submits Sarah's cart items and total amount to the database.

---

Developed by **Sujith** | B.Tech Computer Science student



