"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dataPath = path_1.default.resolve(__dirname, "../data/feedback.json");
// Listar feedbacks
router.get("/", (req, res) => {
    const feedbacks = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    res.json(feedbacks);
});
// Adicionar feedback
router.post("/", (req, res) => {
    const feedbacks = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
    const newFeedback = req.body;
    feedbacks.push(newFeedback);
    fs_1.default.writeFileSync(dataPath, JSON.stringify(feedbacks, null, 2));
    res.status(201).json({ message: "Feedback recebido!" });
});
exports.default = router;
