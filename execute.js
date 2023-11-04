/* import web3 & dotenv libraries */
const { Web3 } = require('web3');

/* Declare web3 instance */
const web3 = new Web3('http://localhost:7545');

/* Load the contract ABI & address */
const contractABI = require('./build/contracts/Sample.json');
const contractAddress = '0xf62e3e5e6488093d14B9cc7eD64e0F287A3e5855';
const account1PrivateKey = '0x7c419d0c5e0a46dc4a744c3cf4d6f62bb9aa0c91d65cc453645b6381b38d5197';
const account2Address = '0x49A190A95Fa1C1FA95a39aA9AbEe4Aa8bfB80232';

/* Declare a contract instance */
const contractInstance = new web3.eth.Contract(contractABI.abi, contractAddress);

/* Declare address 1 (sender) instance */
const account1Address = web3.eth.accounts.privateKeyToAccount(account1PrivateKey).address;

/* Declare the transfer amount of 10 ether in Wei */
const transferAmount = web3.utils.toWei('5', 'ether');

/* Declare gas price & gas limit */
const gasPrice = web3.utils.toWei('20', 'gwei');
const gasLimitHex = web3.utils.toHex(6721975);

/* Create the transaction data */
const transactionData = contractInstance.methods.transfer(account2Address, transferAmount).encodeABI();

/* Declare the transaction object */
const transactionObject = {
    from: account1Address,
    to: contractAddress,
    gasPrice: gasPrice,
    gas: gasLimitHex,
    data: transactionData,
    value: transferAmount
};

console.log(`Account 1 Private Key: ${account1PrivateKey}`);

/* Send the transaction */
web3.eth.accounts.signTransaction(transactionObject, account1PrivateKey).then(signedTx => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', (receipt) => {
            console.log('Transaction Receipt:', receipt);
        })
        .on('error', (error) => {
            console.error('Transaction Error:', error);
        });
}).catch(error => {
    console.error('Signing Error:', error);
});