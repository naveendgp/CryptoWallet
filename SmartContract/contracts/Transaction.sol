// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract ReferralDapp {
    struct User {
        address referrer;
        string referralID;
    }

    mapping(address => User) public users;
    mapping(string => address) public referralIDToAddress;

    uint256 public registrationFee = 2500 * 10**18;  // Assuming token has 18 decimals
    uint256 public referrerBonus = 500 * 10**18;
    uint256 public companyShare = 2000 * 10**18;

    address public companyWallet;
    address public tokenAddress;
    uint256 public referralCounter = 1;

    event Registration(address user, string referralID, address referrer);

    IERC20 public token;

    constructor(address _companyWallet, address _tokenAddress) {
        companyWallet = _companyWallet;
        tokenAddress = _tokenAddress;
        token = IERC20(tokenAddress);
    }

    function generateReferralID() internal returns (string memory) {
        referralCounter++;
        return string(abi.encodePacked("REF", uint2str(referralCounter)));
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function register(string memory _referralID) public {
        require(users[msg.sender].referrer == address(0), "User already registered");
        require(token.balanceOf(msg.sender) >= registrationFee, "Insufficient token balance");

        address referrer = referralIDToAddress[_referralID];
        require(referrer != address(0), "Invalid referral ID");

        require(token.transferFrom(msg.sender, companyWallet, companyShare), "Company transfer failed");
        require(token.transferFrom(msg.sender, referrer, referrerBonus), "Referrer transfer failed");

        string memory newReferralID = generateReferralID();
        users[msg.sender] = User(referrer, newReferralID);
        referralIDToAddress[newReferralID] = msg.sender;

        emit Registration(msg.sender, newReferralID, referrer);
    }

    function getReferralID(address user) public view returns (string memory) {
        return users[user].referralID;
    }
}
