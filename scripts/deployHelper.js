const hre = require("hardhat");
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const StuDetails = await hre.ethers.getContractFactory("StuDetails");
  const contract = await StuDetails.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);

  const addresses = [
    owner.address,
    from1.address,

    from2.address,
    from3.address,
  ];
  console.log("Before buying chai");
  await cosoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("10") };
  await contract.connect(from1).addStuRecords(1, "Shivam", "Anand");
  await contract.connect(from2).addStuRecords(2, "Satyam", "Anand");
  await contract
    .connect(from3)
    .addStuRecords(3,"Sahil", "Gupta");

  console.log("After buying chai");
  await cosoleBalances(addresses);
  console.log(contract.target);
  let counter0 = 0;


  for (const address of addresses) {
    const StudentDetails = await contract.getStuDetails(counter0);
  
    // Extract the first name from the returned result
    const firstName = StudentDetails[1]; // Index 1 contains the first name
  
    // console.log("info", StudentDetails);
    console.log(firstName)
    counter0++;
  }

  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});







///Points to noted 
// 1. to get the address of the contract we use contract.target
// 2. use waitforDeployment instead of deployed() as it is async function
// 3. utils library is no longer used in hardhat hence instead of ethers.utils.parseEther we use ethers.parseEther