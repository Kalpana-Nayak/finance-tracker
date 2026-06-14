const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Format: "Bearer TOKEN"
        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(actualToken, "secretkey");

        req.user = decoded; // attach user info
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;