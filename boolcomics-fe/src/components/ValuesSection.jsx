export default function ValuesSection() {

  const values = [
    {
      icon: "bi-truck",
      title: "Spedizione Rapida",
      description: "Consegne veloci e spedizione gratuita sopra i 50€."
    },
    {
      icon: "bi-book-half",
      title: "Catalogo Selezionato",
      description: "Manga, graphic novel e comics scelti con cura per ogni fan."
    },
    {
      icon: "bi-patch-check",
      title: "Qualità Garantita",
      description: "Solo edizioni originali e prodotti controllati con attenzione."
    },
    {
      icon: "bi-stars",
      title: "Passione Vera",
      description: "Creato da appassionati per chi vive il mondo del fumetto ogni giorno."
    }
  ];

  return (
    // Avvolgiamo la sezione in uno sfondo dedicato per dare contenimento visivo (stile zillerstore)
    <section className="bg-light pt-5 pb-5 mt-5 mb-0 border-top border-bottom">
      <div className="container">

        {/* TITLE BLOCK */}
        <div className="text-center mb-4"> {/* Ridotto da mb-5 a mb-4 per avvicinare i contenuti */}

          {/* Fusione dello stile Shonen con linea per dare personalità e continuità */}
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="flex-grow-1 bg-dark d-none d-sm-block" style={{ height: '2px', opacity: 0.2 }}></div>
            <div className="mx-3" style={{ transform: 'rotate(-1deg)' }}>
              <h2
                className="bg-dark text-white px-4 py-2 m-0 text-uppercase fs-2 fw-bold"
                style={{
                  fontFamily: '"Impact", "Arial Black", sans-serif',
                  border: '3px solid #111',
                  boxShadow: '4px 4px 0px #E63946', // Richiama il rosso delle icone
                  letterSpacing: '2px'
                }}
              >
                I Nostri Valori
              </h2>
            </div>
            <div className="flex-grow-1 bg-dark d-none d-sm-block" style={{ height: '2px', opacity: 0.2 }}></div>
          </div>

          <p
            className="text-secondary mb-2" // Ridotto il margine inferiore a mb-2
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1.05rem",
              lineHeight: "1.5"
            }}
          >
            La nostra fumetteria nasce dalla passione per manga, comics e cultura pop.
            Offriamo prodotti selezionati, spedizioni rapide e un’esperienza pensata per veri appassionati.
          </p>

        </div>

        {/* VALUES GRID */}
        <div className="row g-4 mt-1"> {/* Aggiunto mt-1 per controllare millimetricamente l'inizio della griglia */}
          {values.map((value, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-3"
            >
              <div
                className="h-100 text-center p-4 rounded-4 shadow-sm"
                style={{
                  background: "#111",
                  color: "white",
                  transition: "transform 0.3s ease",
                  border: "2px solid #222"
                }}
                // Piccolo effetto hover per rendere la card più reattiva
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              >
                {/* ICON */}
                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px", // Leggermente rimpicciolita (da 90 a 80) per proporzione
                    height: "80px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #E63946, #b71c1c)",
                    boxShadow: "0 8px 20px rgba(230,57,70,0.3)"
                  }}
                >
                  <i
                    className={`bi ${value.icon}`}
                    style={{
                      fontSize: "2rem",
                      color: "white"
                    }}
                  ></i>
                </div>

                {/* TITLE */}
                <h4 className="fw-bold mb-2 text-uppercase" style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '1.15rem' }}>
                  {value.title}
                </h4>

                {/* DESCRIPTION */}
                <p className="mb-0 text-light text-opacity-75 small">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
