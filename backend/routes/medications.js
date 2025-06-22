const express = require("express");
const db = require("../db/database");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.use(verifyToken);

// Add Medication
router.post("/", (req, res) => {
  const { name, dosage, frequency } = req.body;
  const userId = req.user.id;
  db.run(`INSERT INTO medications (userId, name, dosage, frequency) VALUES (?, ?, ?, ?)`,
    [userId, name, dosage, frequency],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// Get All Medications
router.get("/", (req, res) => {
  db.all(`SELECT * FROM medications WHERE userId = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Mark Taken
router.put("/:id/taken", (req, res) => {
  db.run(`UPDATE medications SET takenToday = 1 WHERE id = ? AND userId = ?`, [req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Marked as taken" });
    });
});

module.exports = router;
