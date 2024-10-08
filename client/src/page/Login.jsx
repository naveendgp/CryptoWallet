import React, { useState,useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const[userReference_id,setUserReference_id] = useState(" ");
  const[reference_id,setReference_id] = useState("");
  const navigate = useNavigate();

  console.log()

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("https://cryptowallet-2.onrender.com/api/account");
        const data = await response.json();
        setReference_id(data.referralId);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleRegister = () =>{
    if(userReference_id==reference_id)
    {
      navigate("/"); 
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center gradient-bg-transactions">
      <main className="flex flex-col items-center w-full px-4">
        {/* Registration Section */}
        <section className="white-glassmorphism text-base rounded-lg p-8 mt-8 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">Register in Temz</h1>
            <p className="mt-2">
              Wallet is not a member of The Climate Crew. You can use this
              wallet to register as a new member.
            </p>
            <div className="mt-4">
              <Link
                to={"/register"}
                className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                Register
              </Link>
            </div>
          </div>
          <img
            src="https://placehold.co/150x150"
            alt="The Rich Crowd Icon"
            className="h-24 mt-4 md:mt-0"
          />
        </section>

        {/* Account Preview Section */}
        <section className="text-center mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold">Account preview</h2>
          <p className="mt-2">
            Look up any The Climate Crew member account in preview mode. Enter
            ID or Temz address to preview a random account.
          </p>
          <div className="mt-4 flex flex-col md:flex-row justify-center">
            <input
              type="text"
              placeholder="Enter ID "
              style={{ color: "white" }}
              onChange={(e) => setUserReference_id(e.target.value)} 
              className="p-2 rounded-t-lg md:rounded-l-lg md:rounded-r-none border border-gray-600 bg-black text-white w-full md:w-auto"
            />
            <button
              className="bg-blue-500 text-white py-2 px-7 rounded-b-lg md:rounded-r-lg md:rounded-l-none w-full md:w-auto"
              style={{ backgroundColor: "blue", color: "white" }}
             onClick={handleRegister}

            >
              Login
            </button>
          </div>
        </section>

        {/* Platform Activity Section */}
        <section className="mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center">
            Platform recent activity
          </h2>
          <div className="mt-4 flex flex-col md:flex-row justify-between">
            <div className="bg-gray-800 p-4 rounded-lg w-full md:w-1/2 mb-4 md:mb-0 md:mr-2">
              <div className="flex justify-between items-center">
                <span>
                  Members total <FaInfoCircle />
                </span>
                <span>
                  7911 <span className="text-green-500">↑ 109</span>
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>
                  Members received, Temz <FaInfoCircle />
                </span>
                <span>
                  632625 <span className="text-green-500">↑ 5760</span>
                </span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-full md:w-1/2 md:ml-2">
              <div className="flex justify-between items-center">
                <span>The Climate Crew Contracts</span>
                <span className="text-xs">
                  0x3Ffe617386F9E596D97bC26b3F104596E2bDc1A1 <FaCopy />
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Transactions made</span>
                <span>
                  11403 <span className="text-green-500">↑ 142</span>
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Turnover, Temz</span>
                <span>
                  632685 <span className="text-green-500">↑ 5760</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
