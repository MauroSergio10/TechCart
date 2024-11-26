"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./routes/products"));
const cart_1 = __importDefault(require("./routes/cart"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
// Rotas
app.use("/products", products_1.default);
app.use("/cart", cart_1.default);
app.use("/checkout", checkout_1.default);
app.use("/feedback", feedback_1.default);
// Rota inicial
app.get("/", (req, res) => {
    res.send("Bem-vindo ao sistema de e-commerce TechCart!");
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
