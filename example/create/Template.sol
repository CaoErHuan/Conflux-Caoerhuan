pragma solidity 0.4.24;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.4/ChainlinkClient.sol";

contract Template is ChainlinkClient {
    /* --------------------- YOU SHOULD REPLACE ALL NAME_OF_DATA TO YOUR IOT DATA NAME ---------------------
       --------------------------------------- HAVE A GOOD LUCKY ------------------------------------------- */
    /*
    ---------------------------------------------------------------------------
    -        WELCOME TO 基于分布式预言机与区块链的物联网关键数据共享平台          -
    -                     this is a contract Template                         -
    -                     you can replace whatever                            -
    -                     NOW ENJOY IT                                        -
    -                                                COPYRIGHT@ RO_link       -
    ---------------------------------------------------------------------------
    */
    string  private url;   // IT SHOULD BE A JSON-TYPR DATE INTERFACE
    
    address private oracleAddress; // YOUR_ORACLE_ADDRESS
    bytes32 private JobId;         // YOU_JOBID
    address private linkAddress = 0xC64E8Ae217d72cd8cFdf321Db81227E0e05C9661;
    event receiveData(string _data);   // DECLARE A EVENT 
    
    constructor() public {
        // transfer parameters YOUR_ORACLE_ADDRESS,YOU_CHAINLINK_NODE_JOBID,YOUR_DATA_URL
        oracleAddress = @_oracleAddress;
        JobId = @_JobId;
        url = @_url;
    }
    
    string public NAME_OF_DATA;
    
    function getNAME_OF_DATA() public returns (string feedback){
        return NAME_OF_DATA;
    }
    
    function getData() public returns(string){
        // SEND A Chainlink REQUSET
        requestData(JobId);
        NAME_OF_DATA = getNAME_OF_DATA();
        emit receiveData(NAME_OF_DATA);  // EMIT A EVENT
        return NAME_OF_DATA;
    }
  
    function requestData(bytes32 _jobId) public returns (bytes32 requestId) {
      
        Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillNAME_OF_DATA.selector);

        req.add("get", url);
        req.add("path", "@NAME_OF_DATA"); // YOUR_JSON_NAME_KEY

        requestId = sendChainlinkRequest(req, 1 * LINK);

        return requestId;
    }


    function fulfillNAME_OF_DATA(bytes32 _requestId, bytes32 _temp)
        public recordChainlinkFulfillment(_requestId)
    {
        NAME_OF_DATA = bytes32ToString(_temp);
        //data = _temp;
    }
  
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