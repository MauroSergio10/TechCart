import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart: React.FC = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get("/cart")
            .then((response) => {
                setCart(response.data);
                const totalValue = response.data.reduce((acc: number, item: any) => acc + item.price, 0);
                setTotal(totalValue);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Carrinho</h2>
            <ul>
                {cart.map((item: any) => (
                    <li key={item.id} className="flex justify-between border-b py-2">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-4 font-bold">Total: ${total}</p>
        </div>
    );
};

export default Cart;
