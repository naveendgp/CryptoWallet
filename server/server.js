const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Razorpay = require('razorpay')
const axios = require('axios')
const Razorpay = require('razorpay')
const axios = require('axios')
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));

const RAZORPAY_KEY = "rzp_test_zOZ8aPurnNX8g7"
const RAZORPAY_SECRET = "4Qfo9bY0gtGlmA6biAtaNOtD"



mongoose.connect("mongodb://localhost:27017/cryptowallet")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

const randomIdSchema = new mongoose.Schema({
  randomId: { type: String, unique: true, required: true },
  account: { type: String, unique: true, required: true },  // Make account unique
  contact_id: { type: String, unique: true },  // Razorpay contact ID
  funt_account_id: { type: String, unique: true },
  payout_id: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});


const RandomId = mongoose.model("RandomId", randomIdSchema);

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  accountName: { type: String, required: true },
  ifscCode: { type: String, required: true },
  accountNumber: { type: String, required: true },
});

const Registration = mongoose.model('Registration', registrationSchema);

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


// first api for razor pay
app.post('/create-contact', async (req, res) => {
  try {
    const { name, email, contact, reference_id, notes } = req.body;
    console.log(name)
    const response = await axios.post(
      'https://api.razorpay.com/v1/contacts',
      {
        name,
        email,
        contact,
        type: 'employee',
        reference_id,
        notes,
      },
      {
        auth: {
          username: RAZORPAY_KEY,
          password: RAZORPAY_SECRET,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const updatedRandomId = await RandomId.findOneAndUpdate(
      { reference_id },  // Find the record by randomId
      { contact_id: response.data.id },  // Update with contact_id
      { new: true }  // Return the updated record
    );

    if (!updatedRandomId) {
      return res.status(404).json({ message: "Random ID not found" });
    }
    
    res.json(response.data);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

//second api fund account
app.post('/create-fund-account', async (req, res) => {
  try {
    const { reference_id, account_type, bank_account } = req.body;
    const randomIdRecord = await RandomId.findOne({ reference_id });
    const contact_id = randomIdRecord.contact_id;
    const response = await axios.post(
      'https://api.razorpay.com/v1/fund_accounts',
      {
        contact_id,
        account_type,
        bank_account
      },
      {
        auth: {
          username: RAZORPAY_KEY,
          password: RAZORPAY_SECRET,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const updatedFundAccountId = await RandomId.findOneAndUpdate(
      { reference_id },  
      { funt_account_id : response.data.id },  
      { new: true }  
    );

    if (!updatedFundAccountId) {
      return res.status(404).json({ message: "Random ID not found" });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error creating fund account:', error);
    res.status(500).send('Internal Server Error');
  }
});

//Transaction api
app.post('/create-payout', async (req, res) => {
  const {  currency, mode, purpose, queue_if_low_balance, reference_id, narration, notes } = req.body;
  const randomIdRecord = await RandomId.findOne({ reference_id });
  const fund_account_id = randomIdRecord.funt_account_id;
  const account_number = 2323230031241052;
  const amount =  100000;
  try {
    const response = await axios.post(
      'https://api.razorpay.com/v1/payouts',
      {
        account_number,
        fund_account_id,
        amount,
        currency,
        mode,
        purpose,
        queue_if_low_balance,
        reference_id,
        narration,
        notes,
      },
      {
        auth: {
          username: RAZORPAY_KEY,
          password: RAZORPAY_SECRET,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const updatedPayoutId = await RandomId.findOneAndUpdate(
      { reference_id },  
      { payout_id : response.data.id },  
      { new: true }  
    );

    if (!updatedPayoutId) {
      return res.status(404).json({ message: "Random ID not found" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating payout:', error.response?.data || error.message);
    res.status(400).json({ error: error.response?.data || error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, contact, accountName, ifscCode, accountNumber } = req.body;

  try {
    const newRegistration = new Registration({
      name,
      email,
      contact,
      accountName,
      ifscCode,
      accountNumber,
    });

    await newRegistration.save(); // Save the form data to MongoDB
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(5000, () => console.log("Server running on port 5000"));