const db = require("./db");

const setupDatabase = () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            dob DATE,
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            country VARCHAR(100)
        );
    `;

    const createJobsTable = `
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            company VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            user_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    db.query(createUsersTable, (err) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Users table ready.");
            db.query(createJobsTable, (err) => {
                if (err) {
                    console.error("Error creating jobs table:", err);
                } else {
                    console.log("Jobs table ready.");
                    process.exit();
                }
            });
        }
    });
};

setupDatabase();
