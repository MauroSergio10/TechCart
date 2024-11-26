import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const { paymentMethod } = req.body;
    res.json({ message: `Compra finalizada com o método de pagamento: ${paymentMethod}` });
});

export default router;
