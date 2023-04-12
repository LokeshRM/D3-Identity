const { ethers } = require("hardhat");

async function main() {
    const storageContract = await ethers.getContractFactory("Storage");

    const deployedstorageContract = await storageContract.deploy();

    await deployedstorageContract.deployed();

    console.log("Contract Address:", deployedstorageContract.address);

    console.log("Sleeping.....");
    await sleep(40000);

    await hre.run("verify:verify", {
        address: deployedstorageContract.address,
        constructorArguments: [],
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
