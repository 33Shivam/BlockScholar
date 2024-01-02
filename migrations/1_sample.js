var Sample = artifacts.require("./SampleContract.sol");

module.exports = function(deployer) {
    deployer.deploy(Sample);
};