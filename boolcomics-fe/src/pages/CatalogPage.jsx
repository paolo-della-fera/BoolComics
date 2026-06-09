import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../components/CartProvider"

export default function CatalogPage() {
  // Estratto tutto il necessario dal Context globale
  const { handleAddToCart, whishlist, handleWhishlist } = useCart();

  const [comics, setComics] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get("search") || ""
  const sortBy = searchParams.get("sort") || ""

  // FETCH PRODUCTS CON NUOVA LOGICA
  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"

    fetch(`${api_url}/products`)
      .then(res => res.json())
      .then(data => {
        setComics(data);
      })
      .catch(err => console.error("Errore nel caricamento dei prodotti:", err));
  }, []);

  // FILTRAGGIO E ORDINAMENTO REAL-TIME
  const filteredComics = [...comics]
    .filter(comic => comic.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === "low-price") {
        return a.price - b.price
      }
      if (sortBy === "high-price") {
        return b.price - a.price
      }
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })

  const handlePurchaseClick = (comic) => {
    const isOutOfStock = comic.stock_quantity <= 0
    if (isOutOfStock) {
      alert("Spiacenti, il prodotto è esaurito!")
      return
    }
    handleAddToCart(comic, 1);
  };

  function copyUrl() {
    const url = window.location.href
    const whatsappText = `Guarda questo catalogo di fumetti: ${url}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    //copy to clipboard
    navigator.clipboard.writeText(url).catch((err) => console.error('Copy failed:', err))

    if (isMobile) {
      window.open(whatsappUrl, '_blank')
      return
    }

    if (navigator.share) {
      navigator.share({
        title: 'Boolcomics',
        text: 'Guarda questo catalogo di fumetti',
        url,
      }).catch((err) => console.error('Sharing failed:', err))
      return
    }
  }

  return (
    <>
      {/* PRODUCTS */}
      <section className="py-5">
        <div className="container">

          {/* TOP BAR COMPATTA A RIGA UNICA (Senza linea centrale) */}
          <div className="row align-items-center mb-5 g-3">

            {/* COLONNA SINISTRA: TITOLO POP O RISULTATI DI RICERCA */}
            <div className="col-12 col-md pb-2 pb-md-0">
              {!searchQuery ? (
                /* Il titolo pop-art a fianco dei filtri, inclinato e con ombra solida */
                <div className="d-inline-block" style={{ transform: 'rotate(-1.5deg)' }}>
                  <h2
                    className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-3 fw-bold"
                    style={{
                      fontFamily: '"Impact", "Arial Black", sans-serif',
                      border: '3px solid #111111',
                      boxShadow: '4px 4px 0px #E63946', // Ombra solida rossa coordinata
                      letterSpacing: '1px'
                    }}
                  >
                     Catalogo Prodotti
                  </h2>
                </div>
              ) : (
                /* Se c'è una ricerca, mostra il testo dei risultati trovati */
                filteredComics.length > 0 && (
                  <p className="results-text mb-0 fs-5">
                    {filteredComics.length} prodotti trovati per <strong>{searchQuery}</strong>
                  </p>
                )
              )}
            </div>

            {/* COLONNA DESTRA: SELECT DI ORDINAMENTO */}
            {filteredComics.length !== 0 && (
              <div className="col-10 col-md-3 text-md-end">
                <select
                  className="form-select catalog-select"
                  value={sortBy}
                  onChange={(e) => {
                    const newParams = new URLSearchParams(searchParams)
                    if (e.target.value) {
                      newParams.set("sort", e.target.value)
                    } else {
                      newParams.delete("sort")
                    }
                    setSearchParams(newParams)
                  }}
                >
                  <option value="">Ordina per</option>
                  <option value="name">Nome</option>
                  <option value="low-price">Prezzo: dal più basso</option>
                  <option value="high-price">Prezzo: dal più alto</option>
                  <option value="recent">Più recenti</option>
                </select>
              </div>
            )}

            {/* COLONNA DESTRA: SELECT DI ORDINAMENTO */}
            {filteredComics.length !== 0 && (
              <div className="col-2 text-md-end">
                <button type="button" onClick={copyUrl} className="form-control share-btn">
                  <i class="bi bi-share-fill"></i>
                </button>
              </div>
            )}

          </div>

          {/* EMPTY STATE (Se la ricerca non produce risultati) ... qui sotto continua il tuo codice */}


          {/* EMPTY STATE (Se la ricerca non produce risultati) */}
          {searchQuery && filteredComics.length === 0 && (
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-md-auto text-center">
                <div className="search-empty-state">
                  <div className="empty-badge"> OPS! </div>
                  <h2 className="empty-title">Nessun risultato trovato</h2>
                  <p className="empty-message">
                    La ricerca per <strong>{searchQuery}</strong> non ha portato alla luce nessun volume.
                    <br />
                    Prova a digitare una nuova parola chiave.
                  </p>
                  <Link to="/catalog" className="btn btn-outline-danger">
                    Mostra tutto il catalogo
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div className="row g-4">
            {filteredComics.map(comic => {
              const isOutOfStock = comic.stock_quantity <= 0
              const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false

              return (
                <div key={comic.id} className="col-12 col-sm-6 col-lg-3">
                  <div className="card h-100 shadow-sm product-card bg-light">

                    {/* IMAGE */}
                    <Link to={`/products/${comic.slug}`} className="product-image-wrapper">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${comic.image_url}`}
                        alt={comic.name}
                        className="card-img-top product-image"
                      />
                    </Link>

                    {/* BODY */}
                    <div className="card-body d-flex flex-column text-center">

                      {/* TITLE */}
                      <h5 className="product-title">
                        {comic.name}
                      </h5>

                      {/* PRICE */}
                      <p className="product-price mt-auto">
                        € {comic.price}
                      </p>

                      {/* BUY BUTTON */}
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
                        {isOutOfStock ? "ESAURITO" : "ACQUISTA"}
                      </button>

                      {/* WISHLIST BUTTON */}
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
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
