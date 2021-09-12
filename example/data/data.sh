#!/bin/bash
clear
echo  "\033[33m========================= \033[0m"
echo  "\033[32m物联网数据调用 \033[0m"
echo  "\033[32m传感器：DHT11, \033[0m"
echo  "\033[32m数据说明:获取到的数据包括：温度、湿度、经纬度、时间戳，共计5种数据 \033[0m"
echo  "\033[32mCOPYRIGHT@ RO_link \033[0m"
echo  "\033[33m========================= \033[0m"
echo  "\033[37m数据请求中…… \033[0m"
code ./data/demoWeather.js
node ./data/demoWeather.js
