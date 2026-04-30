const db = require("../db");

exports.findByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM jobs WHERE user_id = ?",
            [userId],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

exports.createJob = (data) => {
    const { company, role, status, created_at, user_id } = data;

    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO jobs (company, role, status, created_at, user_id) VALUES (?, ?, ?, ?, ?)",
            [company, role, status, created_at, user_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.updateJob = (jobId, userId, data) => {
    const { company, role, status, created_at } = data;

    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE jobs SET company = ?, role = ?, status = ?, created_at = ? WHERE id = ? AND user_id = ?",
            [company, role, status, created_at, jobId, userId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.deleteJob = (jobId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM jobs WHERE id = ? AND user_id = ?",
            [jobId, userId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};