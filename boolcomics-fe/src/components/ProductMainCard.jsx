import { useState } from 'react';
import { useCart } from "../components/CartProvider"; // CORETTO: IMPORTA IL CONTEXT

export default function ProductMainCard({ comic }) {
    const { handleAddToCart, whishlist, handleWhishlist } = useCart();
    const [quantity, setQuantity] = useState(1);
    
    
    

    if (!comic) {
        return null;
    }

    const isDiscounted = comic.price < comic.original_price;
    const isOutOfStock = comic.stock_quantity <= 0;
    const isInWhishlist = whishlist ? whishlist.some(item => item.slug === comic.slug) : false;
    
    
    const handleQuantityChange = (e) => {
        const val = parseInt(e.target.value, 10) || 1;
        if (val > comic.stock_quantity) {
            setQuantity(Number(comic.stock_quantity));
        } else if (val < 1) {
            setQuantity(1);
        } else {
            setQuantity(Number(val));
        }
    };

    const handleAddToCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        if (isOutOfStock) return;
        
        const finalQuantity = Number(quantity);
        
        

        handleAddToCart(comic, finalQuantity);
    };

    return (
        <>
            <div>
                <div className="card shadow-sm my-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${comic.image_url}`}
                                    alt={comic.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                                    onError={(e) => e.target.src = '/img/placeholdercomic.png'}
                                />
                            </div>

                            <div className="col-md-8">
                                <h2 className="card-title">{comic.name}</h2>
                                <hr />
                                <div className="d-flex align-items-baseline mb-3">
                                    {isDiscounted && (
                                        <p className="text-muted text-decoration-line-through me-2 mb-0">€{parseFloat(comic.original_price).toFixed(2)}</p>
                                    )}
                                    <h3 className="text-danger mb-0">€{parseFloat(comic.price).toFixed(2)}</h3>
                                </div>
                                <p className="mb-3">
                                    Disponibilità: {comic.stock_quantity > 0 ?
                                        <span className="text-success">In stock ({comic.stock_quantity} pezzi)</span> :
                                        <span className="text-danger">Esaurito</span>}
                                </p>

                                <div className="col-auto">
                                    <div className="input-group" style={{ width: '130px' }}>
                                        <span className="input-group-text">Qtà</span>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            max={comic.stock_quantity}
                                            disabled={isOutOfStock}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                                    <button 
                                        className="btn fw-bold text-white btn-lg" 
                                        onClick={handleAddToCartClick}
                                        disabled={isOutOfStock}
                                        style={{ 
                                            background: isOutOfStock ? '#6c757d' : '#E63946', 
                                            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                            border: 'none'
                                        }}
                                    >
                                        {isOutOfStock ? 'ESAURITO' : 'ACQUISTA'}
                                    </button>

                                    <button className="btn btn-outline-danger btn-lg d-flex align-items-center justify-content-center gap-2" onClick={() => handleWhishlist(comic)}>
                                        <i className={`bi ${isInWhishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                        Preferiti
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
