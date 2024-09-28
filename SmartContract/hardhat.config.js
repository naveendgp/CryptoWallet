require('@nomiclabs/hardhat-waffle');
//https://eth-sepolia.g.alchemy.com/v2/gE0xcMd1OjPRmrwlNIG1t04kqyNPpaFF
module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/gE0xcMd1OjPRmrwlNIG1t04kqyNPpaFF',
      accounts: ['ebb490e6ea9f3c0c4444aad620df9f4925d118dbdbe0c9fe9d582fb763e028c5'],
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
};