import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            {/* HEADER COMPATTO 404 */ }
            <header className="header-404 bg-white py-3 border-bottom border-4 border-dark">
                <div className="container text-start">
                    <Link to="/">
                        <img
                            src="/img/boolcomics-logo.png"
                            alt="BoolComics"
                            style={ { height: "55px", width: "auto", objectFit: "contain" } }
                        />
                    </Link>
                </div>
            </header>

            {/* CONTENUTO ERRORE STILE COMIC */ }
            <main className="error-404 container text-center py-5">

                <div className="error-badge my-4">
                    404
                </div>

                <div className="d-flex align-items-center justify-content-center my-4">
                    <div className="flex-grow-1 bg-dark d-none d-sm-block" style={ { height: '3px', opacity: 0.3 } }></div>
                    <div className="mx-3" style={ { transform: 'rotate(-1.5deg)' } }>
                        <h1
                            className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-2 fw-bold"
                            style={ {
                                fontFamily: '"Impact", "Arial Black", sans-serif',
                                border: '3px solid #111',
                                boxShadow: '4px 4px 0px #E63946',
                                letterSpacing: '1px'
                            } }
                        >
                            💥 BOOM! Pagina Esaurita! 💥
                        </h1>
                    </div>
                    <div className="flex-grow-1 bg-dark d-none d-sm-block" style={ { height: '3px', opacity: 0.3 } }></div>
                </div>

                <p className="error-message text-secondary mx-auto mb-4" style={ { maxWidth: "500px", fontSize: "1.1rem" } }>
                    La pagina che stavi cercando è andata a ruba o non è mai esistita nel nostro catalogo.
                </p>

                {/* Bottone coordinato al resto del sito */ }
                <Link
                    to="/"
                    className="btn cyber-cart-btn text-white px-5 py-3 text-uppercase"
                    style={ { textDecoration: "none", display: "inline-block" } }
                >
                    Torna alla Home ➔
                </Link>
            </main>
        </>
    );
}
