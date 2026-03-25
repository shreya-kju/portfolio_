// 1. IMPORTS
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 2. APP SETUP
const app = express();
const PORT = process.env.PORT8000;

// 3. MIDDLEWARE (VERY IMPORTANT)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

// 4. DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kju@database', // put your MySQL password if any
    database: 'portfolio'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});
// 🔥 6. ADD THIS ALSO (IMPORTANT)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. TEST ROUTE
app.get('/', (req, res) => {
    res.send('Server is running');
});

// 6. CONTACT FORM API
app.post('/api/contact', (req, res) => {
    console.log("DATA:", req.body); // 👈 DEBUG (keep this for now)

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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});