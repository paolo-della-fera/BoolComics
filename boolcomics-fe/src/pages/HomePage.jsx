import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartProvider";
import ValuesSection from "../components/ValuesSection";

const PROMO_BANNERS = [
  {
    id: "promo-1",
    image: "/img/banner1.png",
    title: "Spedizione Gratuita",
  },
  {
    id: "promo-2",
    image: "/img/banner2.png",
    title: "Esplora il nostro catalogo",
    link: "/catalog"
  },
  {
    id: "promo-3",
    image: "/img/banner3.png",
    title: "Solo per veri appassionati",
  }
];

export default function Homepage() {
  const { handleAddToCart, whishlist, handleWhishlist } = useCart();
  const API_URL = import.meta.env.VITE_API_URL;

  const [lastestProducts, setLatestProducts] = useState([]);
  const [mostPurchased, setMostPurchased] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products/last-arrived`)
      .then(res => res.json())
      .then(data => setLatestProducts(data.slice(0, 4)))
      .catch(err => console.error(err));
  }, [API_URL]);

  useEffect(() => {
    fetch(`${API_URL}/products/most-purchased`)
      .then(res => res.json())
      .then(data => setMostPurchased(data.slice(0, 4)))
      .catch(err => console.error(err));
  }, [API_URL]);

  const handlePurchaseClick = (comic) => {
    // Invochiamo handleAddToCart: sarà il CartProvider a gestire in modo atomico
    // lo stock residuo confrontando la quantità richiesta con quella già a carrello.
    handleAddToCart(comic, 1);
  };

  return (
    <>
      {/* SEZIONE CAROSELLO */}
      <div className="container mb-5 mt-5">
        <div id="carouselExampleCaptions" className="carousel slide shadow" data-bs-ride="carousel">

          {/* Indicatori in basso */}
          <div className="carousel-indicators">
            {PROMO_BANNERS.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* Sliders */}
          <div className="carousel-inner rounded">
            {PROMO_BANNERS.map((banner, index) => (
              <div key={banner.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>

                {banner.link ? (
                  <Link to={banner.link}>
                    <img
                      src={banner.image}
                      className="d-block w-100"
                      alt={banner.title}
                      style={{
                        height: 'auto',
                        maxHeight: '450px',
                        objectFit: 'contain',
                        backgroundColor: '#1a1a1a',
                        cursor: 'pointer'
                      }}
                    />
                  </Link>
                ) : (
                  <img
                    src={banner.image}
                    className="d-block w-100-"
                    alt={banner.title}
                    style={{
                      height: 'auto',
                      maxHeight: '450px',
                      objectFit: 'contain',
                      backgroundColor: '#1a1a1a',
                      cursor: 'default'
                    }}
                  />
                )}

              </div>
            ))}
          </div>

          {/* Freccia Sinistra */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
            style={{ width: '10%' }}
          >
            <span
              className="d-flex align-items-center justify-content-center text-white"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                border: '2px solid #fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              ◀
            </span>
            <span className="visually-hidden">Precedente</span>
          </button>

          {/* Freccia Destra */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
            style={{ width: '10%' }}
          >
            <span
              className="d-flex align-items-center justify-content-center text-white"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '50%',
                fontSize: '24px',
                fontWeight: 'bold',
                border: '2px solid #fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              ▶
            </span>
            <span className="visually-hidden">Successivo</span>
          </button>

        </div>
      </div>

      {/* SEZIONE ULTIMI ARRIVI */}
      <div className="container">
        <div className="d-flex align-items-center justify-content-center my-5 position-relative">
          <div className="flex-grow-1 bg-dark" style={{ height: '4px', opacity: 0.8 }}></div>
          <div className="mx-3" style={{ transform: 'rotate(-2deg)' }}>
            <h2
              className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-3 fw-bold"
              style={{
                fontFamily: '"Impact", "Arial Black", sans-serif',
                border: '3px solid #E63946',
                letterSpacing: '2px'
              }}
            >
               ULTIMI ARRIVI
            </h2>
          </div>
          <div className="flex-grow-1 bg-dark" style={{ height: '4px', opacity: 0.8 }}></div>
        </div>

        <div className="row">
          {lastestProducts.map(comic => {
            const isOutOfStock = comic.stock_quantity <= 0;
            const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false;

            return (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={comic.id}>
                <div className="card product-card h-100 shadow-sm bg-light">
                  <Link to={`/products/${comic.slug}`}>
                    <img src={`${import.meta.env.VITE_API_URL}${comic.image_url}`} className="card-img-top object-fit-cover product-image" alt={comic.name} />
                  </Link>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="fw-bold">{comic.name}</h5>
                    <span className="mb-2"><strong>Uscita:</strong> {comic.release_date ? comic.release_date.split('T')[0] : 'N/A'}</span>
                    <p className="fw-bold mt-auto">€{comic.price}</p>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handlePurchaseClick(comic)}
                      disabled={isOutOfStock}
                      style={{
                        background: isOutOfStock ? '#6c757d' : '#E63946',
                        color: 'white',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        marginBottom: '1rem'
                      }}
                    >
                      {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                    </button>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handleWhishlist(comic)}
                      style={{
                        background: '#1e1e1e',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEZIONE I PIÙ VENDUTI */}
      <div className="container">
        <div className="d-flex align-items-center justify-content-center my-5 position-relative">
          <div className="flex-grow-1 bg-dark" style={{ height: '4px', opacity: 0.8 }}></div>
          <div className="mx-3" style={{ transform: 'rotate(1.5deg)' }}>
            <h2
              className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-3 fw-bold"
              style={{
                fontFamily: '"Impact", "Arial Black", sans-serif',
                border: '3px solid #FFC107',
                letterSpacing: '2px'
              }}
            >
               I PIÙ VENDUTI 
            </h2>
          </div>
          <div className="flex-grow-1 bg-dark" style={{ height: '4px', opacity: 0.8 }}></div>
        </div>

        <div className="row">
          {mostPurchased.map(comic => {
            const isOutOfStock = comic.stock_quantity <= 0;
            const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false;

            return (
              <div className="col-12 col-sm-6 col-lg-3 mb-4" key={comic.id}>
                <div className="card h-100 shadow-sm product-card bg-light">
                  <Link to={`/products/${comic.slug}`}>
                    <img src={`${import.meta.env.VITE_API_URL}${comic.image_url}`} className="card-img-top object-fit-cover product-image" alt={comic.name} />
                  </Link>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="fw-bold">{comic.name}</h5>
                    <p className="fw-bold mt-auto">€{comic.price}</p>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handlePurchaseClick(comic)}
                      disabled={isOutOfStock}
                      style={{
                        background: isOutOfStock ? '#6c757d' : '#E63946',
                        color: 'white',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                        marginBottom: '1rem'
                      }}
                    >
                      {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                    </button>

                    <button
                      className="btn fw-bold w-100"
                      onClick={() => handleWhishlist(comic)}
                      style={{
                        background: '#1e1e1e',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {isInWhishlist ? 'Rimuovi dalla Whishlist' : 'Aggiungi alla Whishlist'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEZIONE I NOSTRI VALORI */}
      <ValuesSection />
    </>
  );
}
