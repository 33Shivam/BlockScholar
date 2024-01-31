require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_GANACHE = process.env.PRIVATE_KEY_GANACHE;  
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [PRIVATE_KEY_GANACHE],
  },hardhat: {
    forking: {
      url: GOERLI_URL,
    }
  },
  },
};