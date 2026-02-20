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



// 1. Connect to MongoDB (OUTSIDE of any if-blocks)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. ONLY use app.listen for local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local Server: http://localhost:${PORT}`);
  });
}

// 3. EXPORT for Vercel (Crucial for serverless)
module.exports = app;