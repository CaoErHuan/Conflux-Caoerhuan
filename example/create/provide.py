import requests

url = 'http://47.93.102.224/other/getData'
requests = requests.get(url)
print (requests.content)  # 返回字节形式