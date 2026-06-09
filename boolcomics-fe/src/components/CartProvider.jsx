import { createContext, useContext, useState } from "react";
import { useCartLogic } from "../components/useCartLogic";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    cartCount,
    clearCart,
    whishlist,
    handleWhishlist
  } = useCartLogic();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  // Questa gestisce l'acquisto da tutto il sito e BLOCCO dello stock atomico in tempo reale
  const handleAddToCartWithPopup = (product, quantity = 1) => {
    // 1. Cerchiamo se il fumetto è già presente nel carrello attuale
    const existingItem = cart.find(item => item.slug === product.slug);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

    // Calcoliamo quanti pezzi avremmo in totale accettando questa richiesta
    const targetQuantity = currentQuantityInCart + quantity;

    // 2. CONTROLLO DI SICUREZZA ATOMICO: Se superiamo lo stock, blocchiamo IMMEDIATAMENTE tutto
    if (targetQuantity > product.stock_quantity) {
      const availableSpace = product.stock_quantity - currentQuantityInCart;

      if (availableSpace > 0) {
        alert(`Puoi aggiungere solo altri ${availableSpace} pezzi di questo articolo (scorte esaurite)!`);

        // Riempiamo il carrello fino al limite massimo consentito
        addToCart(product, availableSpace);

        // Forziamo l'apertura grafica perché abbiamo comunque aggiunto i pezzi rimasti
        const displayLabel = availableSpace > 1 ? `${product.name} x ${availableSpace}` : product.name;
        setLastAdded(displayLabel);
        setShowPopup(true);
        const cartElem = document.getElementById('miniCart');
        if (cartElem && window.bootstrap && window.bootstrap.Offcanvas) {
          const instance = window.bootstrap.Offcanvas.getOrCreateInstance(cartElem);
          instance.show();
        }
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        alert("Hai già aggiunto tutti i pezzi disponibili per questo prodotto nel tuo carrello!");
      }
      return; // Interrompe l'esecuzione: non apre popup errati e non duplica
    }

    // 3. Se lo stock è sufficiente, esegue l'inserimento standard e mostra la grafica
    addToCart(product, quantity);
    const displayLabel = quantity > 1 ? `${product.name} x ${quantity}` : product.name;
    setLastAdded(displayLabel);
    setShowPopup(true);

    const cartElem = document.getElementById('miniCart');
    if (cartElem && window.bootstrap && window.bootstrap.Offcanvas) {
      const instance = window.bootstrap.Offcanvas.getOrCreateInstance(cartElem);
      instance.show();
    }

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const value = {
    cart,
    cartCount,
    addToCart: addToCart,
    handleAddToCart: handleAddToCartWithPopup,
    removeFromCart,
    clearCart,
    showPopup,
    setShowPopup,
    lastAdded,
    whishlist,
    handleWhishlist,
    discount,
    couponCode,
    setDiscount,
    setCouponCode
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
