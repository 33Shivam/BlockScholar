// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract SampleContract {
    int32 myUint;

    function setter(int32 _myUint) public {
        myUint = _myUint;
    }
}
