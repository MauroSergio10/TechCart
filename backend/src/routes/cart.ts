import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.resolve(__dirname, "../data/cart.json");

// Listar carrinho
router.get("/", (req, res) => {
    const cart = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(cart);
});

// Adicionar ao carrinho
router.post("/", (req, res) => {
    const cart = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const product = req.body;
    cart.push(product);
    fs.writeFileSync(dataPath, JSON.stringify(cart, null, 2));
    res.status(201).json({ message: "Produto adicionado ao carrinho!" });
});

// Calcular total
router.get("/total", (req, res) => {
    const cart = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);
    res.json({ total });
});

export default router;
