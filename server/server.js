const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));

mongoose.connect("mongodb://localhost:27017/cryptowallet")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

const randomIdSchema = new mongoose.Schema({
  randomId: { type: String, unique: true, required: true },
  account: { type: String, unique: true, required: true },  // Make account unique
  createdAt: { type: Date, default: Date.now },
});

const RandomId = mongoose.model("RandomId", randomIdSchema);

// Check if the randomId or Account already exists
app.post("/api/check-random-id", async (req, res) => {
    const { randomId, Account } = req.body;
  
    try {
      const existingId = await RandomId.findOne({ $or: [{ randomId }, { account: Account }] });
  
      if (existingId) {
        res.json({ exists: true, message: 'ID or account already exists.' });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking random ID:", error);
      res.status(500).json({ success: false, message: "Error checking random ID." });
    }
});

// Save randomId and Account, ensuring uniqueness
app.post("/api/save-random-id", async (req, res) => {
  const { randomId, Account } = req.body;

  try {
    const newRandomId = new RandomId({ randomId, account: Account });
    await newRandomId.save(); 
    res.json({ success: true, message: "Random ID saved successfully." });
  } catch (error) {
    console.error("Error saving random ID:", error);
    res.status(500).json({ success: false, message: "Error saving random ID." });
  }
});

app.get("/api/account", async (req, res) => {
  try {
    const accountDetails = await RandomId.findOne().sort({ createdAt: -1 });

    if (accountDetails) {
      res.json({
        account: accountDetails.account,
        referralId: accountDetails.randomId, 
      });
    } else {
      res.status(404).json({ message: "Account details not found" });
    }
  } catch (error) {
    console.error("Error fetching account details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
