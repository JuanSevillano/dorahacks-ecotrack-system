// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract BioToken is ERC20, ERC20Burnable, AccessControl, Pausable {
    bytes32 public constant REWARD_ROLE = keccak256("REWARD_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    
    // Estructura para tracking de recompensas por actividades
    struct ActivityReward {
        uint256 workshopAttendance;
        uint256 workshopHosting;
        uint256 volunteering;
        uint256 houseVerification;
    }
    
    ActivityReward public rewardRates;
    
    event RewardsDistributed(address indexed to, uint256 amount, string activityType);
    event RewardRatesUpdated(uint256 workshopAttendance, uint256 workshopHosting, uint256 volunteering, uint256 houseVerification);

    constructor(uint256 initialSupply) ERC20("BioToken", "BIO") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REWARD_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        
        _mint(msg.sender, initialSupply);
        
        // Establecer tasas iniciales de recompensa
        rewardRates = ActivityReward({
            workshopAttendance: 50 * 10**18, // 50 BIO
            workshopHosting: 200 * 10**18,   // 200 BIO
            volunteering: 100 * 10**18,      // 100 BIO
            houseVerification: 150 * 10**18  // 150 BIO
        });
    }

    function distributeReward(address to, string memory activityType) 
        external 
        onlyRole(REWARD_ROLE) 
        whenNotPaused 
    {
        uint256 rewardAmount = 0;
        
        if (keccak256(bytes(activityType)) == keccak256(bytes("workshop_attendance"))) {
            rewardAmount = rewardRates.workshopAttendance;
        } else if (keccak256(bytes(activityType)) == keccak256(bytes("workshop_hosting"))) {
            rewardAmount = rewardRates.workshopHosting;
        } else if (keccak256(bytes(activityType)) == keccak256(bytes("volunteering"))) {
            rewardAmount = rewardRates.volunteering;
        } else if (keccak256(bytes(activityType)) == keccak256(bytes("house_verification"))) {
            rewardAmount = rewardRates.houseVerification;
        } else {
            revert("Invalid activity type");
        }
        
        _mint(to, rewardAmount);
        emit RewardsDistributed(to, rewardAmount, activityType);
    }

    function updateRewardRates(
        uint256 workshopAttendance,
        uint256 workshopHosting,
        uint256 volunteering,
        uint256 houseVerification
    ) external onlyRole(GOVERNANCE_ROLE) {
        rewardRates.workshopAttendance = workshopAttendance;
        rewardRates.workshopHosting = workshopHosting;
        rewardRates.volunteering = volunteering;
        rewardRates.houseVerification = houseVerification;
        
        emit RewardRatesUpdated(
            workshopAttendance,
            workshopHosting,
            volunteering,
            houseVerification
        );
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}