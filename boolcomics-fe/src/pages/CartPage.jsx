import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Dati del carrello e funzioni per gestirlo
  const { cart, removeFromCart, addToCart, discount, couponCode, setDiscount, setCouponCode } = useCart();

  const [couponError, setCouponError] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);

  // Calcolo totale prodotti
  const subtotal = cart?.reduce((acc, item) => {
    return acc + (parseFloat(item.price) * (item.quantity || 1));
  }, 0) || 0;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsLoadingCoupon(true);
    setCouponError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setDiscount(data.discount_percentage);
        setIsApplied(true);
      } else {
        setCouponError(data.message || "Codice non valido.");
        setDiscount(0);
        setIsApplied(false);
      }
    } catch (err) {
      setCouponError("Errore di connessione al server.");
    } finally {
      setIsLoadingCoupon(false);
    }
  };

  useEffect(() => {
    setDiscount(0);
    setIsApplied(false);
    setCouponCode("");
    setCouponError("");
  }, []);

  // Calcolo Sconto e Spedizione
  const discountAmount = (subtotal * discount) / 100;
  const totalAfterDiscount = subtotal - discountAmount;

  const SHIPPING_THRESHOLD = 50;
  const SHIPPING_COST = 3.99;
  const shippingCost = totalAfterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const amountLeft = SHIPPING_THRESHOLD - totalAfterDiscount;
  const finalTotal = totalAfterDiscount + shippingCost;

  // Logica controllo stock
  const handleProceedToCheckout = async () => {
    setErrorMessage("");
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Impossibile verificare lo stock.");
      const dbProducts = await response.json();

      for (const item of cart) {
        const dbProduct = dbProducts.find(p => p.slug === item.slug);
        if (!dbProduct || dbProduct.stock_quantity <= 0) {
          setErrorMessage(`Il fumetto "${item.name}" è esaurito.`);
          return;
        }
        if (item.quantity > dbProduct.stock_quantity) {
          setErrorMessage(`Quantità non disponibile per "${item.name}". Stock: ${dbProduct.stock_quantity}`);
          return;
        }
      }
      navigate('/checkout');
    } catch (err) {
      setErrorMessage("Errore di connessione durante la verifica.");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold m-0">Il tuo Carrello</h1>
        <span className="badge bg-secondary fs-6">{cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0} Articoli</span>
      </div>

      {!cart || cart.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light shadow-sm">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <p className="fs-4 mt-3 text-dark">Il tuo carrello è vuoto!</p>
          <Link to="/catalog" className="btn btn-lg mt-2 fw-bold" style={{ background: '#E63946', color: 'white' }}>
            VAI AL CATALOGO
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* LISTA PRODOTTI */}
          <div className="col-lg-8">
            {errorMessage && (
              <div className="alert alert-danger fw-bold border-0 shadow-sm mb-3">
                ⚠️ {errorMessage}
              </div>
            )}

            {cart.map((item, index) => (
              <div key={index} className="card mb-3 border-0 shadow-sm overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
                      className="img-fluid rounded"
                      alt={item.name}
                      style={{ objectFit: 'cover', height: '100px', width: '70px' }}
                    />
                  </div>

                  <div className="col-6 col-md-6 ps-3">
                    <h5 className="mb-1 fw-bold">{item.name}</h5>
                    <div className="d-flex align-items-center mt-2">
                      <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => removeFromCart(item.slug)}>-</button>
                      <span className="mx-3 fw-bold">{item.quantity || 1}</span>
                      <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => addToCart(item, 1)}>+</button>
                      <span className="text-muted small ms-3">(€{item.price} cad.)</span>
                    </div>
                  </div>
                  <div className="col-3 col-md-4 text-end pe-4">
                    <span className="h5 fw-bold text-danger d-block mb-0">
                      €{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIEPILOGO */}
          <div className="col-lg-4">
            <div className="card p-4 border-0 shadow-sm bg-dark text-white">
              <h3 className="fw-bold mb-4">Riepilogo</h3>

              {/* SEZIONE COUPON */}
              <div className="mb-4">
                <label className="small mb-1 text-muted">Codice Coupon</label>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control bg-light ${couponError ? 'is-invalid' : ''}`}
                    placeholder="Inserisci codice"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isApplied}
                  />
                  <button
                    className={`btn ${isApplied ? 'btn-success' : 'btn-outline-light'}`}
                    onClick={handleApplyCoupon}
                    disabled={isLoadingCoupon || isApplied || !couponCode}
                  >
                    {isLoadingCoupon ? "..." : isApplied ? "✓" : "Applica"}
                  </button>
                </div>
                {couponError && <small className="text-danger mt-1 d-block">{couponError}</small>}

                {isApplied && (
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <small className="text-success">Sconto {discount}% applicato!</small>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setDiscount(0);
                        setCouponCode('');
                        setIsApplied(false);
                      }}
                    >
                      Rimuovi
                    </button>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotale:</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              {isApplied && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Sconto ({discount}%):</span>
                  <span>- €{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span>Spedizione:</span>
                <span className={shippingCost === 0 ? 'text-success fw-bold' : ''}>
                  {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {shippingCost > 0 && (
                <p className="text-warning small mb-4">Ti mancano €{amountLeft.toFixed(2)} per la spedizione gratuita!</p>
              )}

              <hr className="bg-secondary" />

              <div className="d-flex justify-content-between mb-4">
                <span className="h4 m-0 fw-bold">TOTALE:</span>
                <span className="h4 m-0 text-warning fw-bold">€{finalTotal.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-lg w-100 fw-bold mb-3 shadow text-uppercase"
                onClick={handleProceedToCheckout}
                style={{ background: '#E63946', color: 'white' }}
              >
                Procedi al pagamento
              </button>

              <Link to="/catalog" className="btn btn-outline-light btn-sm w-100 border-0 text-decoration-none">
                ← Continua lo shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}