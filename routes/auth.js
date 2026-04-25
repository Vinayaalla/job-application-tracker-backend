const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
// SIGNUP
router.post("/signup", async (req, res) => {
    const { username, password, dob, address, city, state, country } = req.body;

    try {
        db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                "INSERT INTO users (username, password, dob, address, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [username, hashedPassword, dob, address, city, state, country],
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

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || "secretkey123",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                dob: user.dob,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country
            }
        });
    });
});

// CHANGE PASSWORD
const authenticateToken = require("../middleware/auth");
router.put("/change-password", authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "User not found" });

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Password updated successfully" });
        });
    });
});

// DELETE ACCOUNT
router.delete("/delete-account", authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Account deleted successfully" });
    });
});
// UPDATE PROFILE
router.put("/update-profile", authenticateToken, (req, res) => {
    const { dob, address, city, state, country } = req.body;
    const userId = req.user.id;

    db.query(
        "UPDATE users SET dob = ?, address = ?, city = ?, state = ?, country = ? WHERE id = ?",
        [dob, address, city, state, country, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);

            // Fetch updated user to return
            db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
                if (err) return res.status(500).json(err);
                const user = result[0];
                res.json({
                    message: "Profile updated successfully",
                    user: {
                        id: user.id,
                        username: user.username,
                        dob: user.dob,
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        country: user.country
                    }
                });
            });
        }
    );
});

module.exports = router;