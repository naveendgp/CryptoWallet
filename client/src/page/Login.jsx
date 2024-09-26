import React from 'react';
import './Login.css';
import { FaInfoCircle, FaCopy } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-animated">
      {/* Star Field Animation */}
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>

      {/* Background and Overlay */}
      <div className="bg"></div>

      <header className="w-full flex justify-between items-center p-4 bg-black">
        <img src="https://placehold.co/100x50" alt="The Rich Crowd Logo" className="h-12" />
        <button className="bg-gray-700 text-white py-2 px-4 rounded">Connect Wallet</button>
      </header>

      <main className="flex flex-col items-center w-full px-4">
        {/* Registration Section */}
        <section className="bg-blue-500 text-white rounded-lg p-8 mt-8 w-full max-w-4xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Register in KSN</h1>
            <p className="mt-2">Wallet is not a member of The Rich Crowd. You can use this wallet to register as a new member.</p>
            <div className="mt-4">
              <button style={{backgroundColor:"orange"}} className="bg-orange-400 text-black py-2 px-4 rounded mr-2">Register Now</button>
              <button style={{backgroundColor:"orange"}} className="bg-orange-400 text-black py-2 px-4 rounded">Check Demo</button>
            </div>
          </div>
          <img src="https://placehold.co/150x150" alt="The Rich Crowd Icon" className="h-24" />
        </section>

        {/* Account Preview Section */}
        <section className="text-center mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold">Account preview</h2>
          <p className="mt-2">Look up any The Rich Crowd member account in preview mode. Enter ID or KSN address to preview a random account.</p>
          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Enter ID or KSN wallet"
              className="p-2 rounded-l-lg border border-gray-600 bg-black text-white"
              
            />
            <button className="bg-orange-400 text-black py-2 px-4 rounded-r-lg" style={{backgroundColor:"orange"}}>Preview</button>
          </div>
        </section>

        {/* Platform Activity Section */}
        <section className="mt-12 w-full max-w-4xl">
                            <h2 className="text-2xl font-bold text-center">Platform recent activity</h2>
                            <div className="mt-4 flex justify-between">
                                <div className="bg-gray-800 p-4 rounded-lg w-1/2 mr-2">
                                    <div className="flex justify-between items-center">
                                        <span>Members total <i className="fas fa-info-circle"></i></span>
                                        <span>7911 <span className="text-green-500">↑ 109</span></span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span>Members received, KSN <i className="fas fa-info-circle"></i></span>
                                        <span>632625 <span className="text-green-500">↑ 5760</span></span>
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg w-1/2 ml-2">
                                    <div className="flex justify-between items-center">
                                        <span>The Rich Crowd Contracts</span>
                                        <span className="text-xs">0x3Ffe617386F9E596D97bC26b3F104596E2bDc1A1 <i className="fas fa-copy"></i></span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span>Transactions made</span>
                                        <span>11403 <span className="text-green-500">↑ 142</span></span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span>turnover, KSN</span>
                                        <span>632685 <span className="text-green-500">↑ 5760</span></span>
                                    </div>
                                </div>
                            </div>
                        </section>
      </main>
    </div>
  );
}

export default Login;
