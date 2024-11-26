import React from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Recommendations from "./components/Recommendations";
import FeedbackForm from "./components/FeedbackForm";

const App: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen text-gray-800 p-4">
            <header className="bg-blue-500 text-white py-4 text-center text-2xl font-bold">
                TechCart E-Commerce
            </header>
            <main className="container mx-auto mt-6">
                <ProductForm />
                <ProductList />
                <Cart />
                <Checkout />
                <Recommendations />
                <FeedbackForm />
            </main>
        </div>
    );
};

export default App;
