const express = require(`express`)
const router = express.Router()


const data = {
        temperature:'null',
        humidity:'null',
        x:'null',
        y:'null',
        date:'null',
    };

router.use((req, res, next) => {
  console.log(`路由执行成功啦~~~`, Date.now());
  next()
})


router.get(`/getData`, (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin','*')//设置响应头，设置允许跨域
    //设置响应体
    //将对象进行字符串转换
    //let str = JSON.stringify(data);
    //response.send(str);
    console.log("接收到一个访问");
    //var num_t = request.query.number;

    if(request.query.number_c!=undefined&&request.query.number_e!=undefined&&request.query.h_c!=undefined&&request.query.h_e!=undefined&&request.query.x!=undefined&&request.query.y!=undefined&&request.query.t!=undefined){

        var command = "python3 test.py";
        command += " "+request.query.number_c;
        command += " "+request.query.number_e;
        data.temperature = child.execSync(command).toString();
        data.temperature = data.temperature.replace(/\n/g,"")
        //console.log("temperature:"+data.temperature);

        command = "python3 test.py";
        command += " "+request.query.h_c;
        command += " "+request.query.h_e;
        data.humidity = child.execSync(command).toString();
        data.humidity = data.humidity.replace(/\n/g,"")

        data.x = request.query.x;
        data.y = request.query.y;
        data.date = request.query.t;

        console.log(data.temperature,data.humidity,data.x,data.y,data.date);
        //console.log("temperature:"+data.temperature);
    }else{
        console.log("数据成功发送");
    }
    response.json(data);
})

router.get(`/data`, (req, res, next) => {
    res.json({
        status: 200,
        data: [1, 2, 3, 4, 5, 6, 7]
    })
})

module.exports = router
