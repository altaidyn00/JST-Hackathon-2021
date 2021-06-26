const JasTalents = artifacts.require("JasTalents");

module.exports = async function(deployer) {
  await deployer.deploy(JasTalents);
};
