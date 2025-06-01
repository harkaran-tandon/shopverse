import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../src/context/CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItem = {
  id: '1',
  name: 'Sample Product',
  price: 29.99,
  image: '/sample.jpg',
  quantity: 1,
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe('1');
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('updates quantity if item already exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockItem);
      result.current.addToCart({ ...mockItem, quantity: 2 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(3); // 1 + 2
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockItem);
      result.current.removeFromCart(mockItem.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('updates item quantity directly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockItem);
      result.current.updateQuantity(mockItem.id, 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('persists cart in localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockItem);
    });

    const stored = localStorage.getItem('cart');
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe('1');
  });
});
