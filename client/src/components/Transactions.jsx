import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div id="aboutus" className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions text-base">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            About ClimateCrew
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {/* Left Section: Image */}
          <div className="flex-1">
            <img
              src="https://demo.cocotemplates.com/cryptodax/wp-content/uploads/2022/10/Image-LPUF2X7-1024x828.png"
              alt="ClimateCrew Mission and Vision"
              className="w-full h-auto object-cover mr-5 rounded-lg"
            />
          </div>

          {/* Right Section: Text */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 text-white mt-10 lg:mt-0">
            <p className="text-lg text-center lg:text-left mb-4">
              ClimateCrew was established by a dedicated team of
              environmentally-conscious innovators, united by a common goal. Our
              backgrounds span across various fields, including sustainable
              technology and environmental solutions, and we have come together
              to offer valuable insights, education, and tools for those
              passionate about making a positive impact on the planet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
