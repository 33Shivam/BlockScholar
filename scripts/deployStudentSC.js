const hre = require("hardhat");

async function main() {
  const StuDetails = await hre.ethers.getContractFactory("StuDetails");
  const contract = await StuDetails.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//0x5FbDB2315678afecb367f032d93F642f64180aa3
//0x5FbDB2315678afecb367f032d93F642f64180aa3