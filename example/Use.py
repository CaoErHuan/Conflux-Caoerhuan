import os
os.system('clear')
print("\033[33m========================= \033[0m")
print( "\033[32m作品功能演示脚本 \033[0m")
print( "\033[32mVer1.4 \033[0m")
print( "\033[32mCOPYRIGHT@ 曹二环 \033[0m")
print( "\033[33m========================= \033[0m")
print( "\033[33m功能列表： \033[0m")
print( "\033[32m1.物联网数据共享智能合约的生成 \033[0m")
print( "\033[32m2.节点信誉机制的展示 \033[0m")
print( "\033[32m3.智慧农场数据平台合约的调用 \033[0m")
print( "\033[32m4.智慧农场数据平台历史数据的查询 \033[0m")
print( "\033[32m5.预言机节点去中心化机制的展示 \033[0m")
print( "\033[32m6.传感器获取数据以及对数据进行加密 \033[0m")
print( "\033[32m7.云服务器接收请求并返回数据的界面展示 \033[0m")
print( "\033[32m8.云服务器解密脚本的执行演示 \033[0m")
print( "\033[32m9.图形界面演示平台的使用 \033[0m")
print( "\033[33m测试部分： \033[0m")
print( "\033[32m10.平台压力测试 \033[0m")
print("请输入对应的数字以执行演示：")
print( "\033[33m========================= \033[0m")
print( "\033[33m1:功能：平台的基本功能||2:功能:农场数据平台的使用||3:功能:保险平台的使用||4:功能:平台压力测试 \033[0m")
choice = input()
while(choice != 'end'):
    os.system('clear')
    if choice == '1':
        os.system('python3 ./create/start.py')
    elif choice == '2':
        os.system('python3 ./data/start.py')
    elif choice == '3':
        os.system('python3 ./flight/start.py')
    elif choice == '4':
        os.system('sh ./http_load.sh')
    print( "\033[33m1:功能：平台的基本功能||2:功能:农场数据平台的使用||3:功能:保险平台的使用||4:功能:平台压力测试 \033[0m")
    print( "\033[33m请输入对应的数字以执行演示： \033[0m")
    choice = input()
print("脚本执行完毕")
