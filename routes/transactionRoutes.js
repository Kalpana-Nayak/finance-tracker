const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { addTransaction, getTransactions, getSummary, getMonthlySummary } = require("../controllers/transactionController");

// 🔐 Protected routes
router.post("/transaction", authMiddleware, addTransaction);
router.get("/transactions", authMiddleware, getTransactions);
router.get("/summary", authMiddleware, getSummary);
router.get("/monthly-summary", authMiddleware, getMonthlySummary);

module.exports = router;