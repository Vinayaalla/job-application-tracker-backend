const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
//     user: process.env.DB_USER || process.env.MYSQLUSER || "root",
//     password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "",
//     database: process.env.DB_NAME || process.env.MYSQLDATABASE || "job_application_tracker",
//     port: Number(process.env.DB_PORT || process.env.MYSQLPORT) || 3306
// });
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
    if (err) {
        console.log("❌ DB connection failed:", err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
    }
});

module.exports = db;