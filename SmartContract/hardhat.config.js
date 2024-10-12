require('@nomiclabs/hardhat-waffle');
//https://eth-sepolia.g.alchemy.com/v2/gE0xcMd1OjPRmrwlNIG1t04kqyNPpaFF
module.exports = {
  solidity: '0.8.0',
  networks: {
    bsc: {
      url: 'https://rpc.ankr.com/bsc',
      accounts: ['821afc8dc041afa023940fa2d70789d6408838f46842ad0590bb711410d752dc'],
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
};