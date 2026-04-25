const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
// SIGNUP
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if user exists
        db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // insert user
            db.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "User registered successfully" });
                }
            );
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // create token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || "secretkey123",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user.id, username: user.username }
        });
    });
});
module.exports = router;