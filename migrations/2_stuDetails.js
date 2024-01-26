var Student = artifacts.require("./StuDetails.sol");

module.exports = function(deployer) {
    deployer.deploy(Student);
};