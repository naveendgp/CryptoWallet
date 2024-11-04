import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLessThan } from "react-icons/fa";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    mobileNumber: "", 
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
    e.preventDefault(); // Prevent default form submission
    localStorage.setItem('wallet-address', formData.name);
    localStorage.setItem("binary", formData.mobileNumber);
    localStorage.setItem("matrix", formData.email);
    // Optionally navigate or handle submission logic here
    // navigate('/some-route'); // Uncomment if you want to navigate after submit
    navigate("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-transactions px-4">
      <div className="white-glassmorphism p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white-800 mb-8">
          Admin Management
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Left Column */}
            <div>
              {/* Wallet Address */}
              <div className="mb-6">
                <label className="block text-white-700 font-semibold mb-2" htmlFor="name">
                  Wallet Address
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your wallet address"
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Binary Value */}
              <div className="mb-6">
                <label className="block text-white-700 font-semibold mb-2" htmlFor="mobileNumber">
                  Binary Value
                </label>
                <input
                  type="text"
                  id="binary"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your binary value"
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Matrix Value (Email) */}
              <div className="mb-6">
                <label className="block text-white-700 font-semibold mb-2" htmlFor="email">
                  Matrix Value (Email)
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
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

export default Admin;
