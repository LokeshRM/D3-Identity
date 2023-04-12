require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const HTTP_URL = process.env.HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_KEY = process.env.SEPOLIA_KEY;

module.exports = {
    solidity: "0.8.9",
    networks: {
        sepolia: {
            url: HTTP_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: SEPOLIA_KEY,
    },
};
