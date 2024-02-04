// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;
import "./StuDetails.sol";

contract ScholarDetails {
    //Get the addresses of another 3 contracts
    address StuContractAdd;
    address payable StaffContractAdd;

    constructor(address _StuContractAdd) payable {
        StuContractAdd = _StuContractAdd;
    }

    function storeContractAdd(address payable _StaffContractAdd) public {
        StaffContractAdd = _StaffContractAdd;
    }

    //This is mandatory for receiving ETH
    event ReceivedEth(uint256 amount);

    receive() external payable {
        emit ReceivedEth(msg.value);
    }

    fallback() external payable {
        emit ReceivedEth(msg.value);
    }

    //view the amount converted
    // function viewGBPWEI(uint256 _number) public view returns (uint256) {
    //     uint256 price = p.getGBPWEI(_number);
    //     return price;
    // }

    // defining scholarship details struct
    struct Scholarship {
        uint256 ID;
        string ScholarshipName;
        uint256 Amount;
        address Provider;
        uint256 Attendance;
        uint256 AvgMark;
        string Status;
    }
    //Define variables
    address payable provAdd;
    string Status;
    mapping(uint256 => Scholarship) internal schlRecords;
    Scholarship[] internal scholarship;

    // Create a function to add
    // the new scholarship records
    function addSchlRecords(
        uint256 _ID,
        string memory _ScholarshipName,
        uint256 _Amount,
        uint256 _Attendance,
        uint256 _AvgMark
    ) public payable {
        //Convert the amount from GBP to wei
        // PriceConversion p = PriceConversion(PriceContractAdd);
        uint256 cvrAmt = (_Amount) * 1000000000000000000;

        //Show error if there is not enough balance to offer the scholarship
        require(
            cvrAmt <= address(this).balance,
            "____This wallet does not have enough balance to offer the scholarship____"
        );

        //Get the student ID stored on student contract
        uint256 stuID;
        StuDetails stu = StuDetails(StuContractAdd);
        (stuID, , , ) = stu.getStuDetails(_ID);

        //Show error if the student is not found
        require(_ID == stuID, "____The student ID entered is not found____");

        // Get the provider address
        provAdd = payable(msg.sender);
        //Set the default scholarship status as true
        Status = "active";

        //Add to array
        scholarship.push(
            Scholarship({
                ID: _ID,
                ScholarshipName: _ScholarshipName,
                Amount: cvrAmt,
                Provider: provAdd,
                Attendance: _Attendance,
                AvgMark: _AvgMark,
                Status: Status
            })
        );

        // Fetch the sscholarship details
        // using the student ID
        schlRecords[_ID] = Scholarship(
            _ID,
            _ScholarshipName,
            cvrAmt,
            provAdd,
            _Attendance,
            _AvgMark,
            Status
        );

        //send the scholarship amount to staff contract for payment disbursement
        StaffContractAdd.transfer(cvrAmt);
    }

    //function to cancel scholarship
    function cancelScholarship(uint256 _ID) public {
        Scholarship storage _scholarship = schlRecords[_ID];
        //Show error if the student is not found
        require(
            _ID == _scholarship.ID,
            "____The student ID entered is either not found or no scholarship____"
        );
        //only same address can cancel the scholarship
        require(
            _scholarship.Provider == msg.sender,
            "____Only scholarship owner can cancel the scholarship____"
        );
        //only can cancel active scholarship
        require(
            keccak256(abi.encodePacked(_scholarship.Status)) ==
                keccak256(abi.encodePacked(Status)),
            "____The scholarship is already cancelled, no further cancelation needed____"
        );
        _scholarship.Status = "pending_refund";
    }

    //function to view the scholarship array
    function getSchlDetails(
        uint256 _ID
    )
        public
        view
        returns (
            uint256,
            uint256,
            address payable,
            uint256,
            uint256,
            string memory
        )
    {
        uint256 ID = schlRecords[_ID].ID;
        uint256 Amount = schlRecords[_ID].Amount;
        address payable Provider = payable(schlRecords[_ID].Provider);
        uint256 Attendance = schlRecords[_ID].Attendance;
        uint256 AvgMark = schlRecords[_ID].AvgMark;
        string memory Stat = schlRecords[_ID].Status;
        return (ID, Amount, Provider, Attendance, AvgMark, Stat);
    }

    function getSchlDetailsFrontend(
        uint256 _ID
    ) public view returns (uint256, string memory, string memory) {
        uint256 Amount = schlRecords[_ID].Amount;
        string memory ScholarshipName = schlRecords[_ID].ScholarshipName;
        string memory Stat = schlRecords[_ID].Status;
        return (Amount, ScholarshipName, Stat);
    }

    function getSchlRemaining() public view returns (uint256) {
        return address(this).balance;
    }

    //function to get the scholarship status
    function getStatus(uint256 _ID) public view returns (string memory) {
        string memory Stat = schlRecords[_ID].Status;
        return Stat;
    }

    //function to update the scholarship status to cancel
    function updStatCancel(uint256 _ID) public {
        Scholarship storage _scholarship = schlRecords[_ID];
        _scholarship.Status = "cancel";
    }

    //function to update the scholarship status to paid
    function updStatPaid(uint256 _ID) public {
        Scholarship storage _scholarship = schlRecords[_ID];
        _scholarship.Status = "paid";
    }

    //function to update the scholarship status to failed
    function updStatFailed(uint256 _ID) public {
        Scholarship storage _scholarship = schlRecords[_ID];
        _scholarship.Status = "failed";
    }

    //function to update the scholarship status to active
    function updStatActive(uint256 _ID) public {
        Scholarship storage _scholarship = schlRecords[_ID];
        _scholarship.Status = "active";
    }
}
