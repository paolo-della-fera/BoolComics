import { useCart } from "./CartProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function MiniCart() {
  const { cart, removeFromCart, addToCart, cartCount } = useCart();
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  return (
   <div className="offcanvas offcanvas-end" tabIndex="-1" id="miniCart" aria-labelledby="miniCartLabel">
      <div className="offcanvas-header bg-dark text-white">
        <h5 className="offcanvas-title fw-bold" id="miniCartLabel">Carrello ({cartCount})</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>

      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p className="text-center py-4 text-dark">Il carrello è vuoto.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {cart.map((item) => (
              <li key={item.slug} className="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <h6 className="mb-0 fw-bold text-dark">{item.name}</h6>
                  <small className="text-muted">{item.quantity} x €{item.price}</small>
                </div>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-secondary" onClick={() => removeFromCart(item.slug)}>-</button>
                  <button className="btn btn-outline-secondary" onClick={() => addToCart(item, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="offcanvas-footer p-3 border-top">
          <div className="d-flex justify-content-between mb-3">
            <span className="h5 text-dark">Totale:</span>
            <span className="h5 fw-bold text-danger">€{total.toFixed(2)}</span>
          </div>
          
          {/* MODIFICATO: Usiamo un button con onClick e il dismiss di bootstrap */}
          <button 
            onClick={handleGoToCart} 
            className="btn btn-danger w-100 fw-bold py-2" 
            data-bs-dismiss="offcanvas"
          >
            VAI AL CARRELLO / CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}