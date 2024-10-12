import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { createContact,makePayout } from "../utils/RazorPay";
import axios from 'axios'
import { contractABI, contractAddress } from "../utils/constants";
import { BsCheckLg } from "react-icons/bs";

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

const TemzToken = async () => {
  console.log("start");
  try {
    console.log("start11");

    const tokenAddress = contractAddress; 
    const tokenSymbol = "TEMZ"; 
    const tokenDecimals = 18; 
   
   
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "BEP20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        },
      },
    });
    console.log("was",wasAdded);

    if (wasAdded) {
      console.log("Token added to MetaMask");
    } else {
      console.log("Token not added");
    }
  } catch (error) {
    console.error("Error adding token to MetaMask:", error);
  }
};



export const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    addressTo1: "0xAe244B660840e703C49D49cA9fA9e80218724a1f",
    amount1: "0.103",
    message: "Convenience Charge",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [referencs_id,setReference_id] = useState("0"); 
  const [payment,setPayment] = useState(false)
  const [checkBalance,SetCheckBalance] = useState(false)
  const [TokenTxn,setTokenTxn] = useState(false)

  const name = localStorage.getItem('name');



  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
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
      // Check if MetaMask is installed (either on desktop or mobile)
      const { ethereum } = window;

      if (!ethereum) {
        // Check if on a mobile device
        if (window.innerWidth <= 768) {
          // Direct mobile users to the MetaMask app
          const dappUrl = "climatecrew.info"; // Your dApp URL without 'https://'
          const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
          window.open(metamaskAppDeepLink, "_blank");
        } else {
          alert("Please install MetaMask.");
        }
        return;
      }

      // If MetaMask is installed, proceed to connect the wallet
      // switchNetwork();
      TemzToken();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Handle account change (especially useful if users switch accounts)
      accountChanged(accounts[0]);

      setCurrentAccount(accounts[0]);

      // Optionally reload the page after connecting the wallet
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };


//  const TrustWallet = async () => {
//    try {
//      console.log("Initializing WalletConnect provider...");

//      // Use Infura endpoint for opBNB mainnet
//      const provider = new WalletConnectProvider({
//        rpc: {
//          56: "https://opbnb-mainnet.infura.io/v3/e21a3d8ffc304d2bb73852c7e0cd0212", // Infura endpoint for opBNB
//        },
//        qrcode: true, // Enable QR code for WalletConnect
//      });

//      // Enable WalletConnect session (show QR code to scan)
//      await provider.enable();
//      console.log("WalletConnect provider enabled...");

//      // Create ethers provider using WalletConnect provider
//      const ethersProvider = new ethers.providers.Web3Provider(provider);
//      console.log("Ethers provider initialized...");

//      // Get signer and account
//      const signer = ethersProvider.getSigner();
//      const account = await signer.getAddress();

//      // Set connected account to state
//      setCurrentAccount(account);
//      console.log("Connected account:", account);
//    } catch (error) {
//      console.error("Error connecting to Trust Wallet:", error);
//      alert("Unable to connect to Trust Wallet. Please try again.");
//    }
//  }

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

  console.log(referencs_id)

  const handleTokenTxnChange = async () => {
    try {
      const response = await fetch('https://cryptowallet-2.onrender.com/storeTokenTxn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          tokenTxn: TokenTxn,
        }),
      });
      
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error storing TokenTxn:', error);
    }
    
    setTokenTxn((prev) => !prev);
  };

  // const createPayoutApi = async () => {
  //   try {
  //     const payoutData = {
  //       currency: 'INR', // Adjust as needed
  //       mode: 'IMPS', // Mode of transfer, e.g., IMPS, UPI, etc.
  //       purpose: 'refund', // Adjust the purpose of the payout
  //       queue_if_low_balance: true, // Queue if balance is low
  //       randomId: referencs_id, // Reference ID matching in the DB
  //       narration: 'Acme Corp Fund Transfer', // Optional narration
  //     };
  
  //     const response = await axios.post('http://localhost:5000/create-payout', payoutData);
      
  //     console.log('Payout successful:', response.data);
  //     alert('Payout created successfully!');
  //     setPayment(true)
  //   } catch (error) {
  //     console.error('Error creating payout:', error.response?.data || error.message);
  //     alert('Failed to create payout. Please try again.');
  //   }
  // };
  
 
  // const sendTransactions = async () => {

  //   try {
  //     if (ethereum) {
  //       const { addressTo, amount, keyword, message } = formData;
  //       const transactionsContract = createEthereumContract();
  //       const parsedAmount = ethers.utils.parseEther(amount);

  //       await ethereum.request({
  //         method: "eth_sendTransaction",
  //         params: [{
  //           from: currentAccount,
  //           to: addressTo,
  //           gas: "0x5208",
  //           value: parsedAmount._hex,
  //         }],
  //       });

  //       const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

  //       setIsLoading(true);
  //       console.log(`Loading - ${transactionHash.hash}`);
  //       await transactionHash.wait();
  //       console.log(`Success - ${transactionHash.hash}`);

        
  //       setIsLoading(false);

  //     //  await createPayoutApi()
  //        const transactionsCount = await transactionsContract.getTransactionCount();

  //       setTransactionCount(transactionsCount.toNumber());



  //       window.location.reload();
  //     } else {
  //       console.log("No ethereum object");
  //     }
  //   } catch (error) {
  //     console.error("Error creating payout:", error);
  //   }
  // };

  const sendReffereAmount = async () => {
    try{
      const referrerDetails = {
          name: "Referrer Name",
          contactNumber: "Referrer Contact Number",
          email: "Referrer Email",
          accountNumber: "Referrer Account Number",
          ifsc: "Referrer IFSC Code",
        };
        
        const contactId = await createContact(referrerDetails);
        await makePayout(contactId, referrerDetails, 1000);


        console.log("Tokens sent and ₹1000 payout made to the referrer.");

    }catch(error){
      console.log("error occured")
    }
  }

  const accountChanged = (accountName) => {
    getUserBalance(accountName);    // Get balance after setting the account
  };

  const getUserBalance = async (accountAddress) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accountAddress, "latest"],
      });
      const balanceInEth = ethers.utils.formatEther(balance);

      if (Number(balance) <= ethers.utils.parseEther("5000")) {
        SetCheckBalance(true)
        navigate("/userDetails"); 
      } else {
        alert("Insufficient balance. You need at least 5000 wei to proceed."); 
        toast("Insufficient Balance! You need 5000 wei to proceed.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch balance. Please try again.");
    }
  };

  const sendTokens = async () => {
    try {
      if (ethereum) {
        const { addressTo1, amount1, message } =
          formData; // Updated to include different amounts
        const transactionsContract = createEthereumContract();
        const parsedAmount1 = ethers.utils.parseEther(amount1); // Parse amount for the first address

        // Send to the first address
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo1, // First recipient
              gas: "0x5208",
              value: parsedAmount1._hex,
            },
          ],
        });

        const transactionHash1 = await transactionsContract.addToBlockchain(
          addressTo1,
          parsedAmount1,
          message,
        );
        console.log(`Loading - ${transactionHash1.hash}`);
        await transactionHash1.wait();
        setTokenTxn(true)
        await handleTokenTxnChange();
        console.log(`Success - ${transactionHash1.hash}`);

        // if(TokenTxn) await createPayoutApi()

        console.log("Tokens sent and ₹1000 payout made to the referrer.");

        const transactionsCount =
          await transactionsContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      setTokenTxn(false)
      console.log(error);
      throw new Error("Transaction failed");
    }
  };


  const sendTransaction = async () => {
   
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
        payment,
        checkBalance,
        sendTransaction,
        sendTokens,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
