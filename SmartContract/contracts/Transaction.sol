// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ReferralDapp {

    struct User {
        address referrer;
        uint256 balance;
    }

    mapping(address => User) public users;
    mapping(address => bool) public registeredUsers;

    uint256 constant MIN_BALANCE = 5000; // Set the minimum balance required in wei (or token units)
    uint256 constant COMMISSION_RATE = 20; // 20% commission

    // Modifier to check the user's wallet balance
    modifier hasSufficientBalance() {
        require(msg.sender.balance >= MIN_BALANCE, "Insufficient balance to register.");
        _;
    }

    // Register new user using referral ID
    function registerUser(address _referrer) public hasSufficientBalance {
        require(!registeredUsers[msg.sender], "User already registered");
        require(_referrer != address(0), "Invalid referrer");

        // Register the new user
        users[msg.sender] = User({
            referrer: _referrer,
            balance: 0
        });

        registeredUsers[msg.sender] = true;
    }

    // Function to log in and transfer commission to referrer
    function login() public {
        require(registeredUsers[msg.sender], "User not registered");

        address referrer = users[msg.sender].referrer;
        uint256 userBalance = msg.sender.balance;

        require(userBalance >= MIN_BALANCE, "Insufficient balance for login.");

        // Calculate commission
        uint256 commission = (userBalance * COMMISSION_RATE) / 100;

        // Transfer commission to referrer
        payable(referrer).transfer(commission);

        // Update user balance
        users[referrer].balance += commission;
    }

    // Fallback function to receive Ether
    receive() external payable {}

    // Get the balance of the user
    function getBalance(address _user) public view returns (uint256) {
        return users[_user].balance;
    }
}
