/*
******************************************************** 
Team:曹二环
Role:This smart constract is used to collect sensor of data
Last update:2021/08/25
******************************************************** 
*/
pragma solidity 0.4.24;
import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.4/ChainlinkClient.sol";
import "./Base.sol";

contract getTemperature is ChainlinkClient, Base {

  LinkTokenInterface internal LinkToken;
  string public temperature;

  constructor() public {
    setChainlinkToken(linkAddress);
    setChainlinkOracle(oracleAddress);
    LinkToken = LinkTokenInterface(linkAddress);
  }

  function getTemperatureData() public returns (string t){
      return temperature;
  }

  //请求数据
  function getData() public returns(string){
    // 发起Chainlink请求
    requestTemperature(JobId);
    temperature = getTemperatureData();
    return temperature;
  }

  function requestTemperature(bytes32 _jobId) public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillTemperature.selector);
    req.add("get", url);
    req.add("path", "temperature");
    requestId = sendChainlinkRequest(req, 1 * LINK);
    return requestId;
  }

  function fulfillTemperature(bytes32 _requestId, bytes32 _temp) public recordChainlinkFulfillment(_requestId){
    temperature = bytes32ToString(_temp);
  }
  
}




contract getHumidity is Base,ChainlinkClient {
    LinkTokenInterface internal LinkToken;
    
    getTemperature temperatureContract;
    
    constructor(address temperatureContractAddress) public{
        temperatureContract = getTemperature(temperatureContractAddress);
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
    }
    
    string public humidity;
    string public temperature;
    
    function fulfillHumidity() public {
        temperature = temperatureContract.getData();
        getData();
    }
      function getHumidityData() public returns (string t){
      return humidity;
  }

  function getData() public returns(string){
    // 发起Chainlink请求
    requestTemperature(JobId);
    humidity = getHumidityData();
    return humidity;
  }


  function requestTemperature(bytes32 _jobId) public returns (bytes32 requestId) {
      
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillTemperature.selector);
    req.add("get", url);
    req.add("path", "humidity");

    requestId = sendChainlinkRequest(req, 1 * LINK);

    return requestId;
  }

  function fulfillTemperature(bytes32 _requestId, bytes32 _temp) public recordChainlinkFulfillment(_requestId)
  {
    humidity = bytes32ToString(_temp);
    //data = _temp;
  }
  
}
 

 
contract getX is Base,ChainlinkClient {
     LinkTokenInterface internal LinkToken;
     
    getTemperature temperatureContract;
    getHumidity humidityContract;
    
    
    constructor(address temperatureContractAddress,address humidityContractAddress) public{
        temperatureContract = getTemperature(temperatureContractAddress);
        humidityContract = getHumidity(humidityContractAddress);
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
        // temperature = temperatureContract.temperature();
    }
    
    string public humidity;
    string public temperature;
    string public x;
    
    function fulfillHumidity() public {
        temperature = temperatureContract.getData();
        humidity = humidityContract.getData();
        // temperature = temperatureContract.getTemperature();
        getData();
    }
    function getXData() public returns (string){
      return x;
    }

  function getData() public returns(string){
    // 发起Chainlink请求
    requestTemperature(JobId);
    x = getXData();
    return x;
  }


  function requestTemperature(bytes32 _jobId) public returns (bytes32 requestId) {
      
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillTemperature.selector);

    req.add("get", url);
    req.add("path", "x");

    requestId = sendChainlinkRequest(req, 1 * LINK);

    return requestId;
  }


  function fulfillTemperature(bytes32 _requestId, bytes32 _temp)
    public recordChainlinkFulfillment(_requestId)
  {
    x = bytes32ToString(_temp);
    //data = _temp;
  }
  
}

contract getY is Base,ChainlinkClient{
     LinkTokenInterface internal LinkToken;
     
    getTemperature temperatureContract;
    getHumidity humidityContract;
    getX xContract;
    
    
    constructor(address temperatureContractAddress,address humidityContractAddress,address xContractAddress) public{
        temperatureContract = getTemperature(temperatureContractAddress);
        humidityContract = getHumidity(humidityContractAddress);
        xContract = getX(xContractAddress);
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
        // temperature = temperatureContract.temperature();
    }
    
    string public humidity;
    string public temperature;
    string public x;
    string public y;
    
    function fulfillHumidity() public {
        temperature = temperatureContract.getData();
        humidity = humidityContract.getData();
        x = xContract.getData();
        // temperature = temperatureContract.getTemperature();
        getData();
    }
    function getYData() public returns (string){
        return y;
    }

  function getData() public returns (string){
    // 发起Chainlink请求
    requestTemperature(JobId);
    y = getYData();
    return y;
  }


  function requestTemperature(bytes32 _jobId) public returns (bytes32 requestId) {
      
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillTemperature.selector);

    req.add("get", url);
    req.add("path", "y");

    requestId = sendChainlinkRequest(req, 1 * LINK);

    return requestId;
  }


  function fulfillTemperature(bytes32 _requestId, bytes32 _temp)
    public recordChainlinkFulfillment(_requestId)
  {
    y = bytes32ToString(_temp);
    //data = _temp;
  }
  
}




contract getDate is Base,ChainlinkClient {
     LinkTokenInterface internal LinkToken;
     
    getTemperature temperatureContract;
    getHumidity humidityContract;
    getX xContract;
    getY yContract;
    
    
    constructor(address temperatureContractAddress,address humidityContractAddress,address xContractAddress,address yContractAddress) public{
        temperatureContract = getTemperature(temperatureContractAddress);
        humidityContract = getHumidity(humidityContractAddress);
        xContract = getX(xContractAddress);
        yContract =getY(yContractAddress);
        setChainlinkToken(linkAddress);
        setChainlinkOracle(oracleAddress);
        LinkToken = LinkTokenInterface(linkAddress);
        // temperature = temperatureContract.temperature();
    }
    
    string public humidity;
    string public temperature;
    string public x;
    string public y;
    string public date;
    
    function fulfillHumidity() public {
        temperature = temperatureContract.getData();
        humidity = humidityContract.getData();
        x = xContract.getData();
        y = yContract.getData();
        getData();
    }
    function geDateData() public returns (string){
        return date;
    }

  function getData() public returns (string){
    // 发起Chainlink请求
    requestTemperature(JobId);
    date = geDateData();
    return date;
  }


  function requestTemperature(bytes32 _jobId) public returns (bytes32 requestId) {
      
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillTemperature.selector);
    req.add("get", url);
    req.add("path", "date");
    requestId = sendChainlinkRequest(req, 1 * LINK);

    return requestId;
  }


  function fulfillTemperature(bytes32 _requestId, bytes32 _temp)
    public recordChainlinkFulfillment(_requestId)
  {
    date = bytes32ToString(_temp);
  }
  
}

