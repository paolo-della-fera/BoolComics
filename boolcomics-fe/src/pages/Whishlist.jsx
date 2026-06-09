import { Link } from "react-router-dom";
import { useCart } from "../components/CartProvider";

export default function Whishlist() {
    // Recuperiamo i dati e le funzioni direttamente dal Context globale
    const { whishlist, handleWhishlist, handleAddToCart } = useCart();

    const handlePurchaseClick = (comic) => {
        const isOutOfStock = comic.stock_quantity <= 0
        if (isOutOfStock) {
            alert("Spiacenti, il prodotto è esaurito!")
            return
        }
        handleAddToCart(comic, 1);
    };


    // --- AGGIUNTO BLOCCO DI PROTEZIONE ANTI-CRASH ---
    // Se la wishlist non esiste ancora o è vuota, mostra una bella interfaccia di cortesia
    if (!whishlist || whishlist.length === 0) {
        return (
            <div className="container text-center py-5 my-5">
                <i className="bi bi-heart text-muted fs-1"></i>
                <h2 className="mt-3 fw-bold">La tua Wishlist è vuota</h2>
                <p className="text-muted">Esplora il catalogo per aggiungere i tuoi fumetti preferiti.</p>
                <Link to="/catalog" className="btn fw-bold mt-3 text-uppercase" style={{ background: '#E63946', color: 'white' }}>
                    Vai al Catalogo
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="container mb-5 mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold m-0">La tua Whishlist</h1>
                    {/* Sostituito il reduce con un più semplice .length visto che è una lista di preferiti */}
                    <span className="badge bg-secondary fs-6">{whishlist.length} Articoli</span>
                </div>

                <div className="row g-4">
                    {whishlist.map(comic => {
                        const isOutOfStock = comic.stock_quantity <= 0;
                        const isInWhishlist = whishlist.some(item => item.slug === comic.slug);

                        return (
                            <div key={comic.id} className="col-12 col-sm-6 col-lg-3">
                                <div className="card shadow-sm product-card bg-light h-100">

                                    {/* IMAGE (Sostituita con l'url dinamico dell'API come nelle altre pagine) */}
                                    <Link to={`/products/${comic.slug}`} className="product-image-wrapper">
                                        <img
                                            src={comic.image_url ? `${import.meta.env.VITE_API_URL}${comic.image_url}` : "/img/placeholdercomic.png"}
                                            alt={comic.name}
                                            className="card-img-top product-image"
                                        />
                                    </Link>

                                    {/* BODY */}
                                    <div className="card-body d-flex flex-column text-center">

                                        {/* TITLE */}
                                        <h5 className="product-title fw-bold">
                                            {comic.name}
                                        </h5>

                                        {/* PRICE */}
                                        <p className="product-price mt-auto fw-bold text-danger">
                                            € {comic.price}
                                        </p>

                                        {/* BUTTON ACQUISTA */}
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

                                        {/* BUTTON RIMUOVI */}
                                        <button
                                            className="btn fw-bold w-100"
                                            onClick={() => handleWhishlist(comic)}
                                            style={{
                                                background: '#1e1e1e',
                                                color: 'white',
                                                cursor: 'pointer'
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
        </>
    );
}