// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./BioToken.sol";
import "./CasaNFT.sol";

contract RewardManager is AccessControl {
    BioToken public bioToken;
    CasaNFT public casaNFT;
    
    bytes32 public constant ACTIVITY_MANAGER_ROLE = keccak256("ACTIVITY_MANAGER_ROLE");
    
    struct Workshop {
        address host;
        uint256 date;
        uint256 participantCount;
        string topic;
        bool rewarded;
    }
    
    struct Volunteering {
        address volunteer;
        uint256 _hours;
        uint256 date;
        string description;
        bool rewarded;
    }
    
    mapping(bytes32 => Workshop) public workshops;
    mapping(bytes32 => Volunteering) public volunteerActivities;
    mapping(address => mapping(uint256 => bool)) public houseVerifications;
    
    event WorkshopRegistered(bytes32 workshopId, address host, string topic);
    volunteeringRegistered(bytes32 volunteeringId, address volunteer, uint256 _hours);
    event RewardsDistributed(address recipient, uint256 amount, string activityType);

    constructor(BioToken _bioToken, CasaNFT _casaNFT) {
        bioToken = _bioToken;
        casaNFT = _casaNFT;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ACTIVITY_MANAGER_ROLE, msg.sender);
    }

    function registerWorkshop(
        bytes32 workshopId,
        address host,
        uint256 date,
        string memory topic
    ) external onlyRole(ACTIVITY_MANAGER_ROLE) {
        workshops[workshopId] = Workshop({
            host: host,
            date: date,
            participantCount: 0,
            topic: topic,
            rewarded: false
        });
        
        emit WorkshopRegistered(workshopId, host, topic);
    }

    function addWorkshopParticipant(bytes32 workshopId, address participant) 
        external 
        onlyRole(ACTIVITY_MANAGER_ROLE) 
    {
        require(workshops[workshopId].host != address(0), "Workshop does not exist");
        workshops[workshopId].participantCount++;
        
        // Distribuir recompensa por asistencia
        bioToken.distributeReward(participant, "workshop_attendance");
        emit RewardsDistributed(participant, bioToken.rewardRates().workshopAttendance, "workshop_attendance");
    }

    function rewardWorkshopHost(bytes32 workshopId) 
        external 
        onlyRole(ACTIVITY_MANAGER_ROLE) 
    {
        Workshop storage workshop = workshops[workshopId];
        require(workshop.host != address(0), "Workshop does not exist");
        require(!workshop.rewarded, "Workshop already rewarded");
        
        workshop.rewarded = true;
        bioToken.distributeReward(workshop.host, "workshop_hosting");
        emit RewardsDistributed(workshop.host, bioToken.rewardRates().workshopHosting, "workshop_hosting");
    }

    function registerVolunteering(
        bytes32 volunteeringId,
        address volunteer,
        uint256 _hours,
        uint256 date,
        string memory description
    ) external onlyRole(ACTIVITY_MANAGER_ROLE) {
        volunteerActivities[volunteeringId] = Volunteering({
            volunteer: volunteer,
            _hours: _hours,
            date: date,
            description: description,
            rewarded: false
        });
        
        emit VolunteeringRegistered(volunteeringId, volunteer, _hours);
    }

    function rewardVolunteering(bytes32 volunteeringId) 
        external 
        onlyRole(ACTIVITY_MANAGER_ROLE) 
    {
        Volunteering storage activity = volunteerActivities[volunteeringId];
        require(activity.volunteer != address(0), "Volunteering does not exist");
        require(!activity.rewarded, "Volunteering already rewarded");
        
        activity.rewarded = true;
        bioToken.distributeReward(activity.volunteer, "volunteering");
        emit RewardsDistributed(activity.volunteer, bioToken.rewardRates().volunteering, "volunteering");
    }

    function verifyHouse(uint256 tokenId) external {
        require(casaNFT.ownerOf(tokenId) != address(0), "House NFT does not exist");
        require(!houseVerifications[msg.sender][tokenId], "Already verified this house");
        
        houseVerifications[msg.sender][tokenId] = true;
        bioToken.distributeReward(msg.sender, "house_verification");
        emit RewardsDistributed(msg.sender, bioToken.rewardRates().houseVerification, "house_verification");
    }
}