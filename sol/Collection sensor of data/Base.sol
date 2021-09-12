/*
******************************************************** 
Team:曹二环
Role:This smart constract is used to collect sensor of data
Last update:2021/08/25
******************************************************** 
*/

pragma solidity 0.4.24;

contract Base {
    //预言机合约的地址
    address constant oracleAddress = 0x85266B67470315CD19e00415b1B0d61175852D07;
    //chainlink的jobid
    bytes32 constant JobId = "91bb9bb9795249b19175adaf91ebd9a7";
    //linkToken的地址
    address constant linkAddress = 0xC64E8Ae217d72cd8cFdf321Db81227E0e05C9661;
    //数据源API的地址
    string url  = "http://47.93.102.224/other/getData";
    //bytes32转换成string的函数
    function bytes32ToString(bytes32 x) public pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
}