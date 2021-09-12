pragma solidity ^0.4.24;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.4/ChainlinkClient.sol";

contract Flight  is ChainlinkClient {
    address constant oracleAddress = 0x85266B67470315CD19e00415b1B0d61175852D07;
    bytes32 constant JobId = "91bb9bb9795249b19175adaf91ebd9a7";
    address constant linkAddress = 0xC64E8Ae217d72cd8cFdf321Db81227E0e05C9661;
    string url  = "http://47.93.102.224/flight/getData?date=";
    
    address owner;
    
    LinkTokenInterface internal LinkToken;
    
    string public state = "null";
    
    constructor() public {
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
        owner = msg.sender;
    }
    
    function getState(string _date,string _id) public {
        // url = url + _date + "&&id="" + _id;
        url = strConcat(url,_date);
        url = strConcat(url,"&&id=");
        url = strConcat(url,_id);
        // 发起Chainlink请求
        requestState(JobId);
        // temperature = getTemperatureData();
        // emit receiveData(temperature);
    }
    
    function compensate() public {
        // require(msg.sender == owner);
        require(keccak256(state) != keccak256("null"));
        if (keccak256(state) == keccak256("1")){
            msg.sender.transfer(1000000000000000000);  // 0.1ETH
        }else {
            return;
        }
        
    }
    
    function burn() public {
        require (owner == msg.sender);
        owner = address(0x0);
    }
    
    function requestState(bytes32 _jobId) public returns (bytes32 requestId) {
      
        Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillFlight.selector);
        req.add("get", url);
        req.add("path", "value");
        requestId = sendChainlinkRequest(req, 1 * LINK);

        return requestId;
  }
  
    function fulfillFlight(bytes32 _requestId, bytes32 _temp)
        public recordChainlinkFulfillment(_requestId)
    {
        state = bytes32ToString(_temp);
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
    
    function strConcat(string _a, string _b) internal pure returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ret = new string(_ba.length + _bb.length);
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(ret);
   }  
  
    function () public payable {}

}