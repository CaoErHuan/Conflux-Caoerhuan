#!/bin/bash
clear
echo  "\033[33m========================= \033[0m"
echo  "\033[33m智能合约生成程序 \033[0m"
echo  "\033[33mVer1.4 \033[0m"
echo  "\033[33mCOPYRIGHT@ RO_link \033[0m"
echo  "\033[33m========================= \033[0m"
###
echo  "\033[33m========================= \033[0m"
echo  "\033[32m请输入您的合约名称： \033[0m"
read Name
echo  "\033[32m请输入您的数据源URL： \033[0m"
read URL
echo  "\033[32m请输入您的数据路径： \033[0m"
read path
echo  "\033[32m请输入您选择的预言机合约地址： \033[0m"
read OracleAddress
echo  "\033[32m请输入对应的JobId： \033[0m"
read JobId
echo  "\033[33m========================= \033[0m"
###
cp ./create/Tem2.sol ./create/${Name}.sol
sed -i "s/@_oracleAddress/${OracleAddress}/g" ./create/${Name}.sol
sed -i "s/@NAME_OF_DATA/${path}/g" ./create/${Name}.sol
sed -i "s/@_JobId/${JobId}/g" ./create/${Name}.sol
sed -i "s!@_url!${URL}!g" ./create/${Name}.sol
echo  "\033[33m========================= \033[0m"
echo  "\033[33m合约已创建完成 \033[0m"
echo  "\033[33m========================= \033[0m"