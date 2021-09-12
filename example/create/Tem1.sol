//已经部署的地址：0x5033a54528eC5664A21Ad1F5E4f3D6cAD0eca703
pragma solidity 0.4.24;
import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.4/ChainlinkClient.sol";

contract getIOTData is ChainlinkClient {
  LinkTokenInterface internal LinkToken;
  //合约各个参数的声明
  address constant linkAddress = 0xC64E8Ae217d72cd8cFdf321Db81227E0e05C9661;
  address  oracleAddress;         //预言机节点的地址
  bytes32  JobId;                 //预言机节点执行工作流程的标识
  string url;                     //数据源API的网络地址
  string path;                    //目标数据在数据源中的具体路径
  string public finalresult;      //最终结果
  //返回结果
  function getresult() public returns (string t){
      return finalresult;
  }
  //改变合约参数，需要传值
  function setoriginvalue(address  _oracleAddress,string _JobId,string _url,string _path) public {
    //赋值
    oracleAddress = _oracleAddress;
    JobId = stringToBytesVer2(_JobId);
    url  = _url;
    path = _path;
    setChainlinkToken(linkAddress);
    setChainlinkOracle(oracleAddress);
    LinkToken = LinkTokenInterface(linkAddress);
  }
  //事件，用于触发节点记录日志
  event upload(address oracleAddress,string url,string path,string finalresult);
  //获取最终结果
  function getData() public returns(string){
    
    // 发起Chainlink请求
    requestfinalresult(JobId);
    finalresult = getresult();
    emit upload(oracleAddress,url,path,finalresult);
    return finalresult;
  }

  //发送获取数据的请求
  function requestfinalresult(bytes32 _jobId) public returns (bytes32 requestId) {
    //配置请求的参数
    Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfillfinalresult.selector);
    req.add("get", url);                               //要请求的接口地址
    req.add("path", path);                             //数据在数据源中的路径
    requestId = sendChainlinkRequest(req, 1 * LINK);   //请求数据需要的费用
    return requestId;                                
  }

  //传回请求的数据
  function fulfillfinalresult(bytes32 _requestId, bytes32 _temp)
    public recordChainlinkFulfillment(_requestId)
  {
    //对结果进行格式转换
    finalresult = bytes32ToString(_temp);
  }
  //用于转换数据格式
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
    //用于转换数据格式
    function stringToBytesVer2(string memory source) returns (bytes32 result) {
        assembly {
        result := mload(add(source, 32))
    }
}
}