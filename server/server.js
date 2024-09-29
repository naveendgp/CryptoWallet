const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Razorpay = require('razorpay')
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

const razorpay = new Razorpay({
  key_id: 'rzp_test_PtZCw9A7XrHNYl',
  key_secret: 'JO4MJE8ox8vAG1DuJkpXyFbF'
});


// Customer's bank details
app.post('/create-customer', async (req, res) => {
  const { name, email, contact } = req.body; // Extract customer details from request body

  try {
    const customerContact = await razorpay.contacts.create({
      name: name, // Customer's name
      email: email, // Customer's email
      contact: contact, // Customer's phone number
      type: 'customer'
    });

    res.json({ success: true, contact: customerContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating customer contact', error });
  }
});

app.get('/api/test',(req,res) => {
    try{
      res.send('hello')
    }catch(error){
      res.send(error)
    }
})

// API Route to create a fund account for the customer
app.post('/create-fund-account', async (req, res) => {
  const { contact_id, bank_name, ifsc, account_number } = req.body; // Extract bank details from request body

  try {
    const fundAccount = await razorpay.fundAccount.create({
      contact_id: contact_id, // Contact ID of the customer
      account_type: 'bank_account',
      bank_account: {
        name: bank_name, // Bank account holder's name
        ifsc: ifsc, // IFSC code of the customer's bank
        account_number: account_number // Bank account number of the customer
      }
    });

    res.json({ success: true, fundAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating fund account', error });
  }
});

// API Route to initiate a payout using the created fund account
app.post('/initiate-payout', async (req, res) => {
  const { fund_account_id, amount } = req.body; // Extract payout details from request body

  try {
    const payout = await razorpay.payouts.create({
      account_number: '23232300012345', // Your merchant account number
      fund_account_id: fund_account_id, // Fund Account ID of the customer
      amount: amount, // Payout amount in paisa (100 paisa = ₹1)
      currency: 'INR',
      mode: 'IMPS', // Transfer mode (IMPS, NEFT, UPI, etc.)
      purpose: 'payout',
      queue_if_low_balance: true // Queue payout if insufficient balance
    });

    res.json({ success: true, payout });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error initiating payout', error });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
