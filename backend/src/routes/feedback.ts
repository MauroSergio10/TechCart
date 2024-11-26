import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.resolve(__dirname, "../data/feedback.json");

// Listar feedbacks
router.get("/", (req, res) => {
    const feedbacks = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(feedbacks);
});

// Adicionar feedback
router.post("/", (req, res) => {
    const feedbacks = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const newFeedback = req.body;
    feedbacks.push(newFeedback);
    fs.writeFileSync(dataPath, JSON.stringify(feedbacks, null, 2));
    res.status(201).json({ message: "Feedback recebido!" });
});

export default router;
