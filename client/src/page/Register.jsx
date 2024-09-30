import React, { useState } from "react";
import "./Register.css"; // Assume you have some default styles in this CSS file
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // Importing FontAwesome Icons

const Registration = () => {
  const [sponsorId, setSponsorId] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleInputChange = (e) => {
    setSponsorId(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg-transactions">
      <div className="white-glassmorphism w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-4">
          Register in The Climate Crew
        </h1>
        <p className="mb-5">Enter ID or Temz wallet</p>

        {/* Sponsor ID Input Field */}
        <input
          type="text"
          placeholder="Sponsor ID"
          value={sponsorId}
          onChange={handleInputChange}
          className="input-field mb-7 w-full p-2 bg-grey text-black rounded-md"
        />

        {/* Error Messages with Red Cross Icons */}
        <div className="text-red-500 mb-7">
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Sponsor ID: Sponsor Not Found
          </p>
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Wallet: not detected
          </p>
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Network:
          </p>
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Registration: not available
          </p>
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Balance: min 702.8112 Temz
          </p>
          <p className="flex items-center mb-3">
            <FaTimesCircle className="mr-2" /> Approve Temz Required
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          
          <Link
            to={"/dashboard"}
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
