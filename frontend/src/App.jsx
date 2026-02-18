import { useState, useEffect } from 'react'; // 1. Added useEffect here
import ProductCard from './components/Productcard.jsx';
import { Routes, Route, Link } from 'react-router-dom';

const CartPage = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 mb-4">Sarah, your cart is empty! 🛍️</p>
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Go find a gift for Emily
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <span className="font-bold text-lg">${item.price}</span>
            </div>
          ))}
          
          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">Total: ${total}</span>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // 2. Start empty to receive API data
  const [loading, setLoading] = useState(true); // 3. Loading state for Sarah

  // 4. useEffect MUST be inside the App function
  useEffect(() => {
    const backendUrl = 'https://3000-firebase-smart-1771324649206.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev';
  
    const getProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
  
    getProducts();
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty, Sarah!");
  
    const backendUrl = 'https://3000-firebase-smart-1771324649206.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev';
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
  
    try {
      const response = await fetch(`${backendUrl}/api/checkout`, {
        method: 'POST', // This tells the server to use the POST route!
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, totalAmount })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setCart([]); // Clear the cart after success
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <nav className="bg-white border-b p-4 w-full sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10">
          <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600">ShopEZ</Link>
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="font-bold text-black bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition">
               🛒 Cart ({cart.length})
            </Link>
          </div>
        </div>
      </nav>
  
      <div className="flex-grow w-full">
        {/* 5. Show loading indicator while fetching */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-xl font-semibold text-gray-500">
            Fetching the latest gifts for Emily...
          </div>
        ) : (
          <Routes>
            <Route path="/" element={
              <main className="max-w-7xl mx-auto py-10 px-4 md:px-10">
                <h2 className="text-3xl font-bold mb-8 text-gray-700">Fashion Accessories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
                  ))}
                </div>
              </main>
            } />
            <Route path="/cart" element={<CartPage cartItems={cart} onCheckout={handleCheckout} />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;