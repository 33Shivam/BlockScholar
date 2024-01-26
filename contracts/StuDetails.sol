// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract StuDetails {
    // Create a structure for
    // student details
    struct Student {
        uint256 ID;
        string FirstName;
        string LastName;
        address payable Address;
    }

    //Define variables
    address stuAdd;
    mapping(uint256 => Student) internal stuRecords;
    Student[] internal student;

    // Create a function to add
    // the new records
    function addStuRecords(
        uint256 _ID,
        string memory _FirstName,
        string memory _LastName
    ) public {
        //error message if student try to enter using the same ID again
        require(
            stuRecords[_ID].ID != _ID,
            "____Student ID already registered and cannot be altered____"
        );
        // Get the student address
        stuAdd = msg.sender;

        //Add to array
        student.push(
            Student({
                ID: _ID,
                FirstName: _FirstName,
                LastName: _LastName,
                Address: payable(stuAdd)
            })
        );

        // Fetch the student details
        // with the student ID
        stuRecords[_ID] = Student(_ID, _FirstName, _LastName, payable(stuAdd));
    }

    //function to view the student array
    function getStuDetails(
        uint256 _ID
    )
        public
        view
        returns (uint256, string memory, string memory, address payable)
    {
        uint256 ID = stuRecords[_ID].ID;
        string memory FirstName = stuRecords[_ID].FirstName;
        string memory LastName = stuRecords[_ID].LastName;
        address payable Address = stuRecords[_ID].Address;
        return (ID, FirstName, LastName, Address);
    }
}
