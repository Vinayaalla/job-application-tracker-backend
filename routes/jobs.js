const express = require("express");
const authMiddleware = require("../middleware/auth");
const jobController = require("../controllers/jobs.controller");

const router = express.Router();

// Get all jobs for the logged-in user
router.get("/", authMiddleware, jobController.getJobs);

// Add a new job
router.post("/", authMiddleware, jobController.createJob);

// Update a job
router.put("/:id", authMiddleware, jobController.updateJob);

// Delete a job
router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;
