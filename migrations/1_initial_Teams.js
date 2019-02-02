var Teams = artifacts.require("./Teams.sol");

module.exports = function(deployer) {
  deployer.deploy(Teams);
};