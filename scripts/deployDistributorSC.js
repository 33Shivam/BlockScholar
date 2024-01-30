const hre = require("hardhat");

async function main() {
  const [owner, from1] = await hre.ethers.getSigners();

  const ScholarDetails = await hre.ethers.getContractFactory("ScholarDetails");
  const contract = await ScholarDetails.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3"); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
  await contract.connect(from1).storeContractAdd("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

