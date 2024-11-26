import React, { useState } from "react";
import axios from "axios";

const FeedbackForm: React.FC = () => {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("/feedback", { feedback })
            .then(() => alert("Feedback enviado!"))
            .catch((err) => console.error(err));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Deixe seu Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="border p-2 w-full mb-4"
                    placeholder="Seu feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
