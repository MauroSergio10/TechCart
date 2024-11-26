import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/products")
            .then((response) => setProducts(response.data))
            .catch((err) => console.error(err));
    }, []);

    const addToCart = (product: any) => {
        axios.post("/cart", product)
            .then(() => alert("Produto adicionado ao carrinho!"))
            .catch((err) => console.error(err));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Produtos</h2>
            <ul>
                {products.map((product: any) => (
                    <li key={product.id} className="flex justify-between border-b py-2">
                        <span>{product.name} - ${product.price}</span>
                        <button
                            className="bg-green-500 text-white px-4 py-1 rounded"
                            onClick={() => addToCart(product)}
                        >
                            Adicionar ao Carrinho
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
