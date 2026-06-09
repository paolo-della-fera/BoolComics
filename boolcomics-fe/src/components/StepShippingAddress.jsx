import { useState } from 'react';

export default function StepShippingAddress({ formData, handleChange, handleNext, handleBack }) {

    // Stato per gestire errori di validazione
    const [error, setError] = useState('');

    // Funzione per gestire l'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.street.trim().length < 5) {
            setError('L\'indirizzo deve essere valido.');
            return;
        }

        if (formData.city.trim().length < 2) {
            setError('La città non è valida.');
            return;
        }

        if (!/^[A-Za-z]{2}$/.test(formData.state.trim())) {
            setError('La provincia non è valida (es. MI, RM).');
            return;
        }

        if (!/^\d{5}$/.test(formData.zip_code.trim())) {
            setError('Il CAP non è valido (deve contenere esattamente 5 numeri).');
            return;
        }

        if (formData.country.trim().length < 3) {
            setError('Il paese non è valido.');
            return;
        }

        handleNext();
    };


    return (

        <>

            <div className="card shadow-sm">

                <div className="card-body p-4">
                    <h4 className="mb-4">Indirizzo di spedizione</h4>

                    <form onSubmit={handleSubmit}>

                        {/* Mostra messaggio di errore se presente */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Indirizzo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Es. Via Roma 12"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Città</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'city',
                                            value: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
                                        }
                                    })}
                                    placeholder="Es. Milano"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Provincia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'state',
                                            value: e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2)
                                        }
                                    })}
                                    placeholder="Es. MI"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CAP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zip_code"
                                    value={formData.zip_code}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'zip_code',
                                            value: e.target.value.replace(/\D/g, '').slice(0, 5)
                                        }
                                    })}
                                    placeholder="Es. 20100"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Paese</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    value={formData.country}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: 'country',
                                            value: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
                                        }
                                    })}
                                    placeholder="Es. Italia"
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