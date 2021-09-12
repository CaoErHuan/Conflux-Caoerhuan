import os
print('[1.合约的部署||2.合约的调用]')
while(1):
    choice=input()
    if choice=='1':
        os.system('echo "请手动调用deploy_Fight.js"')
    elif choice=='2':
        os.system('echo "功能暂未开放"')
    print("返回初始菜单")
    print('[1.合约的部署||2.合约的调用]')