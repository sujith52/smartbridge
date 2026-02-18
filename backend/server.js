const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/Product');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());



// backend/server.js
const Order = require('./models/Order');

// Make sure this is app.post, NOT app.get
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({ items, totalAmount });
    await newOrder.save();
    
    res.status(201).json({ message: "Order placed successfully! 🎁" });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// Add this at the top with other requires



// 1. Better CORS: Allow everything for development in IDX


// 2. Add a 'Health Check' route
app.get('/', (req, res) => {
  res.status(200).json({ status: "ok", message: "ShopEZ Backend is Live! 🚀" });
});

// 3. The Product API
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Fetched products:", products.length); // Log to terminal
    res.json(products);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. Listen on 0.0.0.0 for IDX
// DON'T DO THIS: app.listen(5000);
// DO THIS:
app.listen(PORT = 3000, '0.0.0.0', () => {
  console.log("Server is reachable externally!");
  console.log(`http://localhost:${PORT}`)
});
// 5. Database Connection (Double check your .env!)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("📦 Connected to ShopEZ MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


