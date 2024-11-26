"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dataPath = path_1.default.resolve(__dirname, "../data/cart.json");
// Listar carrinho
router.get("/", (req, res) => {
    const cart = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    res.json(cart);
});
// Adicionar ao carrinho
router.post("/", (req, res) => {
    const cart = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const product = req.body;
    cart.push(product);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(cart, null, 2));
    res.status(201).json({ message: "Produto adicionado ao carrinho!" });
});
// Calcular total
router.get("/total", (req, res) => {
    const cart = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    res.json({ total });
});
exports.default = router;
