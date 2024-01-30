const hre = require("hardhat");

async function main() {
  const Staff = await hre.ethers.getContractFactory("Staff");
  const contract = await Staff.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3" , "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});