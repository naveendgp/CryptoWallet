import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: "rzp_test_PtZCw9A7XrHNYl",
  key_secret: "JO4MJE8ox8vAG1DuJkpXyFbF",
});

console.log("Razorpay object:", razorpay);


// Function to create a contact
export const createContact = async (referrer) => {
  const options = {
    name: referrer.name,
    email: referrer.email,
    contact: referrer.contactNumber,
    type: "customer",
  };

  try {
    const contact = await razorpay.contacts.create(options);
    console.log(contact,"contactdetails")
    return contact.id;
  } catch (error) {
    console.log("Error creating contact:", error);
  }
};

// Function to make a payout
export const makePayout = async (contactId, accountDetails, amount) => {
  const options = {
    account_number: "YOUR_COMPANY_ACCOUNT_NUMBER", // Company account to make payouts from
    fund_account: {
      contact_id: contactId, // This links the payout to the created contact
      account_type: "bank_account",
      bank_account: {
        name: accountDetails.name,
        ifsc: accountDetails.ifsc,
        account_number: accountDetails.accountNumber,
      },
    },
    amount: amount * 100, // Razorpay expects the amount in paise (₹1000 = 100000 paise)
    currency: "INR",
    mode: "IMPS", // Can use NEFT, RTGS, UPI, etc.
    purpose: "referral", // Describe the purpose
    queue_if_low_balance: true, // Set to true if you want to queue the payout in case of low balance
  };

  try {
    // Check if razorpay.payouts is defined
    if (!razorpay || !razorpay.payouts) {
      throw new Error("Razorpay instance is not properly initialized.");
    }

    const payout = await razorpay.payouts.create(options);
    console.log("Payout Successful:", payout);
  } catch (error) {
    console.error("Payout Error:", error);
  }
};
