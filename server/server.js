const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  
mongoose.connect("mongodb://localhost:27017/cryptowallet");

const randomIdSchema = new mongoose.Schema({
  randomId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }, 
});

const RandomId = mongoose.model("RandomId", randomIdSchema);

app.post("/api/check-random-id", async (req, res) => {
    const { randomId } = req.body;
  
    try {
      const existingId = await RandomId.findOne({ randomId });
  
      if (existingId) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking random ID:", error);
      res.status(500).json({ success: false, message: "Error checking random ID." });
    }
  });
  

app.post("/api/save-random-id", async (req, res) => {
  const { randomId } = req.body;

  try {
    const newRandomId = new RandomId({ randomId });
    await newRandomId.save(); 
    res.json({ success: true, message: "Random ID saved successfully." });
  } catch (error) {
    console.error("Error saving random ID:", error);
    res.status(500).json({ success: false, message: "Error saving random ID." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
