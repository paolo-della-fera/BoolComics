import { useState } from 'react';

export default function StepPayment({ formData, handleChange, handleNext, handleBack }) {

    // Stato per gestire eventuali errori di validazione
    const [error, setError] = useState('');

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.card_name.trim().length < 3) {
            setError('Il nome sulla carta deve contenere almeno 3 caratteri.');
            return;
        }

        if (formData.card_number.length !== 16) {
            setError('Il numero carta deve contenere esattamente 16 cifre.');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(formData.card_expiry)) {
            setError('La scadenza deve essere nel formato MM/AA.');
            return;
        }

        if (formData.card_cvv.length !== 3) {
            setError('Il CVV deve contenere esattamente 3 cifre.');
            return;
        }

        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Dati di pagamento</h4>

                    <form onSubmit={handleSubmit}>

                        {/* Mostra messaggio di errore se presente */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        
                        <div className="mb-3">
                            <label className="form-label">Nome sulla carta</label>
                            <input
                                type="text"
                                className="form-control"
                                name="card_name"
                                value={formData.card_name}
                                onChange={(e) => handleChange({
                                    target: {
                                        name: 'card_name',
                                        value: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
                                    }
                                })}
                                placeholder="Es. Mario Rossi"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Numero carta</label>
                            <input
                                type="text"
                                className="form-control"
                                name="card_number"
                                value={formData.card_number}
                                onChange={(e) => handleChange({
                                    target: {
                                        name: 'card_number',
                                        value: e.target.value.replace(/\D/g, '').slice(0, 16)
                                    }
                                })}
                                placeholder="Es. 1234567890123456"
                                maxLength={16}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Scadenza</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="card_expiry"
                                    value={formData.card_expiry}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        const formatted = value.length >= 3 ? value.slice(0, 2) + '/' + value.slice(2) : value;
                                        handleChange({ target: { name: 'card_expiry', value: formatted } });
                                    }}
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CVV</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="card_cvv"
                                    value={formData.card_cvv}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'card_cvv',
                                            value: e.target.value.replace(/\D/g, '').slice(0, 3)
                                        }
                                    })}
                                    placeholder="Es. 123"
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={handleBack}
                            >
                                ← Indietro
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