/*
******************************************************** 
Team:曹二环
Role:This smart constract is a template
Last update:2021/07/27
******************************************************** 
*/
pragma solidity 0.4.24;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.4/ChainlinkClient.sol";

contract getIOTData is ChainlinkClient {
    LinkTokenInterface internal LinkToken;

    address constant linkAddress = 0xC64E8Ae217d72cd8cFdf321Db81227E0e05C9661;
    address oracleAddress;
    bytes32 JobId;
    string url;
    string path;
    string public finalresult;

    function getresult() public returns (string t) {
        return finalresult;
    }

    function setoriginvalue(
        address _oracleAddress,
        string _JobId,
        string _url,
        string _path
    ) public {
        oracleAddress = _oracleAddress;
        JobId = stringToBytesVer2(_JobId);
        url = _url;
        path = _path;
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
    }

    event upload(
        address oracleAddress,
        string url,
        string path,
        string finalresult
    );

    function getData() public returns (string) {
        // 发起Chainlink请求
        requestfinalresult(JobId);
        finalresult = getresult();
        emit upload(oracleAddress, url, path, finalresult);
        return finalresult;
    }

    function requestfinalresult(bytes32 _jobId)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory req = buildChainlinkRequest(
            _jobId,
            this,
            this.fulfillfinalresult.selector
        );

        req.add("get", url);
        req.add("path", path);

        requestId = sendChainlinkRequest(req, 1 * LINK);

        return requestId;
    }

    function fulfillfinalresult(bytes32 _requestId, bytes32 _temp)
        public
        recordChainlinkFulfillment(_requestId)
    {
        finalresult = bytes32ToString(_temp);
        //data = _temp;
    }

    function bytes32ToString(bytes32 x) public pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint256 charCount = 0;
        for (uint256 j = 0; j < 32; j++) {
            bytes1 char = bytes1(bytes32(uint256(x) * 2**(8 * j)));
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

    function stringToBytesVer2(string memory source) returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }
}
