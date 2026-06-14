const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());

// DB connection
require("./config/db.js");

// Middleware
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// Routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api", authRoutes);
app.use("/api", transactionRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});