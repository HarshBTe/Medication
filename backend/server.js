const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const medRoutes = require("./routes/medications");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/medications", medRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
