const { ethers } = require("hardhat");
import abi from "./Transactions.json";


async function main() {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // Import your contract ABI (ensure to replace this with your actual ABI)
    const contractABI = abi.abi

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const wallet = new ethers.Wallet("0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356", provider); // replace with your wallet private key
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const referrerAddress = "f24d81f60f1fcdbf7cbf4356x";
    const registerTx = await contract.registerUser(referrerAddress);
    console.log("Register Transaction:", registerTx.hash);
    await registerTx.wait(); // Wait for the transaction to be mined

    // Example: Log in the user
    const loginTx = await contract.login();
    console.log("Login Transaction:", loginTx.hash);
    await loginTx.wait(); // Wait for the transaction to be mined

    // Example: Check balance
    const userBalance = await contract.getBalance(wallet.address);
    console.log("User Balance:", userBalance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
