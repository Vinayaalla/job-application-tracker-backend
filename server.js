const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "https://job-applicaton-tracker.vercel.app",
    credentials: true
}));
app.use(express.json());
const db = require("./db");

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
