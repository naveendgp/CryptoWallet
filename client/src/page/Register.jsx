import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [sponsorId, setSponsorId] = useState('');
  const [walletStatus, setWalletStatus] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleInputChange = (e) => {
    setSponsorId(e.target.value);
  };

  const handleConnectWallet = () => {
    setWalletStatus(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      {/* Top-right connect wallet button */}
      <div className="absolute top-5 right-5">
        <button 
          onClick={handleConnectWallet} 
          className={`connect-wallet-button ${walletStatus ? 'connected' : ''}`}>
          {walletStatus ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </div>

      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-4">Registration in The Rich Crowd</h1>
        <p className="mb-5">Enter ID or KSN wallet</p>
        <input
          type="text"
          placeholder="Sponsor ID"
          value={sponsorId}
          onChange={handleInputChange}
          className="input-field mb-7"
        />
        <div className="error-text mb-7">
          <p>
            <i className="fas fa-times-circle mb-3"></i> Sponsor ID: Sponsor Not Found
          </p>
          <p>
            <i className="fas fa-times-circle mb-3"></i> Wallet: not detected
          </p>
          <p>
            <i className="fas fa-times-circle mb-3"></i> Network:
          </p>
          <p>
            <i className="fas fa-times-circle mb-3"></i> Registration: not available
          </p>
          <p>
            <i className="fas fa-times-circle mb-3"></i> Balance: min 714.2857 KSN
          </p>
          <p>
            <i className="fas fa-times-circle mb-3"></i> Approve KSN: Required
          </p>
        </div>
        <div className="flex justify-center">
          <Link to='/dashboard'><button className="button">Login Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
