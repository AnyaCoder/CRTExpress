
> [!CAution] 
> **本网页为三个计算机入门菜鸟编写，可能会有众多漏洞！请谨慎使用**
##  如你所见，这是一个网页

本网页基于Flask框架和element UI组件，并调用了echarts内众多图表。

# 页面介绍
- ## app.py
	本页面为整体文件的路由页，负责网页的域名规划以及数据库内数据的调用及连接
	- G1-3_GetData.py
		均为数据调取及预处理函数
	- G3_utils.py
		时间戳的处理函数
	- InsertData.py
		本函数为基于numpy所初步尝试的曲线拟合函数，应该为非RNN神经网络下对目前数据所绘制后的曲线拟合的最优解（RNN正在学习中）
- ## template
	本文件夹内存储为网页。
	- OD、HY
		这两个网页为主体界面，由一个可视化的地图及小部分的辅助图表构成
	- YC
		此页面是基于数据库内数据所展现的预测模型可视化的图表。
	- Graphslntegration
		本文件夹内包含主要预测图表所对应的各界面，分别有：集装箱、货物、口岸、班列，分别对应ContainersGraph.html、GoodsGraph.html、PortOperationAbilityAnalysis.html、TrainSituationAnalysis.html
- ## FITTING DATA
	本文件夹内主要存放用于数据预测所需要的数据表（整合）、目前尚未完工
- ## GRACEFULGOODS_NEW_INFO
	本文件夹用于存放一部分数据库内数据，以便数据库内无法连接时图表仍可正常显示、同时方便在进行小量数据预测时直接取样
- ## static
	本文件主要存放网页所需的各类图片、css文件、js文件
	- img 
		存放图标及网页所需的图片
		- Favicon
			存放网页链接显示图标
		- Logo
			存放内部链接的logo图标
	- css
		各网页内组件的特殊化、特效配置
		- GraphsIntegration
			文件夹内存放为主要预测图表所对应的页面设计。同上，分别对应集装箱、货物、口岸、班列界面的css配置文件
		- Map、toplan
			本文件夹以及toplan文件均为关于OD、HY主界面的配置。
			其中Map文件夹内对应者均为关于OD、HY内图表以及选择栏配置
			toplan文件内的配置是关于OD与HY界面内菜单栏（页面跳转）的样式配置
		- element
			因此项目大部分的html是基于element UI的组件下搭建的。所以本文件是关于所使用的element UI内部分小组件的所配置的统一性样式
		- Prediction
			YC界面所设计的图片的样式配置
	- js
		图表所需js文件，用于绘制图像和各类函数
		- globalVar
			图表内地图的常量设置（如粒度值、循环标志变量）
		- GraphTheme
			页面各种主题设置
		- Map
			HY、ODmap内均为Element Ul，GraphsInTwoSides两个文件夹，前者为对选择栏数据的配置、后者为页面内各图表页面配置。同时两者后面各有4个js文件，均为对页面初始化及图表数据选取和循环函数
		- StatisticalCharts
			本文件夹下各文件均为主要预测图表内的各种数据所需要的选择栏和数据配置，ctrl_xxx后xxx所对应英文名及为对应中文图表。
			
			
	

