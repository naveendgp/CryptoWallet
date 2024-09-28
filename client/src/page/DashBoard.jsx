import React,{useState,useEffect} from 'react';  

const DashBoard = () => {  

    const [account, setAccount] = useState(null);
  const [referralId, setReferralId] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/account');  
        const data = await response.json();
  
        setAccount(data.account);  
        setReferralId(data.referralId);  
  
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };
  
    fetchAccountDetails();  
  }, []);
  

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-900">  
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">  
        <div className="flex items-center mb-4">  
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-16 w-16 flex items-center justify-center">  
            <span className="text-3xl">👤</span>  
          </div>  
          <div className="ml-4">  
            <h2 className="text-xl font-bold">CRYPTOWALLET</h2>  
            <p className="text-sm">{account}</p>  
            <p className="text-xs text-gray-400">ID {referralId}</p>  
          </div>  
        </div>  
        <div className="bg-gray-700 p-4 rounded-lg mb-4">  
          <h3 className="text-sm">Personal link</h3>  
          <a  
            href="http://localhost:3000/dashboard"  
            className="text-blue-400 hover:underline"  
          >  
            http://localhost:3000/dashboard
          </a>  
        </div>  
        <div className="bg-blue-500 p-4 rounded-lg flex items-center justify-between">  
          <span className="text-white">KSN/USDT</span>  
          <span className="text-lg font-bold">0.0538 USDT</span>  
        </div>  
        <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-4">
            Submit
        </button>
        </div>

      </div>  
    </div>  
  );  
};  

export default DashBoard;
