const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all jobs for the logged-in user
router.get("/", authMiddleware, (req, res) => {
    const userId = req.user.id;
    db.query("SELECT * FROM jobs WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add a new job
router.post("/", authMiddleware, (req, res) => {
    const { company, role, status } = req.body;
    const userId = req.user.id;

    db.query(
        "INSERT INTO jobs (company, role, status, user_id) VALUES (?, ?, ?, ?)",
        [company, role, status, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Job added successfully", jobId: result.insertId });
        }
    );
});

// Update a job
router.put("/:id", authMiddleware, (req, res) => {
    const { company, role, status } = req.body;
    const jobId = req.params.id;
    const userId = req.user.id;

    db.query(
        "UPDATE jobs SET company = ?, role = ?, status = ? WHERE id = ? AND user_id = ?",
        [company, role, status, jobId, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Job not found or unauthorized" });
            }
            res.json({ message: "Job updated successfully" });
        }
    );
});

// Delete a job
router.delete("/:id", authMiddleware, (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    db.query(
        "DELETE FROM jobs WHERE id = ? AND user_id = ?",
        [jobId, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Job not found or unauthorized" });
            }
            res.json({ message: "Job deleted successfully" });
        }
    );
});

module.exports = router;
