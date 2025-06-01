import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AppWrapperHOC from '../Root/HOC';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border border-gray-600 rounded-lg p-4 hover:border-gray-400 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-24 h-24 object-cover rounded-md shadow"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                  <p className="text-gray-300">${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    min="1"
                    className="w-20 mt-2 px-3 py-1 rounded bg-[#1b2b38] border border-gray-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                    aria-label={`Update quantity for ${item.name}`}
                  />
                </div>
                <button
                  className="text-red-500 hover:text-red-400 hover:underline transition"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold">
              Total: <span className="text-green-400">${total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/products')}
                className="px-5 py-2 rounded-lg border border-gray-500 text-gray-200 hover:bg-gray-700 transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => alert('Proceeding to checkout...')}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const WrappedCart = AppWrapperHOC(Cart);
export default WrappedCart;
