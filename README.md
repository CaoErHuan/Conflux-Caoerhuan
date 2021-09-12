# Conflux北斗计划：曹二环队伍项目文档



![图片1.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/%E5%9B%BE%E7%89%871.png?raw=true)

## 项目说明

该项目为2021年度Conflux北斗计划，队伍“曹二环”的作品。

作品名为“基于分布式预言机与区块链的物联网关键数据共享平台“。目的在于通过参与Conflux北斗计划，学习区块链开发，并探索基于区块链+预言机的物联网数据传输解决方案。

项目**基于Conflux测试链而构建**，但Chainlink项目与Conflux链的技术结合进度仍在进行中，因此为保证项目的可行性，在项目演示部分，我们将项目**暂时**运行在了以太坊测试网络，**后期开发过程中会努力将项目完全移植到Conflux链上。**

## 功能介绍

### 1、API数据的上链与查询

本项目的第一个功能是"利用项目组搭建的以太坊私有链以及chainlink，实现API数据的上链、保存与查询"

图示如下：

这是一个API示例。我们可以通过项目，将API中的任意数据上链并查询。

### 2、智能合约的生成

本项目的第二个功能是“利用作品，通过指定对应参数的形式，实现智能合约的生成”

图示如下：

![image-20210912154313087.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/image-20210912154313087.png?raw=true)

通过输入指定的参数，来实现合约的生成。

### 3、访问web界面

平台后期开发了web界面，提供数据源的查看以及合约的创建、预言机节点积分信息的查询：

![image-20210912154443837.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/image-20210912154443837.png?raw=true)



![image-20210912154510100.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/image-20210912154510100.png?raw=true)



### 3、基于平台的两个应用demo

平台的功能比较基础，为了展示平台在具体领域的应用，项目还做了两个简易的demo：

1. 农场数据平台（获取线下传感器的温度湿度等数据，并显示在网页的地图上）

![image-20210912154821251.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/image-20210912154821251.png?raw=true)

2. 航班延误险理赔平台（获取航班API的信息，来判断是否航班延误，并利用智能合约进行理赔）

![image-20210912154711218.png](https://github.com/CaoErHuan/Conflux-Caoerhuan/blob/master/readmeimage/image-20210912154711218.png?raw=true)

## 代码目录介绍

### "chainlink-develop"文件夹

开源预言机项目chainlink的源代码

### “sol”文件夹

里面包含了共计五个智能合约。

* Base.sol：获取温湿度传感器数据的第一个合约
* getTemperature.sol：获取温湿度传感器数据的第二个合约
* flight.sol：实现航班平台功能的智能合约
* tem(1).sol：用于用户创建智能合约的模板1
* tem(2).sol：用于用户创建智能合约的模板2

### “express-demo”文件夹&Oraclelist.js

express-demo是一整个nodejs的项目，Oracellist.js则是单个运行的nodejs文件

express-demo里的文件夹基本上是nodejs的express框架初始化生成的目录，

* 其中的phe文件夹，这个是python的同态加密库，用于加密数据的
* test.py是同态加密的脚本。用于接收数据并对数据进行解密

Oracellist.js用于监听某个具体的合约，统计合约里使用的预言机节点的次数。

### ”example“文件夹

演示脚本文件夹，在该路径下直接执行Use.py文件，就可以使用演示脚本。根据命令行提示使用即可。

* create：包含了合约模板以及启动脚本。生成的合约就存放在这里面
* data：包含了”农场数据平台“的基本功能：采集链下传感器数据，以及历史数据查询
* flight：航班延误理赔平台的基本功能：部署合约。调用合约的功能，不在这里面
* http_load-09Mar2016：对平台进行压力测试使用的软件”http_load“
* node_modules：node项目所包含的所有包
* phe：同态加密的库

### "phe"文件夹

Python实现的Paillier同态加密的库

