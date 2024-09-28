const hre = require("hardhat");

async function main() {
    // Specify company wallet address and token address
    const companyWallet = "0xFa71e9B70ab88D0eA5F8Ce1D2BeC2F675E38cD43";  // Example company wallet
    const tokenAddress = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef";  // ERC-20 token contract

    // Compile the contract
    const ReferralDapp = await hre.ethers.getContractFactory("ReferralDapp");
    const referralDapp = await ReferralDapp.deploy(companyWallet, tokenAddress);

    await referralDapp.deployed();

    console.log("ReferralDapp deployed to:", referralDapp.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
