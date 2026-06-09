import { useState } from "react";

export function useCartLogic() {
  const [cart, setCart] = useState([]);

  // Per la gestione degli sconti e dei coupon
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  
  // Wishlist state
  const [whishlist, setWhishlist] = useState([]); 

  // Gestione Wishlist Toggle
  const handleWhishlist = (comic) => {
    setWhishlist((prev) => {
      const exists = prev.some((item) => item.slug === comic.slug);
      return exists ? prev.filter((item) => item.slug !== comic.slug) : [...prev, comic];
    });
  };

  // 1. Funzione per aggiungere o sommare
  const addToCart = (product, amount = 1) => {
    setCart((prev) => {
      const exists = prev.find(i => i.slug === product.slug);

      if (exists) {
        return prev.map(i =>
          i.slug === product.slug
            ? { ...i, quantity: i.quantity + amount }
            : i
        );
      }

      return [...prev, { ...product, quantity: amount }];
    });
  };


  // 2. Funzione per rimuovere
  const removeFromCart = (slug) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.slug === slug);

      if (itemInCart && itemInCart.quantity > 1) {
        return prevCart.map((item) =>
          item.slug === slug
            ? { ...item, quantity: Number(item.quantity) - 1 }
            : item
        );
      }

      return prevCart.filter((item) => item.slug !== slug);
    });
  };

  // 3. Funzione per svuotare il carrello
  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    cartCount,
    clearCart,
    discount,
    couponCode,
    setDiscount,
    setCouponCode, 
    whishlist,       
    handleWhishlist
  };
}