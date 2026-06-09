import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useCart } from "../components/CartProvider";

export default function AppHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount, showPopup, setShowPopup, lastAdded, whishlist } = useCart();

  return (
    <header className="sticky-top bg-white border-bottom border-5 border-dark">
      <nav className="navbar navbar-expand-md py-2">
        <div className="container">

          <Link className="navbar-brand p-0 m-0 d-flex align-items-center" to="/">
            <img
              src="/img/boolcomics-logo.png"
              alt="BoolComics"
              className="d-none d-md-block"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
            <img
              src="/img/boolcomics-icon.png"
              alt="BoolComics"
              className="d-block d-md-none"
              style={{ height: "45px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Toggle Hamburger Minimal-Dark */}
          <button 
            className="navbar-toggler border-2 border-dark bg-white shadow-none p-2" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            style={{ borderRadius: "4px" }}
          >
            <span className="navbar-toggler-icon" style={{ filter: "brightness(0)" }}></span>
          </button>

          <div className="collapse navbar-collapse mt-3 mt-md-0" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-md-center gap-1 gap-md-3">

              {/* LINK HOME */}
              <li className="nav-item">
                <Link className="nav-link custom-cyber-link" to="/">
                  Home
                </Link>
              </li>

              {/* LINK CATALOGO */}
              <li className="nav-item">
                <Link className="nav-link custom-cyber-link" to="/catalog">
                  Catalogo
                </Link>
              </li>

              {/* BOTTONE CERCA */}
              <li className="nav-item">
                <button 
                  className={`btn cyber-icon-btn ${showSearch ? 'text-danger' : 'text-dark'}`}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <i className="bi bi-search fs-5"></i>
                </button>
              </li>

              {/* WISHLIST */}
              <li className="nav-item">
                <Link className="nav-link custom-cyber-link d-flex align-items-center justify-content-center gap-1" to="/wishlist">
                  <i className="bi bi-heart-fill text-danger"></i>
                  <span>Wishlist</span>
                  {whishlist && whishlist.length > 0 && (
                    <span className="badge bg-danger text-white ms-1 fw-bold small-badge">
                      {whishlist.length}
                    </span>
                  )}
                </Link>
              </li>

              {/* CARRELLO */}
              <li className="nav-item position-relative ms-md-2">
                <Link 
                  className="nav-link cyber-cart-btn text-white d-flex align-items-center justify-content-center gap-2" 
                  to="#"
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#miniCart"
                >
                  <i className="bi bi-bag-fill text-warning"></i>
                  <span>Carrello</span>
                  {cartCount > 0 && (
                    <span className="badge bg-warning text-dark fw-black ms-1 small-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* POPUP CARRELLO */}
                {showPopup && (
                  <div className="position-absolute end-0 mt-2 shadow" style={{ zIndex: 1060, width: "240px", top: "100%" }}>
                    <div className="card bg-white rounded-0" style={{ border: "3px solid #000", boxShadow: "4px 4px 0px #FFC107" }}>
                      <div className="card-body p-2 d-flex align-items-center">
                        <i className="bi bi-patch-check-fill text-danger fs-5 me-2"></i>
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="mb-0 small fw-black text-dark text-uppercase" style={{ fontFamily: '"Arial Black", sans-serif', fontSize: "0.75rem" }}>
                            AGGIUNTO! 🔥
                          </p>
                          <p className="mb-0 text-muted extra-small text-truncate">
                            {lastAdded}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn-close ms-2 shadow-none"
                          style={{ fontSize: "0.6rem" }}
                          onClick={() => setShowPopup(false)}
                        ></button>
                      </div>
                    </div>
                  </div>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
      
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch}/>
    </header>
  );
}
