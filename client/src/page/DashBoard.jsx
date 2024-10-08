import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext";

const DashBoard = () => {
  const [account, setAccount] = useState(null);
  const [referralId, setReferralId] = useState(null);

  const [amount, setAmount] = useState("1000");
  const [recipientAccount, setRecipientAccount] = useState("123456789-");
  const [ifscCode, setIfscCode] = useState("IBKL45678");
  const [name, setName] = useState("CUSTOMERNAME");
  const [message, setMessage] = useState("MESSAGE");

  const { currentAccount, handleChange, sendTransaction, payment,formData, isLoading } =
    useContext(TransactionContext);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("https://cryptowallet-2.onrender.com/api/account");
        const data = await response.json();

        setAccount(data.account);
        setReferralId(data.referralId);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, []);

  

  const handleSubmit = () => {
    sendTransaction()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* New Card: Message for generating referral ID */}
        {payment && (
        <div className="bg-red-500 text-white p-4 mb-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Action Required</h3>
          <p className="text-sm">
            Please send <strong>2500 tokens</strong> to generate your referral
            ID.
          </p>
        </div>
        )}

        {/* Existing Card */}
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-16 w-16 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">CLIMATE CREW</h2>
            <p className="text-sm">{account}</p>
            {!payment && (
            <p className="text-xs text-gray-400 text-center p-0.5 white-glassmorphism">
              ID {referralId}
            </p>
            )}
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h3 className="text-sm">Personal link</h3>
          <a
            href="https://cryptowallet-2.onrender.com/dashboard"
            className="text-blue-400 hover:underline"
          >
            http://localhost:3000/dashboard
          </a>
        </div>
        <div className="bg-blue-500 p-4 rounded-lg flex items-center justify-between">
          <span className="text-white">TEMZ/BNB</span>
          <span className="text-lg font-bold">0.0538 USDT</span>
        </div>
        <div className="flex justify-center">
          <button
            className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-4"
            onClick={handleSubmit}
            style={{ backgroundColor: "#06D6A0", color: "black" }}
          >
            Send Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
