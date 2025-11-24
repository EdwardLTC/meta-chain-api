require('@nomicfoundation/hardhat-ignition-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: process.env.PROVIDER_NODE_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
};
