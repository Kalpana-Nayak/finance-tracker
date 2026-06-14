const db = require("../config/db");

// ➤ ADD TRANSACTION
const addTransaction = (req, res) => {
    try {
        const { amount, type, category } = req.body;
        const user_id = req.user.id; // 🔐 from JWT

        if (!amount || !type) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const sql = "INSERT INTO transactions (user_id, amount, type, category) VALUES (?, ?, ?, ?)";

        db.query(sql, [user_id, amount, type, category], (err, result) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({ message: "Transaction added" });
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// ➤ GET ALL TRANSACTIONS
const getTransactions = (req, res) => {
    try {
        const user_id = req.user.id;

        const sql = "SELECT * FROM transactions WHERE user_id = ?";

        db.query(sql, [user_id], (err, results) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(200).json(results);
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// ➤ GET SUMMARY (income, expense, balance)
const getSummary = (req, res) => {
    try {
        const user_id = req.user.id;

        const sql = `
            SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
            FROM transactions
            WHERE user_id = ?
        `;

        db.query(sql, [user_id], (err, results) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            const income = results[0].total_income || 0;
            const expense = results[0].total_expense || 0;

            res.status(200).json({
                total_income: income,
                total_expense: expense,
                balance: income - expense
            });
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMonthlySummary = (req, res) => {
    try {
        const user_id = req.user.id;

        const sql = `
            SELECT 
                DATE_FORMAT(date, '%Y-%m') AS month,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
            FROM transactions
            WHERE user_id = ?
            GROUP BY month
            ORDER BY month ASC
        `;

        db.query(sql, [user_id], (err, results) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(200).json(results);
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    getSummary,
    getMonthlySummary
};