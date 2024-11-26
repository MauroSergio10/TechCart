import React from "react";

const Recommendations: React.FC = () => {
    const recommendations = [
        { id: 1, name: "Produto Recomendado 1" },
        { id: 2, name: "Produto Recomendado 2" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Recomendações</h2>
            <ul>
                {recommendations.map((rec) => (
                    <li key={rec.id} className="border-b py-2">
                        {rec.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
