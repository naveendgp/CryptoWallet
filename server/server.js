const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Razorpay = require('razorpay')
const axios = require('axios')
const nodemailer = require('nodemailer');

const app = express();


app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: 'GET,POST,PUT,DELETE',  // Allow these methods
  allowedHeaders: 'Content-Type,Authorization',  // Allow these headers
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Change '*' to a specific domain if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.options('*', cors());

app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: false  
}));


const RAZORPAY_KEY = "rzp_test_zOZ8aPurnNX8g7"
const RAZORPAY_SECRET = "4Qfo9bY0gtGlmA6biAtaNOtD"

const uri = "mongodb+srv://jeyachandran72jj:jeyan%40zeone123@cryptowallet.vgo84.mongodb.net/";

mongoose.connect(uri)
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));


// mongoose.connect("mongodb://localhost:27017/cryptowallet")
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("Error connecting to MongoDB:", err));

const randomIdSchema = new mongoose.Schema({
  randomId: { type: String, unique: true, required: true },
  // reference_id: { type: String, unique: true, required: true },
  account: { type: String, required: true },  // Make account unique
  contact_id: { type: String  },
  // funt_account_id: { type: String, unique: true },
  // payout_id: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});


const RandomId = mongoose.model("RandomId", randomIdSchema);

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Add name field
  email: { type: String, required: true }, // Add email field
  mobileNumber: { type: String, required: true }, // Add mobileNumber field
  paymentMethod: { type: String, required: true },
  // accountHolderName: { type: String, required: true },
  // linkedMobileNumber: { type: String, required: true },
  Referalid: { type: String, required: true },
  randomId: { type: String, unique: true, required: true },
  address: { type: String,  required: true },  
  TokenTxn: { type: Boolean, default: false },
});



const Registration = mongoose.model('Registration', registrationSchema);

const formSchema = new mongoose.Schema({
  walletId: { type: String},  // walletId as a required field
  walletaddress: { type: String, required: true },  // walletaddress as required
  binary: { type: Number, required: true },
  matrix: { type: Number, required: true }
});
const FormData = mongoose.model('FormData', formSchema);


// app.put('/submit', async (req, res) => {

//   try {
//     const newFormData = new FormData(req.body);
//     await newFormData.updateOne(walletId)
//     res.status(201).send({ message: 'Form data saved successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Error saving form data' });
//   }
// });

app.post('/submit', async (req, res) => {
  const { walletAddress, binary, matrix } = req.body;

  try {
    // Check if walletAddress exists in the request
    if (!walletAddress) {
      return res.status(400).send({ error: 'walletAddress is required' });
    }

    // Step 1: Delete all existing data associated with the walletAddress
    await FormData.deleteMany({ walletAddress }); // Deletes all documents with the given walletAddress

    // Step 2: Insert new data
    const newFormData = new FormData({
      walletAddress,
      binary,
      matrix,
    });

    const savedFormData = await newFormData.save(); // Save the new data

    res.status(200).send({
      message: 'Data deleted and new data inserted successfully',
      data: savedFormData,
    });
  } catch (error) {
    console.error('Error handling form data:', error);
    res.status(500).send({ error: 'Error handling form data' });
  }
});


// app.get('/getAllData', async (req, res) => {
//   try {
//     const data = await FormData.find();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching form data:', error);
//     res.status(500).json({ message: 'Error fetching form data' });
//   }
// });

app.get('/getLastUpdatedData', async (req, res) => {
  try {
    const lastUpdatedData = await FormData.findOne().sort({ _id: -1 });

    if (!lastUpdatedData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(lastUpdatedData);
  } catch (error) {
    console.error('Error fetching last updated form data:', error);
    res.status(500).json({ message: 'Error fetching form data' });
  }
});




// Check if the randomId or Account already exists
app.post('/submit', async (req, res) => {
  const { walletaddress, binary, matrix } = req.body;

  // Log the incoming data to verify it's correctly received
  console.log('Received data:', req.body);

  try {
    // Check if walletAddress exists in the request
    if (!walletaddress) {
      return res.status(400).send({ error: 'walletAddress is required' });
    }

    // Check if required fields are present
    if (binary === undefined || matrix === undefined) {
      return res.status(400).send({ error: 'binary and matrix are required' });
    }

    // Step 1: Delete all existing data associated with the walletAddress
    const deleteResult = await FormData.deleteMany({ walletaddress });

    // If no documents were deleted, log this
    if (deleteResult.deletedCount === 0) {
      console.log(`No data found for walletAddress: ${walletaddress}`);
    }

    // Step 2: Insert new data
    const newFormData = new FormData({
      walletaddress,
      binary,
      matrix,
    });

    const savedFormData = await newFormData.save(); // Save the new data

    res.status(200).send({
      message: 'Data deleted and new data inserted successfully',
      data: savedFormData,
    });
  } catch (error) {
    console.error('Error handling form data:', error);
    res.status(500).send({ error: 'Error handling form data' });
  }
});


function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Letters only
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Save randomId and Account, ensuring uniqueness
app.post("/api/save-random-id", async (req, res) => {
  const { randomId, Account } = req.body;
  console.log('randomId,',req.body)

  try {
    const newRandomId = new RandomId({
      randomId,
      account: Account,
      contact_id: generateRandomId(10) 
    });
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

app.get('/api/total-registrations', async (req, res) => {
  try {
    const totalCount = await Registration.countDocuments({});
    res.status(200).json({ total: totalCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.get("/api/getDetails", async (req, res) => {  
  const { randomId } = req.query;   
  console.log("Received randomId:", randomId); // Log the received randomId  

  try {  
    const registrations = await Registration.find({ Referalid: randomId }); 

    if (registrations.length > 0) {
      // Prepare the response in the required format
      const tableData = registrations.map(registration => ({
        name: registration.accountHolderName,
        randomId: registration.randomId,
        status: registration.TokenTxn,
      }));

      return res.status(200).json(tableData); // Send the data as a response
    } else {
      return res.status(404).json({ message: "No matching records found." });
    }
  } catch (error) {
    console.error("Error fetching registration data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



// first api for razor pay
// app.post('/create-contact', async (req, res) => {
//   try {
//     const { name, email, contact, reference_id, notes } = req.body;
//     console.log(name)
//     const response = await axios.post(
//       'https://api.razorpay.com/v1/contacts',
//       {
//         name,
//         email,
//         contact,
//         type: 'employee',
//         reference_id,
//         notes,
//       },
//       {
//         auth: {
//           username: RAZORPAY_KEY,
//           password: RAZORPAY_SECRET,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const updatedRandomId = await RandomId.findOneAndUpdate(
//       { reference_id },  // Find the record by randomId
//       { contact_id: response.data.id },  // Update with contact_id
//       { new: true }  // Return the updated record
//     );

//     if (!updatedRandomId) {
//       return res.status(404).json({ message: "Random ID not found" });
//     }
    
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error creating contact:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// //second api fund account
// app.post('/create-fund-account', async (req, res) => {
//   try {
//     const { reference_id, account_type, bank_account } = req.body;
//     const randomIdRecord = await RandomId.findOne({ reference_id });
//     const contact_id = randomIdRecord.contact_id;
//     const response = await axios.post(
//       'https://api.razorpay.com/v1/fund_accounts',
//       {
//         contact_id,
//         account_type,
//         bank_account
//       },
//       {
//         auth: {
//           username: RAZORPAY_KEY,
//           password: RAZORPAY_SECRET,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const updatedFundAccountId = await RandomId.findOneAndUpdate(
//       { reference_id },  
//       { funt_account_id : response.data.id },  
//       { new: true }  
//     );

//     if (!updatedFundAccountId) {
//       return res.status(404).json({ message: "Random ID not found" });
//     }

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error creating fund account:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// //Transaction api
// app.post('/create-payout', async (req, res) => {
//   const {  currency, mode, purpose, queue_if_low_balance, reference_id, narration, notes } = req.body;
//   const randomIdRecord = await RandomId.findOne({ reference_id });
//   const fund_account_id = randomIdRecord.funt_account_id;
//   const account_number = 2323230031241052;
//   const amount =  100000;
//   try {
//     const response = await axios.post(
//       'https://api.razorpay.com/v1/payouts',
//       {
//         account_number,
//         fund_account_id,
//         amount,
//         currency,
//         mode,
//         purpose,
//         queue_if_low_balance,
//         reference_id,
//         narration,
//         notes,
//       },
//       {
//         auth: {
//           username: RAZORPAY_KEY,
//           password: RAZORPAY_SECRET,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const updatedPayoutId = await RandomId.findOneAndUpdate(
//       { reference_id },  
//       { payout_id : response.data.id },  
//       { new: true }  
//     );

//     if (!updatedPayoutId) {
//       return res.status(404).json({ message: "Random ID not found" });
//     }

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error creating payout:', error.response?.data || error.message);
//     res.status(400).json({ error: error.response?.data || error.message });
//   }
// });

//save the user Details
app.post('/api/register', async (req, res) => {
  const { name, email, mobileNumber, paymentMethod, Referalid, randomId, address } = req.body;

  try {
    // Check if either the mobile number or address already exists
    const existingUser = await Registration.findOne({
      $or: [{ mobileNumber }, { address }]
    });

    if (existingUser) {
      let conflictMessage = 'Registration conflict: ';
      if (existingUser.mobileNumber === mobileNumber) conflictMessage += 'Mobile Number already exists! ';
      if (existingUser.address === address) conflictMessage += 'Wallet Address already exists!';

      return res.status(400).json({ message: conflictMessage.trim() });
    }

    // Create new registration entry
    const newRegistration = new Registration({
      name,
      email,
      mobileNumber,
      paymentMethod,
      Referalid,
      randomId,
      address
    });

    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.post('/storeTokenTxn', async (req, res) => {
  const { name, tokenTxn } = req.body;

  if (!name || tokenTxn === undefined) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    let user = await Registration.findOne({ name });

    if (user) {
      user.Registration = tokenTxn;
      await user.save();
      return res.status(200).json({ message: 'TokenTxn updated successfully' });
    } else {
      console.log("user Does not exist")
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error storing TokenTxn', error });
  }
});

//Dashboard

app.get("/api/dashboard", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//2fv

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'climatecrew.info@gmail.com',
    pass: 'ezkp yqhy iyjy ugbr',
  },
});

app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: 'jeyachandran72jj@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Dear User,

    Your OTP code for verifying your account on ClimateCrew is: ${otp}. This code is part of the two-factor authentication process for securing your wallet.
    
    Please enter the OTP on the ClimateCrew website to complete the verification process. If you did not initiate this request, please ignore this email.
    
    Thank you for using ClimateCrew to manage your wallet securely!
    
    Best regards,  
    The ClimateCrew Team`
      };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error); // Logs full error details
      return res.status(500).json({ error: 'Error sending email', details: error.message });
    }
    res.status(200).json({ otp });
  });
  
});





app.listen(4000, () => console.log("Server running on port 4000"));
