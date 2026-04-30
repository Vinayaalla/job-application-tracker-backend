const db = require("../db");

exports.signup = (data) => {
    const {
        username,
        password,
        dob,
        address,
        city,
        state,
        country
    } = data;
    return new Promise((resolve, reject) => {

        db.query("INSERT INTO users (username, password, dob, address, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, password, dob, address, city, state, country],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    })

}

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
                resolve(result);
            }
        );
    });
};

exports.deleteById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM users WHERE id = ?",
            [userId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.updateProfile = (userId, data) => {
    const { username, dob, address, city, state, country } = data;
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE users SET username=?,dob=?,address=?,city=?,state=?,country=? WHERE id=?", [username, dob, address, city, state, country, userId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}