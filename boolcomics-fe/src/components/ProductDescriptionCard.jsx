export default function ProductDescriptionCard({ comic }) {

    return (

        <>

            <div className="card shadow-sm my-4">

                <div className="card-body">

                    <h4 className="card-title border-bottom pb-2 mb-3">Informazioni Prodotto</h4>
                    <p className="card-text mb-4">{comic.description}</p>

                    <div className="row g-3">
                        
                        <div className="col-12 col-md-6">
                            <p className="mb-1"><strong>Autore:</strong> {comic.author}</p>
                            <p className="mb-1"><strong>Genere:</strong> {comic.genre}</p>
                            <p className="mb-1"><strong>Editore:</strong> {comic.publisher}</p>
                        </div>

                        <div className="col-12 col-md-6">
                            <p className="mb-1"><strong>Data di uscita:</strong> {comic.release_date}</p>
                            <p className="mb-1"><strong>Rilegatura:</strong> {comic.binding}</p>
                            <p className="mb-1"><strong>EAN:</strong> {comic.ean}</p>
                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}