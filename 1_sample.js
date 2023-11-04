const MyContract = artifacts.require('Sample'); // Import your contract

module.exports = function(deployer) {
  deployer.deploy(MyContract)
    .then(instance => {
      console.log('Contract Address:', instance.address); // Access the contract address
    });
};