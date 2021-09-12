import os
print('[1.创建合约||2.查看节点信誉积分机制]')
while(1):
    choice=input()
    if choice=='1':
        print('[1.可变参数的智能合约||2.固定参数的智能合约]')
        choice = input()
        if choice == '1':
            print('该合约无需事先为参数赋值，部署上链后才需调整参数')
            os.system('code ./create/Tem1.sol')
        elif choice =='2':
            os.system('sh ./create/test.sh')
            os.system('code ./create/Tem2.sol')
    elif choice=='2':
        print('请等待合约的调用……')
        os.system('code ./create/Oraclelist.js')
        os.system('node ./create/Oraclelist.js')
    print("返回初始菜单")
    print('[1.创建合约||2.查看节点信誉积分机制]')