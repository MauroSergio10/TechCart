import React, { useState } from "react";
import axios from "axios";

const Checkout: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("/checkout", { paymentMethod })
            .then(() => alert("Compra finalizada!"))
            .catch((err) => console.error(err));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Finalizar Compra</h2>
            <form onSubmit={handleSubmit}>
                <select
                    className="border p-2 w-full mb-4"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Selecione o método de pagamento</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Boleto">Boleto</option>
                </select>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Finalizar
                </button>
            </form>
        </div>
    );
};

export default Checkout;
