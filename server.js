// 1. IMPORTS
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 2. APP SETUP
const app = express();


// 3. MIDDLEWARE (VERY IMPORTANT)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));
// Ensure environment variables exist
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, } = process.env;
console.log("env check skipped temporarily");

// 4. DATABASE CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kju@database", // or your MySQL password
    database: "portfolio", // make sure this exists
    port: 3306
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to mysql');
    }
});
db.query(`
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT
)
`, (err) => {
    if (err) {
        console.log("Table creation error:", err);
    } else {
        console.log("Table ready ✅");
    }
});
// 🔥 6. ADD THIS ALSO (IMPORTANT)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. CONTACT FORM API
app.post("/contact", (req, res) => {
    console.log("Request received!");
    console.log("body:", req.body);
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ FULL ERROR:", err);   // 👈 VERY IMPORTANT
            return res.status(500).json({
                success: false,
                error: err.message                  // 👈 send error to browser
            });
        }

        res.status(200).json({
            success: true,
            message: "Message saved successfully!"
        });
    });
});

// 7. START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});