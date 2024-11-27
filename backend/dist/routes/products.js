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
// Funções auxiliares
const loadProducts = () => {
    if (!fs_1.default.existsSync(dataPath)) {
        fs_1.default.writeFileSync(dataPath, JSON.stringify([]));
    }
    const fileContent = fs_1.default.readFileSync(dataPath, "utf8");
    return JSON.parse(fileContent || "[]");
};
const saveProducts = (products) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};
// Listar produtos
router.get("/", (req, res) => {
    try {
        const products = loadProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao carregar produtos", error });
    }
});
// Adicionar produto
router.post("/", (req, res) => {
    try {
        const products = loadProducts();
        const newProduct = req.body;
        if (!newProduct.id ||
            !newProduct.name ||
            typeof newProduct.price !== "number") {
            return res
                .status(400)
                .json({ message: "Dados do produto inválidos" });
        }
        products.push(newProduct);
        saveProducts(products);
        res.status(201).json({
            message: "Produto adicionado!",
            product: newProduct,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao adicionar produto", error });
    }
});
// Editar produto
router.put("/:id", (req, res) => {
    try {
        const products = loadProducts();
        const productId = req.params.id;
        const updatedProduct = req.body;
        const index = products.findIndex((p) => p.id === productId);
        if (index === -1) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }
        products[index] = Object.assign(Object.assign({}, products[index]), updatedProduct);
        saveProducts(products);
        res.json({ message: "Produto atualizado!", product: products[index] });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar produto", error });
    }
});
// Remover produto
router.delete("/:id", (req, res) => {
    try {
        const products = loadProducts();
        const productId = req.params.id;
        const updatedProducts = products.filter((p) => p.id !== productId);
        if (products.length === updatedProducts.length) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }
        saveProducts(updatedProducts);
        res.json({ message: "Produto removido!" });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao remover produto", error });
    }
});
exports.default = router;
