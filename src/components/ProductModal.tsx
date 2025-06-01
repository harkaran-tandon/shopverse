// components/ProductModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
};

const ProductModal = ({ isOpen, onClose, product }: Props) => {
  const { addToCart } = useCart();
  const addButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timeout = setTimeout(() => setIsLoading(false), 300); // simulate loading
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!product) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        initialFocus={addButtonRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        {/* Modal panel */}
        <Transition.Child
          as={Fragment}
          enter="transition-transform duration-200"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-transform duration-150"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <Dialog.Panel className="relative bg-[#1f2937] text-white rounded-lg max-w-md w-full p-6 z-10 shadow-lg">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Accessibility Labels */}
            <Dialog.Title id="product-title" className="text-xl font-semibold mb-4">
              {product.name}
            </Dialog.Title>
            <Dialog.Description id="product-desc" className="sr-only">
              View product image, price and add to cart button
            </Dialog.Description>

            {isLoading ? (
              <div className="py-20 text-center text-gray-400">Loading...</div>
            ) : (
              <>
                <Zoom>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded mb-4 cursor-zoom-in"
                  />
                </Zoom>
                <p className="text-blue-400 text-lg mb-2">${product.price.toFixed(2)}</p>
                <button
                  ref={addButtonRef}
                  onClick={() => {
                    addToCart({ ...product, quantity: 1 });
                    onClose();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition"
                >
                  Add to Cart
                </button>
              </>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
