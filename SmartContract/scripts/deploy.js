const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const ReferralDapp = await hre.ethers.getContractFactory("ReferralDapp");

    // Deploy the contract
    const referralDapp = await ReferralDapp.deploy();

    await referralDapp.deployed();

    console.log("ReferralDapp deployed to:", referralDapp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
