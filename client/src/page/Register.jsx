import React, { useState,useEffect,useContext } from "react";
import "./Register.css"; // Assume you have some default styles in this CSS file
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // Importing FontAwesome Icons
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";



const generateRandomId = (length) => {
  const characters =
    "ABCDEFGHIJabcdefghij0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const Registration = () => {
  const [walletStatus, setWalletStatus] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);  // Account state
  const [userBalance, setUserBalance] = useState(null);
  const [randomId, setRandomId] = useState('');
  const [address , setAddress ] = useState(false);
  const[userReference_id,setUserReference_id] = useState(" ");
  const[reference_id,setReference_id] = useState("");

  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const navigate = useNavigate();

  console.log()

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/account");
        const data = await response.json();
        setReference_id(data.referralId);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleRegister = () =>{
    // handleGenerate()

    if(userReference_id.trim()==reference_id.trim())
    {
      handleGenerate()
      navigate("/userDetails"); 
    }
  }


  localStorage.setItem('ReferalId',userReference_id);
  

 

  const handleGenerate = async () => {
    let isUnique = false;
    let newId;

    while (!isUnique) {
      newId = generateRandomId(10);
      console.log("jj",newId)

      try {
        const response = await fetch("http://localhost:5000/api/check-random-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ randomId: newId, Account: currentAccount }),  // Send account too
        });
  
        const data = await response.json();

        if (!data.exists) {
          isUnique = true;
          setRandomId(newId);
          sendRandomIdToBackend(newId);  // Send to backend once unique ID is generated
        } else {
          console.log(data.message);  // Handle case where ID or account already exists
        }
      } catch (error) {
        console.error("Error checking random ID:", error);
        break;
      }
    }
  };

  const sendRandomIdToBackend = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/save-random-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ randomId: id, Account: currentAccount }),  // Send account
      });

      const data = await response.json();
      if (data.success) {
        console.log("Random ID saved successfully");
      } else {
        console.error("Error saving random ID:", data.message);
      }
    } catch (error) {
      console.error("Error sending random ID to backend:", error);
    }
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
          value={userReference_id}
          onChange={(e) => setUserReference_id(e.target.value)} 
          className="input-field mb-7 w-full py-3 px-3 bg-grey text-black rounded-md"
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

          {errorMessage && (
            <h4 className="text-red-500 font-medium mt-4">{errorMessage}</h4>
          )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          
         
          <button className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={handleRegister}>
            Register
            </button>
        </div>


      </div>
    </div>
  );
};

export default Registration;
