const ProductCard = ({ product, onAdd }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-blue-600">${product.price}</span>
            {/* Call the function on click */}
            <button 
              onClick={onCheckout}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;