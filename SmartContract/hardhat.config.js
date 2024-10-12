require('@nomiclabs/hardhat-waffle');
//https://eth-sepolia.g.alchemy.com/v2/gE0xcMd1OjPRmrwlNIG1t04kqyNPpaFF
module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/gE0xcMd1OjPRmrwlNIG1t04kqyNPpaFF',
      accounts: ['0xDcb726cd5F41158DABdA7362b81db35115d7Da83'],
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
};