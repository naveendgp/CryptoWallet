// import React, { useState } from 'react';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import { ethers } from 'ethers';

// const WalletConnectOnlyApp = () => {
//   const [provider, setProvider] = useState(null);
//   const [account, setAccount] = useState(null);

//   const connectWallet = async () => {
//     try {
//       // Create a WalletConnect Provider
//       const walletConnectProvider = new WalletConnectProvider({
//         infuraId: "86a7c51950394c9184dac2a6372ff93e",
//       });

//       // Enable session (triggers QR Code modal)
//       await walletConnectProvider.enable();

//       // Set up ethers.js provider
//       const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider);
//       setProvider(web3Provider);

//       // Get the signer (connected account)
//       const signer = web3Provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//       console.log("Connected wallet address:", address);
//     } catch (error) {
//       console.error('Connection failed:', error);
//     }
//   };

//   const disconnectWallet = () => {
//     if (provider && provider.provider && provider.provider.disconnect) {
//       provider.provider.disconnect();
//     }
//     setAccount(null);
//     setProvider(null);
//   };

//   return (
//     <div>
//       <h1>Connect Mobile Wallet with WalletConnect</h1>
//       {account ? (
//         <>
//           <p>Connected account: {account}</p>
//           <button onClick={disconnectWallet}>Disconnect Wallet</button>
//         </>
//       ) : (
//         <button onClick={connectWallet}>Connect Wallet</button>
//       )}
//     </div>
//   );
// };

// export default WalletConnectOnlyApp;
import React, { useState } from "react"
import { useSDK } from "@metamask/sdk-react"

function MyComponent() {
  const { sdk } = useSDK()
  const [signedMessage, setSignedMessage] = useState("")

  const handleConnectAndSign = async () => {
    try {
      const message = "Your message here"
      const signature = await sdk.connectAndSign({ msg: message })
      setSignedMessage(signature)
    } catch (error) {
      console.error("Error in signing:", error)
    }
  }

  return (
    <div>
      <button onClick={handleConnectAndSign}>Connect and Sign</button>
      {signedMessage && <p>Signed Message: {signedMessage}</p>}
    </div>
  )
}
export default MyComponent