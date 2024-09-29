import React, { useState,useEffect } from "react";
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
  const [reference_id,setReference_id] = useState("")

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
        const response = await fetch("http://localhost:5000/api/account");
        const data = await response.json();
        setReference_id(data.referralId);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  console.log("referenceId",reference_id);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

   
    axios.post('http://localhost:5000/api/register', formData)
      .then(response => {
        console.log(response.data);
        alert("Registration successful!");
      })
      .catch(error => {
        console.error("There was an error submitting the form!", error);
      });

      try {
        // First API call: Create Contact
        const createContactResponse = await axios.post('http://localhost:5000/create-contact', {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          randomId: reference_id, 
        });
    
        const { id: contact_id } = createContactResponse.data;
    
        console.log("Contact created:", createContactResponse.data);
    
        const createFundAccountResponse = await axios.post('http://localhost:5000/create-fund-account', {
          randomId: reference_id, 
          account_type: "bank_account",
          bank_account: {
            name: formData.accountName,
            ifsc: formData.ifscCode,
            account_number: formData.accountNumber,
          },
        });
    
        console.log("Fund account created:", createFundAccountResponse.data);
    
        alert("Registration and fund account creation successful!");
      } catch (error) {
        console.error("Error occurred during the API calls:", error);
        alert("There was an error during registration. Please try again.");
      }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Contact Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="contact">
            Contact Number
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Account Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="accountName">
            Bank Account Name
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* IFSC Code Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="ifscCode">
            IFSC Code
          </label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Account Number Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="accountNumber">
            Bank Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
