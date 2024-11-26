import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.resolve(__dirname, "../data/products.json");

// Funções auxiliares
const loadProducts = (): any[] => {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify([]));
    }
    const fileContent = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(fileContent || "[]");
};

const saveProducts = (products: any[]): void => {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// Listar produtos
router.get("/", (req: Request, res: Response) => {
    try {
        const products = loadProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar produtos", error });
    }
});

// Adicionar produto
router.post("/", (req: Request, res: Response) => {
    try {
        const products = loadProducts();
        const newProduct = req.body;

        if (!newProduct.id || !newProduct.name || typeof newProduct.price !== "number") {
            return res.status(400).json({ message: "Dados do produto inválidos" });
        }

        products.push(newProduct);
        saveProducts(products);
        res.status(201).json({ message: "Produto adicionado!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar produto", error });
    }
});

// Editar produto
router.put("/:id", (req: Request, res: Response) => {
    try {
        const products = loadProducts();
        const productId = req.params.id;
        const updatedProduct = req.body;

        const index = products.findIndex((p: any) => p.id === productId);
        if (index === -1) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }

        products[index] = { ...products[index], ...updatedProduct };
        saveProducts(products);
        res.json({ message: "Produto atualizado!", product: products[index] });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar produto", error });
    }
});

// Remover produto
router.delete("/:id", (req: Request, res: Response) => {
    try {
        const products = loadProducts();
        const productId = req.params.id;

        const updatedProducts = products.filter((p: any) => p.id !== productId);
        if (products.length === updatedProducts.length) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }

        saveProducts(updatedProducts);
        res.json({ message: "Produto removido!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover produto", error });
    }
});

export default router;
