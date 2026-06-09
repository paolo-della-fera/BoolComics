import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

export default function RelatedProducts({ products }) {
  // Estraiamo lo stato showPopup e setShowPopup se presenti, o usiamo la logica standard del Context
  const { handleAddToCart, whishlist, handleWhishlist } = useCart();

  if (!products || products.length === 0) {
    return null;
  }

  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0;
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!");
      return;
    }
    
    // 1. Esegue l'aggiunta al carrello globale
    handleAddToCart(comic, 1);
  };

  return (
    <div className="my-5">
      
      {/* INTESTAZIONE IN STILE CYBER-COMIC FUSA CON LA LINEA */}
      <div className="d-flex align-items-center justify-content-center mb-5 position-relative">
        <div className="flex-grow-1 bg-dark d-none d-sm-block" style={{ height: '4px', opacity: 0.8 }}></div>
        
        <div className="mx-3" style={{ transform: 'rotate(-1.5deg)' }}>
          <h3 
            className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-4 fw-bold"
            style={{
              fontFamily: '"Impact", "Arial Black", sans-serif',
              border: '3px solid #111111', 
              boxShadow: '5px 5px 0px #E63946',
              letterSpacing: '2px'
            }}
          >
            💥 Potrebbe interessarti anche 💥
          </h3>
        </div>

        <div className="flex-grow-1 bg-dark d-none d-sm-block" style={{ height: '4px', opacity: 0.8 }}></div>
      </div>

      <div className="row g-4">
        { products.map(comic => {
          const isOutOfStock = comic.stock_quantity <= 0;
          const isInWhishlist = whishlist?.some(item => item.slug === comic.slug);
          return (
            <div className="col-12 col-sm-6 col-lg-3" key={ comic.id }>
              <div className="card h-100 shadow-sm product-card">

                <Link to={ `/products/${comic.slug}` } onClick={() => window.scrollTo(0, 0)}>
                  <img
                    src={ `${import.meta.env.VITE_API_URL}${comic.image_url}` }
                    alt={ comic.name }
                    className="card-img-top object-fit-cover product-image"
                    style={ { maxHeight: '450px', objectFit: 'cover' } }
                  />
                </Link>

                <div className="card-body d-flex flex-column text-center">
                  <Link to={ `/products/${comic.slug}` } className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                    <h6 className="fw-bold text-dark text-truncate mb-2">{ comic.name }</h6>
                  </Link>

                  <p className="fw-bold text-danger mt-auto mb-3">€ { comic.price }</p>

                  <button
                    className="btn fw-bold w-100 btn-sm"
                    onClick={ () => handlePurchaseClick(comic) }
                    disabled={ isOutOfStock }
                    style={ {
                      background: isOutOfStock ? '#6c757d' : '#E63946',
                      color: 'white',
                      cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                    } }
                  >
                    { isOutOfStock ? 'ESAURITO' : 'ACQUISTA' }
                  </button>

                  <button
                    className="btn fw-bold w-100 btn-sm mt-2"
                    onClick={ () => handleWhishlist(comic) }
                    style={ {
                      background: '#1e1e1e',
                      color: 'white',
                      cursor: 'pointer',
                    } }
                  >
                    { isInWhishlist
                      ? 'Rimuovi dalla Wishlist'
                      : 'Aggiungi alla Wishlist' }
                  </button>
                </div>

              </div>
            </div>
          );
        }) }
      </div>
    </div>
  );
}
