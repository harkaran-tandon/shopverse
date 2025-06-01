import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // blur if scrolled more than 10px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={
        scrolled
          ? {
              backgroundColor: 'rgba(0, 77, 64, 0.3)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }
          : {
              backgroundColor: '#004d40', // solid teal when not scrolled
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
            }
      }
      className="text-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg border-b border-green-400 transition-colors duration-300"
    >
      <Link to="/" className="text-3xl font-genz tracking-wide drop-shadow hover:scale-105 transition-transform">
        🎧 ShopVerse
      </Link>
      <nav className="space-x-6 text-lg font-semibold">
        <Link to="/" className="hover:underline hover:text-green-400 transition-colors">
          Home
        </Link>
        <Link to="/cart" className="hover:underline hover:text-green-400 transition-colors">
          Cart <span className="bg-green-400 text-black px-2 py-1 rounded-full ml-1">{cart.length}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
