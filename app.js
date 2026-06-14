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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});