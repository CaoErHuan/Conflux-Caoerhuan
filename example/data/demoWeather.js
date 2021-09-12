var Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider("ws://59.110.220.18:8546")
var web3 = new Web3(provider);
let address = "";
var blockNumber;

var myContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [],
		"name": "fulfillHumidity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "_temp",
				"type": "bytes32"
			}
		],
		"name": "fulfillTemperature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "geDateData",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_jobId",
				"type": "bytes32"
			}
		],
		"name": "requestTemperature",
		"outputs": [
			{
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "temperatureContractAddress",
				"type": "address"
			},
			{
				"name": "humidityContractAddress",
				"type": "address"
			},
			{
				"name": "xContractAddress",
				"type": "address"
			},
			{
				"name": "yContractAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "x",
				"type": "bytes32"
			}
		],
		"name": "bytes32ToString",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "date",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "humidity",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "temperature",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "y",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
],"0xa8BcaaDfe51A910Cf42b8D9C1394163F11984da2");


	web3.eth.getBlockNumber(function(err,res){
		if(!err){
			blockNumber = res;
			console.log("当前区块数："+res);
		}
	})
	
	web3.eth.getAccounts(function(err,res){
		if (!err){
			address = res[1] + "";
			console.log("当前账号地址："+address);
		}
		web3.eth.getBalance(address,function(err,res){
			if (!err){
				console.log("账号余额:"+web3.utils.fromWei(res));
			}
		});
		myContract.methods.fulfillHumidity().send({from:address}).then(function (res){
			var temperature;
			var humidity;
			var x;
			var y;
			var date;
			console.log("数据请求成功，以下为详细数据：");
			console.log("===================");
			myContract.methods.temperature().call({from:address}).then(function (res){
				temperature = res;
				console.log("temperature: " + temperature);
				myContract.methods.humidity().call({from:address}).then(function (res){
					humidity = res;
					console.log("humidity: " + humidity);
					myContract.methods.x().call({from:address}).then(function (res){
						x = res;
						console.log("x: " + x);
						myContract.methods.y().call({from:address}).then(function (res){
							y = res;
							console.log("y: " + y)
							myContract.methods.date().call({from:address}).then(function (res){
								date = res;
								console.log("date: " + date);
								console.log("===================");
								console.log("按下Ctrl+C，退出程序");
							})
						})
					})
				})
			})
		})
	})

