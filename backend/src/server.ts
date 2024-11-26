import express from "express";
import bodyParser from "body-parser";
import productsRouter from "./routes/products";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/checkout";
import feedbackRouter from "./routes/feedback";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rotas
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/feedback", feedbackRouter);

// Rota inicial
app.get("/", (req, res) => {
    res.send("Bem-vindo ao sistema de e-commerce TechCart!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
