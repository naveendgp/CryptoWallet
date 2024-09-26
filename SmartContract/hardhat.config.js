require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  solidity: "0.8.27"
};