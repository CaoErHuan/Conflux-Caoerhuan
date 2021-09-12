import os
print('[1.查询传感器数据||2.查询历史数据]')
while(1):
    choice=input()
    if choice=='1':
        os.system("code ./data/demoWeather.js")
        os.system("sh ./data/data.sh")
    elif choice=='2':
        os.system('code ./data/searchdata.js')
        os.system('sh ./data/history.sh')
    print("返回初始菜单")
    print('[1.查询传感器数据||2.查询历史数据]')