import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal';

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

const handleQuickView = () => {
  setIsModalOpen(true);
};
  return (
    <>
    <ProductModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  product={product}
/>
    <div className="bg-gray-900 rounded-2xl shadow-xl p-4 hover:scale-105 transition-transform duration-300">
    <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-48 object-cover rounded-xl transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
        </Link>
        <div className="flex items-start justify-between mt-3">
  <div>
    <h2 className="text-xl font-genz text-green-400">{product.name}</h2>
    <p className="text-green-300 font-bold">${product.price.toFixed(2)}</p>
    <p className="text-yellow-400 text-sm">⭐ {product.rating}</p>
  </div>

  <button
    onClick={() => handleQuickView()}
    className="text-sm underline text-blue-300 hover:text-blue-200"
  >
    Quick View
  </button>
</div>
      
      
    </div>
    </>
  );
};

export default ProductCard;
