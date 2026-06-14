const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Register body:", req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.log("DB ERROR:", err);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ message: "Email already registered" });
                }

                return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({ message: "User registered successfully" });
        });

    } catch (error) {
        console.log("CATCH ERROR:", error);   // 👈 VERY IMPORTANT
        res.status(500).json({ message: "Server error" });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login body:", req.body);

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: "User not found" });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                "secretkey",
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login successful",
                token
            });
        });

    } catch (error) {
        console.log("CATCH ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login };