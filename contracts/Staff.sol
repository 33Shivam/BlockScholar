// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./StudentDetailsContract.sol";
import "./SchlorshipshipDistribution.sol";

contract Staff{

	//get the other 2 contract addresses
	address StuContractAdd;
	address payable SchlContractAdd;

	constructor (address _StuContractAdd, address _SchlContractAdd) payable {
		StuContractAdd = _StuContractAdd;
		SchlContractAdd = payable(_SchlContractAdd);
	}

	//This is mandatory for receiving ETH
    event ReceivedEth(uint256 amount);

    receive() external payable  { 
        emit ReceivedEth(msg.value);
    }

    fallback() external payable {
        emit ReceivedEth(msg.value);
    }

	// defining result details struct
    struct Result {
		uint256 ID;
        uint256 Attendance;
		uint256 AvgMark;
    }

	//define variables
	uint256 id;
	address payable receiver;
	address payable provider;
	uint256 payAmt;
	string status;
	mapping(uint256 => Result) internal rsltRecords;
	Result[] internal result;

	// Create a function to staff to add
	// the student result
	function resultNpay(uint256 _ID,
						uint256 _Attendance,
						uint256 _AvgMark) payable public
	{
		//Add to array
		result.push(Result({ID: _ID, Attendance: _Attendance, 
									AvgMark: _AvgMark}));
		// Fetch the result details
		// using the student ID
		rsltRecords[_ID] = Result(_ID, _Attendance, 
									_AvgMark);

		//variables to capture info from Scholarship contract
		uint256 reqAtt;
		uint256 reqMark;

		//Get required info from Student contract
		StuDetails stu = StuDetails(StuContractAdd);
		(, , , receiver) = stu.getStuDetails(_ID);

		//Get required info from Scholarship contract
		ScholarDetails sc = ScholarDetails(SchlContractAdd);
		(id, payAmt, , reqAtt, reqMark, status) = sc.getSchlDetails(_ID);

		//error message if no student ID found either in student or scholarhsip contract
		require(_ID == id, "____The student ID entered is either not found or no scholarship____");
		//scholarship need to be active for the payment disbursement
		require(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked('active')), "____The scholarship is not active____");

		//check is the attendance and mark meet the requirements from scholarhsip provider
		//if failed
		if (reqAtt > _Attendance || reqMark > _AvgMark) {
			//Update the status to failed
			sc.updStatFailed(_ID);
		} else {
			//if pass
			require(payAmt <= address(this).balance,"____This wallet does not have enough balance to pay to student____");
        	receiver.transfer(payAmt);

			//Update the status to paid
			sc.updStatPaid(_ID);
		}
	}

	//function to return the ETH back to provider if provider cancel the scholarship
	function processRefund(uint256 _ID) payable public {
	
		//Get required info from Scholarship contract
		ScholarDetails sc = ScholarDetails(SchlContractAdd);
		(id, payAmt, provider, , ,status) = sc.getSchlDetails(_ID);

		//Make sure the ID has scholarship record
		require(_ID == id, "____The student ID entered is either not found or no scholarship____");

		//Make sure the scholarship is pending refund
		require(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked('pending_refund')), "____No refund pending____");
        
		//Make sure there is enough money for refund
		require(payAmt <= address(this).balance,"____This wallet does not have enough balance to perform refund____");

		//perform refund back to provider address
        provider.transfer(payAmt);

		//Update the status to cancel
		sc.updStatCancel(_ID);
    } 

	//function to activate back failed scholarship
	function processActivation(uint256 _ID) public {
	
		//Get required info from Scholarship contract
		ScholarDetails sc = ScholarDetails(SchlContractAdd);
		(id, payAmt, , , ,status) = sc.getSchlDetails(_ID);

		//Make sure the ID has scholarship record
		require(_ID == id, "____The student ID entered is either not found or no scholarship____");

		//Make sure the scholarship is failed
		require(keccak256(abi.encodePacked(status)) == keccak256(abi.encodePacked('failed')), "____The scholarship is not in failed status, no activation required____");

		//Update the status to active
		sc.updStatActive(_ID);
    } 

	//function to view the scholarship status in order to return correct messaging on frontend
	function viewStatus(uint256 _ID) public view returns(string memory) {
		//Get status info from Scholarship contract
		ScholarDetails sc = ScholarDetails(SchlContractAdd);
		string memory Stat = sc.getStatus(_ID);
		return Stat;
	}

}