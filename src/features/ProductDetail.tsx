import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';
import { useCart } from '../context/CartContext';
import AppWrapperHOC from '../Root/HOC';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <p className="p-4 text-red-400">Product not found</p>;

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-100">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:underline">Home</Link> /{' '}
        <span className="capitalize">{product.category}</span> /{' '}
        <span className="text-gray-300 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-96 object-cover rounded-lg border border-gray-700"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3 text-white">{product.name}</h1>

          {/* Highlight */}
          <p className="inline-block mb-2 bg-green-700/20 text-green-300 text-sm px-3 py-1 rounded-full">
            Free Shipping
          </p>

          <p className="text-2xl text-blue-400 font-semibold mb-1">${product.price.toFixed(2)}</p>
          <p className="text-yellow-400 text-sm mb-4">⭐ {product.rating}</p>

          <h2 className="text-md font-semibold mb-1 text-gray-200">About this product</h2>
          <p className="text-sm text-gray-300 mb-6">{product.description}</p>

          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-12 mb-4 text-white">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(item => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-gray-100 font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const WrappedProductDetail = AppWrapperHOC(ProductDetail);
export default WrappedProductDetail;
