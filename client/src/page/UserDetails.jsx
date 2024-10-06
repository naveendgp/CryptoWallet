import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    accountName: "",
    ifscCode: "",
    accountNumber: "",
  });
  const [randomId,setRandomId] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("https://cryptowallet-2.onrender.com/api/account");
        const data = await response.json();
        setRandomId(data.referralId);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);


  const id = localStorage.getItem('ReferalId');
  localStorage.setItem('name',formData.name);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const finalFormData = {
      ...formData,
      randomId, // Add the randomId from useEffect
      id // Add the id from localStorage
    };
  
    axios.post('https://cryptowallet-2.onrender.com/api/register', finalFormData)
      .then(response => {
        console.log(response.data);
        alert("Registration successful!");
        navigate('/dashboard');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Email or Account Number already exists!");
        } else {
          console.error("There was an error submitting the form!", error);
          alert("There was an error submitting the form. Please try again.");
        }
      });
  


    //   try {
    //     // First API call: Create Contact
    //     const createContactResponse = await axios.post('http://localhost:5000/create-contact', {
    //       name: formData.name,
    //       email: formData.email,
    //       contact: formData.contact,
    //       randomId: reference_id, 
    //     });
    
    //     const { id: contact_id } = createContactResponse.data;
    
    //     console.log("Contact created:", createContactResponse.data);
    
    //     const createFundAccountResponse = await axios.post('http://localhost:5000/create-fund-account', {
    //       randomId: reference_id, 
    //       account_type: "bank_account",
    //       bank_account: {
    //         name: formData.accountName,
    //         ifsc: formData.ifscCode,
    //         account_number: formData.accountNumber,
    //       },
    //     });
    
    //     console.log("Fund account created:", createFundAccountResponse.data);
    
    //     alert("Registration and fund account creation successful!");
    //     navigate("/dashboard");

    //   } catch (error) {
    //     console.error("Error occurred during the API calls:", error);
    //     alert("There was an error during registration. Please try again.");
    //   }
  };

  

return (
  <div className="min-h-screen flex items-center justify-center gradient-bg-transactions px-4">
    <div className="white-glassmorphism p-12 rounded-lg shadow-lg w-full max-w-4xl">
      {" "}
      {/* Increased max width */}
      <h2 className="text-3xl font-bold text-center text-white-800 mb-8">
        User Details
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name and Email Fields (side by side) */}
        <div className="flex flex-wrap justify-between mb-6">
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Contact Number and Bank Account Name Fields (side by side) */}
        <div className="flex flex-wrap justify-between mb-6">
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Enter your contact number"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="accountName"
            >
              Bank Account Name
            </label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              required
              placeholder="Enter your bank account name"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* IFSC Code and Bank Account Number Fields (side by side) */}
        <div className="flex flex-wrap justify-between mb-6">
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="ifscCode"
            >
              IFSC Code
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
              placeholder="Enter your bank's IFSC code"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-full lg:w-[48%]">
            <label
              className="block text-white-700 font-semibold mb-2"
              htmlFor="accountNumber"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              placeholder="Enter your bank account number"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button type="submit"
            className="bg-[#2952e3] py-2 px-10 mx-6 mt-10 rounded-full cursor-pointer hover:bg-[#2546bd] text-white text-lg" // Increased padding and font size
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);



};

export default RegistrationForm;
