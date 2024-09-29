import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { contractABI, contractAddress } from "../utils/constants";
import { BsCheckLg } from "react-icons/bs";
import axios from 'axios'

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

const switchNetwork = async () => {
  try {
    if (!window.ethereum) throw new Error("MetaMask is not installed");

    // Binance Smart Chain Mainnet Configuration
    const bscMainnet = {
      chainId: "0x38", // 56 in decimal
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    };

    // Check if MetaMask is already connected to Binance Smart Chain Mainnet
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: bscMainnet.chainId }],
    });

    console.log("Switched to Binance Smart Chain");
  } catch (error) {
    // If the network is not added to MetaMask, add it
    if (error.code === 4902) {
      try {
        const bscMainnet = {
          chainId: "0x38", // 56 in decimal
          chainName: "Binance Smart Chain Mainnet",
          nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          blockExplorerUrls: ["https://bscscan.com/"],
        };

        // Add Binance Smart Chain Mainnet to MetaMask
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [bscMainnet],
        });

        console.log("Binance Smart Chain added and switched");
      } catch (addError) {
        console.error("Failed to add Binance Smart Chain", addError);
      }
    } else {
      console.error("Failed to switch network", error);
    }
  }
};


export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: "0xadEF408Dc790043863B92a109a2140Bb350C8284",
    amount: "2500",
    message: "Convinence Charge",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [referencs_id,setReference_id] = useState("0"); 



  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      switchNetwork()

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
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

  console.log(referencs_id)

  const createPayoutApi = async () => {
    try {
      const payoutData = {
        currency: 'INR', // Adjust as needed
        mode: 'IMPS', // Mode of transfer, e.g., IMPS, UPI, etc.
        purpose: 'refund', // Adjust the purpose of the payout
        queue_if_low_balance: true, // Queue if balance is low
        randomId: referencs_id, // Reference ID matching in the DB
        narration: 'Acme Corp Fund Transfer', // Optional narration
      };
  
      const response = await axios.post('http://localhost:5000/create-payout', payoutData);
      
      console.log('Payout successful:', response.data);
      alert('Payout created successfully!');
    } catch (error) {
      console.error('Error creating payout:', error.response?.data || error.message);
      alert('Failed to create payout. Please try again.');
    }
  };
  
 
  const sendTransaction = async () => {

    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);

        await createPayoutApi();

        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());


        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
