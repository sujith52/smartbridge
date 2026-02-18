const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // This is the model we made in Step 4

dotenv.config();

const products = [
  { 
    name: "Gold Bangle", 
    price: 120, 
    category: "Bracelets", 
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    description: "A stunning gold bangle, perfect for Sarah's friend Emily."
  },
  { 
    name: "Leather Handbag", 
    price: 85, 
    category: "Bags", 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    description: "Chic and professional, ideal for a busy lifestyle."
  },
  { 
    name: "Silver Earrings", 
    price: 45, 
    category: "Jewelry", 
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
    description: "Elegant silver earrings that match any fashion style."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing products so we don't get duplicates
    await Product.deleteMany({});
    
    // Insert our ShopEZ starter items
    await Product.insertMany(products);
    
    console.log("🌱 Database Seeded with ShopEZ products!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();