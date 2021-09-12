/*
******************************************************** 
Team:曹二环
Role:This script is used to accmulate chainlink nodes' points
Last update:2021/08/30
******************************************************** 
*/
//利用web3框架，连接区块链节点
var Web3 = require('web3')
const provider = new Web3.providers.WebsocketProvider('ws://59.110.220.18:8546')
var web3 = new Web3(provider)
var express = require('express')
var app = express()
const { exec } = require('child_process')

let address = ''

//维护的预言机节点信誉列表，value代表信誉积分，address为节点地址，是节点唯一的标识
var node = [
  { value: 100, address: '0x85266B67470315CD19e00415b1B0d61175852D07' },
  { value: 100, address: '0x1009718FbfB77efDab3d33b6cfdCaC69e6c39ae7' },
  { value: 100, address: '0x0C6a1775886ed15E18cfbEDA123C51D0419162fa' },
]

//监听的合约实例
var myContract = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [
        {
          name: '_requestId',
          type: 'bytes32',
        },
        {
          name: '_temp',
          type: 'bytes32',
        },
      ],
      name: 'fulfillfinalresult',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'getData',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'getresult',
      outputs: [
        {
          name: 't',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_jobId',
          type: 'bytes32',
        },
      ],
      name: 'requestfinalresult',
      outputs: [
        {
          name: 'requestId',
          type: 'bytes32',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_oracleAddress',
          type: 'address',
        },
        {
          name: '_JobId',
          type: 'string',
        },
        {
          name: '_url',
          type: 'string',
        },
        {
          name: '_path',
          type: 'string',
        },
      ],
      name: 'setoriginvalue',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'source',
          type: 'string',
        },
      ],
      name: 'stringToBytesVer2',
      outputs: [
        {
          name: 'result',
          type: 'bytes32',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'oracleAddress',
          type: 'address',
        },
        {
          indexed: false,
          name: 'url',
          type: 'string',
        },
        {
          indexed: false,
          name: 'path',
          type: 'string',
        },
        {
          indexed: false,
          name: 'finalresult',
          type: 'string',
        },
      ],
      name: 'upload',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'id',
          type: 'bytes32',
        },
      ],
      name: 'ChainlinkRequested',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'id',
          type: 'bytes32',
        },
      ],
      name: 'ChainlinkFulfilled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'id',
          type: 'bytes32',
        },
      ],
      name: 'ChainlinkCancelled',
      type: 'event',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'x',
          type: 'bytes32',
        },
      ],
      name: 'bytes32ToString',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'finalresult',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  '0x5033a54528eC5664A21Ad1F5E4f3D6cAD0eca703',
)

var result_ = 0
//输出区块链节点的具体信息
web3.eth.getAccounts(function (err, res) {
  if (!err) {
    address = res[1] + ''
    console.log('当前账号地址为：' + address)
  }
  web3.eth.getBalance(address, function (err, res) {
    if (!err) {
      console.log('该账号余额为：' + web3.utils.fromWei(res))
    }
  })
  //监听事件
  myContract.events
    .upload({ fromBlock: '0' }, function (err, res) {
      if (!err) {
        console.log('持续监听事件中')
      }
    })
    .on('data', function (event) {
      //console.log(event);
      console.log('使用的节点为: ' + event.returnValues.oracleAddress)
      var getData = node.find(function (nums) {
        return nums.address == event.returnValues.oracleAddress
      })
      getData.value++
      console.log(getData.value)
    })
})
/*{ address: '0x5033a54528eC5664A21Ad1F5E4f3D6cAD0eca703',                  //合约的具体地址
  blockNumber: 95934,														//事件发生时的区块数
  transactionHash:																
   '0x4cba48525f56763588f1ca47a5858e55a5f7bae952fe743bf3eb5f2aaf2368ff',	//交易哈希值
  transactionIndex: 0,
  blockHash:
   '0xd233bfa4f2625ef2b9b824a6ed22a41f46407c6c36bbac4fc38068259e954d2b',
  logIndex: 4,
  removed: false,
  id: 'log_1d5532bf',
  returnValues:																//事件返回值
   Result {																	//提供事件的结果信息，监听事件的重点
	 '0': '0x85266B67470315CD19e00415b1B0d61175852D07',
	 '1': 'http://47.93.102.224/other/getData',
	 '2': 'x',
	 '3': '119.556608',
	 oracleAddress: '0x85266B67470315CD19e00415b1B0d61175852D07',
	 url: 'http://47.93.102.224/other/getData',
	 path: 'x',
	 finalresult: '119.556608' },
  event: 'upload',
  signature:
   '0xbda31d2abcfc66b2a4cbd792516745c609664093e6234a70b2b52f87cce9e0bd',
  raw:
   { data:
	  '0x00000000000000000000000085266b67470315cd19e00415b1b0d61175852d07000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000022687474703a2f2f34372e39332e3130322e3232342f6f746865722f6765744461746100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a3131392e35353636303800000000000000000000000000000000000000000000',
	 topics:
	  [ '0xbda31d2abcfc66b2a4cbd792516745c609664093e6234a70b2b52f87cce9e0bd' ] } }*/

app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(node)
})

var name_ = 'Tem2'

app.get('/create', function (req, res) {
  name_ = req.query.name
  var url_ = req.query.url
  var path_ = req.query.path
  var address_ = req.query.address
  var jobid_ = req.query.jobid
  console.log(`各个参数为：${name_}、${url_}、${path_}、${address_}、${jobid_}`)
  //子命令集
  exec(`cp ./Tem2.sol ./${name_}.sol`)
  exec(` python3 repalce.py ${name_}.sol @_oracleAddress ${address_}`)
  exec(` python3 repalce.py ${name_}.sol @NAME_OF_DATA ${path_}`)
  exec(` python3 repalce.py ${name_}.sol @_JobId ${jobid_}`)
  exec(` python3 repalce.py ${name_}.sol @_url ${url_}`)
  //end
  res.header('Access-Control-Allow-Origin', '*')
  res.send('创建成功')
})

app.get('/download', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.download(`./${name_}.sol`)
})

app.listen(3515)
