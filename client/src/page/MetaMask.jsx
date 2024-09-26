import React, {useState} from 'react';
import {ethers} from 'ethers';


const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null); 

  const connectWallet = () => {
    if (window.ethereum) {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
          accountChanged([result[0]])
        })
    } else {
      setErrorMessage('Install MetaMask please!!')
    }
  }

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName)
    getUserBalance(accountName)

  }

  const getUserBalance = (accountAddress) => {
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
    .then(balance => {
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }


  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2">
        <center>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            MetaMask Wallet Connection
          </h1>

          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Connect Wallet Button
          </button>

          <h3 className="text-lg font-medium text-gray-700 mt-4">
            Address: 
            <span className="text-purple-500 font-bold ml-2">{defaultAccount}</span>
          </h3>
          <h3 className="text-lg font-medium text-gray-700 mt-2">
            Balance: 
            <span className="text-green-500 font-bold ml-2">{userBalance}</span>
          </h3>


          {errorMessage && (
            <h4 className="text-red-500 font-medium mt-4">
              {errorMessage}
            </h4>
          )}
        </center>
      </div>
    </div>
  );
};


export default MetaMask;