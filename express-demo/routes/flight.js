var express = require('express')

var router = express.Router()


const data = {
  value:'404',
  state:'null'
};
router.get("/",(req,res)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    res.send("这是第三方航班接口");
})

router.get("/getData",(req,res)=>{
    //res.send("此接口用于获取指定航班的信息");
                             
    var child_process = require("child_process");

//var date = '20210508';
var date = req.query.date;
//var id = 'CZ8882';
var id = req.query.id;
//code需要后台维护人员自行维护
var code = 'd7db43a3859841c392a27ebc1d2acdc9';
var curl = 'curl -i --get --include \'http://globlal.market.alicloudapi.com/ai_market/ai_airplane/get_global_airplane_info?DATE='+date+'&FLIGHT_ID='+id+'\'  -H \'Authorization:APPCODE '+code+'\'';

if(date==undefined||id==undefined||code==undefined){
data.value = '3';
data.state = '信息不全，无法查询';
res.send(data);
return;
}
//数据截取函数
function getCaption(obj){

var index=obj.lastIndexOf("\[");
obj=obj.substring(index,obj.length);
return obj;

}

var result = 404;
var child = child_process.exec(curl, function(err, stdout, stderr) {

//数据处理部分
stdout = getCaption(stdout);

var jsonstr = JSON.parse(stdout);

jsonstr = jsonstr[0];

//对预计时间进行操作
var cal1 = jsonstr.END_TIME+'';

if(cal1 == undefined){
data.state='接口出错了';
data.value = '3';
res.send(data);
return;
}

cal1 = cal1.replace(':','');

cal1 = cal1+"00";

//对实际时间进行操作
var cal2 = jsonstr.ACTUAL_END_TIME+'';

cal2 = cal2.substring(cal2.length-6);

//对两者结果进行操作

var result = cal2 - cal1;

if(result<=0){
data.state='航班没延迟';
data.value = '1';
res.send(data);
}
else{
data.state='航班延迟了';
data.value = '0';
res.send(data);
}
});
return;


})


router.get("/test",(req,res)=>{
    res.send("此处用于接口测试")
})

module.exports = router;
