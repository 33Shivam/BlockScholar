const hre = require("hardhat");
const fs = require('fs');
const ethers = hre.ethers;


async function main() {
  const StuDetails = await hre.ethers.getContractFactory("StuDetails");
  const contract = await StuDetails.deploy(); //instance of contract
  await contract.waitForDeployment();
 

  console.log("Address of contract Student Details:", contract.target);

  const ScholarDetails = await hre.ethers.getContractFactory("ScholarDetails");
  const Amount = hre.ethers.parseEther("10");
  const contract2 = await ScholarDetails.deploy(contract.target,{value:Amount}); //instance of contract
  console.log("Address of contract scholarship:", contract2.target);
  

  await contract2.waitForDeployment();


  const Staff = await hre.ethers.getContractFactory("Staff");
  const contract1 = await Staff.deploy(contract.target,contract2.target); //instance of contract
  console.log("Address of Staff contract:", contract1.target);
  await contract1.waitForDeployment();
  await contract2.storeContractAdd(contract1.target);
  const contractAddresses = {
    StudentAddress: contract.target,
    ScholarshipAddress: contract2.target,
    StaffAddress: contract1.target,
  };
  fs.writeFileSync("contractAddresses.json", JSON.stringify(contractAddresses),"utf-8");

  
}
main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

