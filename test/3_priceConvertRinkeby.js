var Sample = artifacts.require("./priceConvertRinkeby.sol.sol");

module.exports = function(deployer) {
    deployer.deploy(Sample);
};