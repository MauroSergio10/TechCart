"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dataPath = path_1.default.resolve(__dirname, "../data/products.json");
// Listar produtos
router.get("/", (req, res) => {
    const products = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    res.json(products);
});
// Adicionar produto
router.post("/", (req, res) => {
    const products = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const newProduct = req.body;
    products.push(newProduct);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(201).json({ message: "Produto adicionado!" });
});
// Editar produto
router.put("/:id", (req, res) => {
    const products = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const productId = req.params.id;
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
        return res.status(404).json({ message: "Produto não encontrado!" });
    }
    products[index] = updatedProduct;
    fs_1.default.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.json({ message: "Produto atualizado!" });
});
// Remover produto
router.delete("/:id", (req, res) => {
    const products = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const updatedProducts = products.filter((p) => p.id !== req.params.id);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(updatedProducts, null, 2));
    res.json({ message: "Produto removido!" });
});
exports.default = router;
