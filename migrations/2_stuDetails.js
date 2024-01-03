var Sample = artifacts.require("./StudentDetailsContract.sol");

module.exports = function(deployer) {
    deployer.deploy(Sample);
};