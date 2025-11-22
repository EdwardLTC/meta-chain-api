require('@nomicfoundation/hardhat-ignition-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: process.env.INFURA_PRIVATE_KEY ? `https://sepolia.infura.io/v3/${process.env.INFURA_PRIVATE_KEY}` : '',
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
};
