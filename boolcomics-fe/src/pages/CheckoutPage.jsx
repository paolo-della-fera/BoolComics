import { useState } from 'react';

import { useCart } from '../components/CartProvider';

import StepPersonalData from '../components/StepPersonalData';
import StepShippingAddress from '../components/StepShippingAddress';
import StepPayment from '../components/StepPayment';
import StepOrderSummary from '../components/StepOrderSummary';


export default function CheckoutPage() {

    const { cart, clearCart, discount, couponCode } = useCart();

    // Stato per gestire il passo attivo
    const [currentStep, setCurrentStep] = useState(1);

    // Stato per gestire i dati del form 
    const [formData, setFormData] = useState({
        // Step 1 - Dati personali
        first_name: '',
        last_name: '',
        email: '',
        // Step 2 - Indirizzo di spedizione
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        // Step 3 - Pagamento
        card_name: '',
        card_number: '',
        card_expiry: '',
        card_cvv: '',
    });

    // Definizione dei passi del checkout
    const steps = [
        { number: 1, label: 'Dati personali' },
        { number: 2, label: 'Spedizione' },
        { number: 3, label: 'Pagamento' },
        { number: 4, label: 'Riepilogo' },
    ];

    // Funzioni per navigare tra i passi del checkout
    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    // Funzione per aggiornare i dati del form 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="container my-5">

                {/* Barra di progressione */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    {steps.map((step) => (
                        <div key={step.number} className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center mb-1"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: currentStep >= step.number ? '#E63946' : '#dee2e6',
                                    color: currentStep >= step.number ? '#fff' : '#6c757d',
                                    fontWeight: '500'
                                }}
                            >
                                {step.number}
                            </div>
                            <small style={{ color: currentStep >= step.number ? '#E63946' : '#6c757d' }}>
                                {step.label}
                            </small>
                        </div>
                    ))}
                </div>

                {/* Step attivo */}
                {currentStep === 1 && (
                    <StepPersonalData
                        formData={formData}
                        handleChange={handleChange}
                        handleNext={handleNext}
                    />
                )}
                {currentStep === 2 && (
                    <StepShippingAddress
                        formData={formData}
                        handleChange={handleChange}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <StepPayment
                        formData={formData}
                        handleChange={handleChange}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}
                {currentStep === 4 && (
                    <StepOrderSummary
                        formData={formData}
                        handleBack={handleBack}
                        cart={cart}
                        clearCart={clearCart}
                        discount={discount}
                        couponCode={couponCode}
                    />
                )}

            </div>
        </>
    );
}