$(function (){
    $('#state').css("color","red");
    $('#state').empty();
    $('#output').empty();
    const res = "登录状态： 已退出！";
    $('#state').append(res);
})
    var checkKey;
    $("#register").click(function () {
    var web3Provider;
    // console.log(window.ethereum);
    if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
    // 请求用户授权
    window.ethereum.enable();
} catch (error) {
    // 用户不授权时
    console.error("User denied account access")
}
}
    web3 = new Web3(web3Provider);//构建web3实例
    console.log(web3Provider);

    web3.eth.getAccounts(function (error, result) {
    if (!error) {
    checkKey = "" + result;
}
    $('#state').empty();
    $('#state').css("color","#3c763d");
    const res = "登录状态： 已登录！";
    $('#state').append(res);
    // alert("您已经成功登录，账号为" + checkKey);
    //   $('#output').empty();
    //   const res = "您已经成功登录，账号为: " + checkKey;
    //   $('#output').append(res);
});//监测是否登录了钱包
});
    $('#getInfo').click(function (){
    $('#output').empty();
    let result;
    if (checkKey){
    result = "您已经成功登录，账号为: " + "\""+ checkKey +"\"" + '<br>';
    $('#output').append(result);
    web3.eth.getChainId(function (err,res){
    console.log(res);
    if(!err){
    result = "当前连接的ChainID：" +'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+ "\""+res+"\"" + '<br>';
    $('#output').append(result);
}
    else{
    alert("any error happen!");
}
});
    web3.eth.getBalance(checkKey,function (err,res){
    if(!err){
    res = web3.utils.fromWei(res,'ether');
    result = "当前的账户余额：" +'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp' +'&nbsp'+'&nbsp'
    +'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+ res + ' ether' + '<br>';
    $('#output').append(result);
}
    else{
    alert("any error happen!");
}
});
}
    else{
    result = "请确认您的登录状态!"
    $('#output').append(result);
}

    $('#logout').click(function (){
    $('#state').css("color","red");
    checkKey = undefined;
    $('#state').empty();
    $('#output').empty();
    const res = "登录状态： 已退出！";
    $('#state').append(res);
})
});