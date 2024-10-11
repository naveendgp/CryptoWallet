import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    paymentMethod: "",
    accountHolderName: "",
    linkedMobileNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
    


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const random = localStorage.getItem('randomId');
    const Referalid = localStorage.getItem('ReferalId');


    const finalFormData = {
      ...formData,
      Referalid:Referalid, // Add the id from localStorage
    };

    axios.post('https://cryptowallet-2.onrender.com/api/register', finalFormData)
      .then(response => {
        console.log(response.data);
        alert("Registration successful!");
        navigate('/dashboard');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Mobile number already exists!");
        } else {
          console.error("There was an error submitting the form!", error);
          alert("There was an error submitting the form. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-transactions px-4">
      <div className="white-glassmorphism p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white-800 mb-8">
          User Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Dropdown for Payment Method */}
          <div className="mb-6">
            <label className="block text-white-700 font-semibold mb-2" htmlFor="paymentMethod">
              Select Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose a payment method</option>
              <option value="GPAY">GPAY</option>
              <option value="PHONEPE">PHONEPE</option>
              <option value="PAYTM">PAYTM</option>
            </select>
          </div>

          {/* Account Holder Name */}
          <div className="mb-6">
            <label className="block text-white-700 font-semibold mb-2" htmlFor="accountHolderName">
              Account Holder Name
            </label>
            <input
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              placeholder="Enter your account holder name"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Linked Mobile Number */}
          <div className="mb-6">
            <label className="block text-white-700 font-semibold mb-2" htmlFor="linkedMobileNumber">
              Linked Mobile Number
            </label>
            <input
              type="text"
              id="linkedMobileNumber"
              name="linkedMobileNumber"
              value={formData.linkedMobileNumber}
              onChange={handleChange}
              required
              placeholder="Enter your linked mobile number"
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-[#2952e3] py-2 px-10 mx-6 mt-10 rounded-full cursor-pointer hover:bg-[#2546bd] text-white text-lg"
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
