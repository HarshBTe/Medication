const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, hashed, role],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", { expiresIn: "1h" });
    res.json({ token, role: user.role });
  });
});

module.exports = router;
