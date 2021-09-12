tar xfz http_load-09Mar2016.tar.gz
cd http_load-09Mar2016/
make && sudo make install
echo "测试程序已安装成功，接下来是测试环境，请等候结果："
echo "\033[33m=========结果============ \033[0m"
echo " "
http_load -parallel 10 -seconds 10  ../url.txt
echo " "
echo "\033[33m=========结果============ \033[0m"
