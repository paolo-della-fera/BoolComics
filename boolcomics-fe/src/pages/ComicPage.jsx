import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductMainCard from '../components/ProductMainCard';
import ProductDescriptionCard from '../components/ProductDescriptionCard';
import RelatedProducts from '../components/RelatedProducts';

// Importa l'hook del carrello
import { useCart } from "../components/CartProvider"; 

const API_URL = import.meta.env.VITE_API_URL;

export default function ComicPage() { 
    const { slug } = useParams();
    
    const { handleAddToCart } = useCart(); 
    
    const [comic, setComic] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Reset dello stato quando cambia lo slug (navigazione tra correlati)
    if (comic && comic.slug !== slug && !loading) {
        setLoading(true);
        setComic(null);
        setRelated([]);
        setError(null);
    }

    // Recupera il prodotto principale
    useEffect(() => {
        fetch(`${API_URL}/products/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Prodotto non trovato');
                return res.json();
            })
            .then(data => setComic(data))
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    // Recupera i prodotti correlati
    useEffect(() => {
        if (!comic) return;

        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(allProducts => {
                const currentCategoriesSlugs = comic.categories?.map(c => c.slug) || [];
                const filtered = allProducts.filter(item => {
                    if (item.slug === comic.slug) return false;
                    return item.categories?.some(cat => currentCategoriesSlugs.includes(cat.slug));
                });
                setRelated(filtered.slice(0, 4));
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore correlati:", err);
                setLoading(false);
            });
    }, [comic]);

    if (loading) return <p className="container py-5">Caricamento...</p>;
    if (error) return <p className="container py-5 text-danger">Errore: {error}</p>;

    return (
        <>
            <div className='container py-4'>
                {/* Passiamo la funzione handleAddToCart del Context che gestisce i controlli e la grafica */}
                <ProductMainCard comic={comic} addToCart={handleAddToCart} />
                <ProductDescriptionCard comic={comic} />
                
                <RelatedProducts products={related} />
            </div>
        </>
    );
}
