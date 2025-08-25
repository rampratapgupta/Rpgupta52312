const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "data_history.json";

// Ensure the data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all history data
app.get("/history", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// Save generated data
app.post("/save", (req, res) => {
    const { jobName, data, timestamp } = req.body;

    if (!jobName || !data || !timestamp) {
        return res.status(400).json({ error: "Invalid data format" });
    }

    const record = { jobName, data, timestamp };
    const currentData = JSON.parse(fs.readFileSync(DATA_FILE));
    currentData.push(record);

    fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));
    res.status(201).json({ message: "Data saved successfully" });
});

// Clear history
app.delete("/clear", (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    res.json({ message: "History cleared successfully" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
