import React, { useState } from "react";
import axios from "axios";

const ProductForm: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("/products", { name, description, price: parseFloat(price) })
            .then(() => alert("Produto adicionado!"))
            .catch((err) => console.error(err));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border p-2 w-full mb-4"
                    placeholder="Nome do Produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    className="border p-2 w-full mb-4"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="border p-2 w-full mb-4"
                    placeholder="Preço"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
