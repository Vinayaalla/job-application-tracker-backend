const jobService = require("../services/jobs.service");

exports.getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobs(req.user.id);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const result = await jobService.createJob(req.user.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const result = await jobService.updateJob(
            req.params.id,
            req.user.id,
            req.body
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const result = await jobService.deleteJob(
            req.params.id,
            req.user.id
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};