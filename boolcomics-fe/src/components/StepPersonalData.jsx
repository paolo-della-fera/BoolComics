import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StepPersonalData({ formData, handleChange, handleNext }) {

    // Hook per la navigazione
    const navigate = useNavigate();

    // Stato per gestire errori di validazione
    const [error, setError] = useState('');

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.first_name.trim().length < 3) {
            setError('Il nome deve contenere almeno 3 caratteri.');
            return;
        }

        if (formData.last_name.trim().length < 3) {
            setError('Il cognome deve contenere almeno 3 caratteri.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Inserisci un indirizzo email valido.');
            return;
        }

        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Dati personali</h4>

                    <form onSubmit={handleSubmit}>

                        {/* Mostra messaggio di errore se presente */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Inserisci il tuo nome"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cognome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Inserisci il tuo cognome"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Inserisci la tua email"
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => navigate('/cart')}
                            >
                                ← Carrello
                            </button>
                            <button type="submit" className="btn btn-danger">
                                Avanti →
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </>

    );

}