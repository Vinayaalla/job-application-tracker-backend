const db = require("../db");

exports.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE username=?",
            [username],
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            }
        );
    });
};

exports.findById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE id = ?",
            [userId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            }
        );
    });
};

exports.updatePassword = (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, userId],
            (err, result) => {
                if (err) return reject(err);
                resolve({ message: "Password updated successfully" });
            }
        );
    });
};
