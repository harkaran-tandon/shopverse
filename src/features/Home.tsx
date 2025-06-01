import { useState, useMemo, useEffect, useRef } from 'react';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';
import AppWrapperHOC from '../Root/HOC';
import ProductSkeleton from '../components/ProductSkeleton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollAnimation } from '../components/ScrollAnimation';

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(1000); // adjust based on your data
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const productGridRef = useRef<HTMLDivElement>(null);

  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setVisibleProducts(products);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter products after loading
  const filteredProducts = useMemo(() => {
    return visibleProducts.filter(p => {
      return (
        (selectedCategory ? p.category === selectedCategory : true) &&
        p.rating >= selectedRating &&
        p.price <= selectedPrice
      );
    });
  }, [selectedCategory, selectedRating, selectedPrice, visibleProducts]);

  useEffect(() => {
    if (!loading && productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredProducts, loading]);

  const renderFilters = () => (
    <section aria-label="Product Filters" className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Category Filter */}
      <div className="flex flex-col mb-4">
        <label htmlFor="category" className="text-gray-300 mb-1">Category:</label>
        <select
          id="category"
          className="px-3 py-2 rounded bg-[#1b2b38] text-white border border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All</option>
          {[...new Set(products.map(p => p.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col mb-4">
        <label htmlFor="rating" className="text-gray-300 mb-1">Min Rating:</label>
        <select
          id="rating"
          className="px-3 py-2 rounded bg-[#1b2b38] text-white border border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          aria-label="Filter by minimum rating"
        >
          <option value={0}>All</option>
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>{r} ⭐ & up</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="priceRange" className="text-gray-300">Max Price:</label>
        <input
          id="priceRange"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
          className="w-40"
          aria-label="Filter by max price"
        />
        <span className="ml-2 text-white">${selectedPrice}</span>
      </div>

      <button
        type="button"
        className="text-sm text-blue-400 underline"
        onClick={() => {
          setSelectedCategory('');
          setSelectedRating(0);
          setSelectedPrice(maxPrice);
        }}
      >
        Clear Filters
      </button>

      <p aria-live="polite" className="sr-only">
        {filteredProducts.length} products found.
      </p>
    </section>
  );

  // const renderProducts = () => {
  //   {filteredProducts.slice(0, 3).map(product => (
  //     <ProductCard key={product.id} product={product} />
  //   ))}
  //   <ScrollAnimation />
  //   {filteredProducts.slice(3).map(product => (
  //     <ProductCard key={product.id} product={product} />
  //   ))}
  // }

  return (
    <div className="p-6">
      <header>
      <motion.header style={{ scale, opacity }}>
        <h1 className="text-5xl font-genz mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 drop-shadow-lg">
          💿 New Drops Just Landed
        </h1>
        </motion.header>
      </header>

      {renderFilters()}

      <main role="main" aria-label="Product grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {loading ? (
    Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
  ) : (
    <>
      {/* First Section (First 3 Products) */}
      {filteredProducts.slice(0, 3).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Scroll-triggered animation */}
      <div className="col-span-full">
        <ScrollAnimation />
      </div>

      {/* Second Section (Next 3 Products) */}
      {filteredProducts.slice(3, 6).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Another scroll-triggered animation */}
      <div className="col-span-full">
        <ScrollAnimation />
      </div>

      {/* Final Section (Last 3 Products) */}
      {filteredProducts.slice(6).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )}
</div>

      <section className="h-screen flex items-center justify-center">
        <p className="text-white text-xl">Keep scrolling for more content...</p>
      </section>
      </main>
    </div>
  );
};

const WrappedHome = AppWrapperHOC(Home);
export default WrappedHome;
