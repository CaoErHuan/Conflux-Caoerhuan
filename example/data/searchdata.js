var Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider("ws://59.110.220.18:8546")
var web3 = new Web3(provider);
let address = "";

var myContract = new web3.eth.Contract([
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
		"inputs": [],
		"name": "getTemperatureData",
		"outputs": [
			{
				"name": "t",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_data",
				"type": "string"
			}
		],
		"name": "receiveData",
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
	}
],"0x337370577bE586B8dF9073bB92A41b70fBb5c8bE");

web3.eth.getAccounts(function(err,res){
    if (!err){
        address = res[1] + "";
        console.log("????????????????????????"+address);
    }
    web3.eth.getBalance(address,function(err,res){
        if (!err){
            console.log("?????????????????????"+web3.utils.fromWei(res));
        }
    });

    myContract.methods.getData().send({from:address}).then(function(receipt){
        console.log("??????????????????");
        myContract.events.receiveData({fromBlock:"0"},function(err,res){
            if(!err){
				//????????????????????????tran
                console.log("?????????????????????");
            } 
         })
         .on('data',function(event){
             //console.log("?????????: " + event.returnValues._data);
			 console.log(event);
         })
    });

     
    // web3.eth.sendTransaction({from:address,to:"0xaFED59f88aFF4586FF2075D721e940333dBa145D",value:10000000000000000000},function(err,res){
    //     if(!err){
    //         console.log(res);
    //     }
    // })

})