// SPDX-License-Identifier: MIT

/* Declare solidity version to use */
pragma solidity ^0.8.19;

/* Declare the web3 local instance */


/* Declare contract */
contract Sample {
    /* Declare state variables */
    uint public amount = 0;


    /* Set the count to a given number */
    function setAmount(uint _amount) public {
        amount = _amount;
    }

    /* Get the count */
    function getAmount() public view returns (uint) {
        return amount;
    }

    /* Transfer ether from this contract to another address */
    function transfer(address payable _to, uint _amount) public payable {
        require(_amount > 0, "Value must be greater than 0");
        require(_to != address(0), "Invalid recipient address"); // Check that the recipient address is valid
        require(address(this).balance >= _amount, "Insufficient contract balance"); // Check if the contract has enough balance to send
        _to.transfer(_amount);
    }
}