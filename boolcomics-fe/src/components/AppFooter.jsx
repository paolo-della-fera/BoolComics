import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer
      className="text-white pt-5 pb-3 m-0"
      style={ {
        background: "#111",
        borderTop: "4px solid #E63946"
      } }
    >
      <div className="container">
        <div className="row g-4 text-center text-md-start">


          {/* COLONNA 1: LOGO GRAFICO E DESCRIZIONE */ }
          <div className="col-12 col-md-4 text-center text-md-start">
            <Link to="/" className="d-inline-block">
              <div
                className="d-inline-block bg-white p-2 text-center"
                style={ {
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #E63946",
                  transform: "rotate(-1.5deg)",
                  borderRadius: "4px"
                } }
              >
                <img
                  src="/img/boolcomics-logo.png"
                  alt="BoolComics Logo"
                  style={ {
                    maxHeight: "50px",
                    width: "auto",
                    objectFit: "contain"
                  } }
                />
              </div>



            </Link>
            <p className="text-light text-opacity-75 small mt-3" style={ { maxWidth: "300px", margin: "1rem md:0 auto" } }>
              La tua fumetteria online di fiducia. Manga, comics, variant e gadget scelti con cura da veri appassionati.
            </p>
          </div>


          {/* COLONNA 2: LINK RAPIDI */ }
          <div className="col-12 col-md-4 text-md-center">
            <h5 className="fw-bold text-uppercase mb-3 text-warning" style={ { fontFamily: '"Arial Black", sans-serif', fontSize: '1rem' } }>
              Esplora
            </h5>
            <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-light text-opacity-75 text-decoration-none hover-red">Homepage</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-light text-opacity-75 text-decoration-none hover-red">Catalogo</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-light text-opacity-75 text-decoration-none hover-red">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* COLONNA 3: CONTATTI & SOCIAL */ }
          <div className="col-12 col-md-4 text-md-end">
            <h5 className="fw-bold text-uppercase mb-3 text-warning" style={ { fontFamily: '"Arial Black", sans-serif', fontSize: '1rem' } }>
              Contatti
            </h5>
            <p className="text-light text-opacity-75 small mb-1">
              📍 Via dei Fumetti 42, Milano
            </p>
            <p className="text-light text-opacity-75 small mb-3">
              ✉️ fumetteria.boolcomics@gmail.com
            </p>
            {/* Icone Social con icone testuali universali ad alto contrasto */ }
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <a href="#" className="text-white text-decoration-none fw-bold bg-dark p-2 rounded-circle border border-secondary" style={ { width: '35px', height: '35px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }>F</a>
              <a href="#" className="text-white text-decoration-none fw-bold bg-dark p-2 rounded-circle border border-secondary" style={ { width: '35px', height: '35px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }>I</a>
              <a href="#" className="text-white text-decoration-none fw-bold bg-dark p-2 rounded-circle border border-secondary" style={ { width: '35px', height: '35px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }>X</a>
            </div>
          </div>

        </div>

        {/* LINEA DI CHIUSURA E COPYRIGHT */ }
        <hr className="bg-secondary my-4 opacity-25" />

        <div className="row small text-light text-opacity-50 text-center">
          <div className="col">
            <p className="mb-0">
              &copy; { new Date().getFullYear() } BoolComics. All rights reserved. Developed with 🖤 for Comic Fans.
            </p>
          </div>
        </div>

      </div>

      {/* Piccolo CSS inline per l'effetto hover sui link */ }
      <style>{ `
        .hover-red:hover {
          color: #E63946 !important;
          transition: 0.2s ease;
        }
      `}</style>
    </footer>
  );
}
