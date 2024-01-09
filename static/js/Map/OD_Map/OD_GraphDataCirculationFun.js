// 切记：一个图表更新的post若要有时间制约一定要嵌套写！
// 数据处理尽量在后端实现

// 自定义的12种货物种类
var GoodsKind = [
	['生活用品',
		'食用品',
		'矿产品',
		'化工产品'
	],
	['材料制品',
		'服装首饰',
		'金属制品',
		'电子产品'
	],
	['运输工具',
		'武器火药',
		'杂项制品',
		'文画古藏'
	]
];

var FromCityValChange_defaultData = {
	'legend': ['上海', '北京', '杭州', '山西', '南京'],
	'series': [{
			name: '上海',
			type: 'line',
			smooth: true,
			data: [110, 112, 81, 104, 90, 120, 110]
		},
		{
			name: '北京',
			type: 'line',
			smooth: true,
			data: [140, 122, 101, 124, 110, 140, 130]
		},
		{
			name: '杭州',
			type: 'line',
			smooth: true,
			data: [150, 142, 121, 144, 120, 160, 150]
		},
		{
			name: '山西',
			type: 'line',
			smooth: true,
			data: [200, 202, 181, 194, 160, 200, 200]
		},
		{
			name: '南京',
			type: 'line',
			smooth: true,
			data: [220, 232, 201, 234, 190, 230, 220]
		},
	],
}


// 货源地/目的地 货物值分布图像 循环控制变量、相关数组
var CityUpdateFlag = 1;
var FromCityList = ['北京'];
var ToCityList = ['苏黎世'];
var FromCityIndex = 0;
var ToCityIndex = 0;

// 货源地/目的地 货物种类分布 图表数据更新
function CitiesGoodsValDistribution_graphDataUpdate(value_port, start_time, end_time, interval) {
	var data = {
		'port': value_port,
		'start_time': start_time,
		'end_time': end_time,
		'interval': interval,
		'CityUpdateFlag': CityUpdateFlag,
		'FromCityName': FromCityList[FromCityIndex],
		'ToCityName': ToCityList[ToCityIndex],
	}
	// console.log('selectinfo: ', data);

	// 货源地/目的地 值分布图表数据更新
	// 只更新一次城市数据
	if (CityUpdateFlag == 1) {
		$.post('/G1_CityValDistribution', data).done(function(res1) {
			FromCityList = res1['FromCityList'];
			ToCityList = res1['ToCityList'];

			CityUpdateFlag = 0;

			data['CityUpdateFlag'] = CityUpdateFlag;
			data['FromCityName'] = FromCityList[FromCityIndex];
			data['ToCityName'] = ToCityList[ToCityIndex];

			// 货源地/目的地 货物数量/重量 分布饼状图的数据更新
			$.post('/G1_CityValDistribution', data).done(function(res2) {
				var dataFromNum = [];
				var dataFromWeight = [];
				SourceOfSupplyGoodsValueDistribution_pieGraph_option.title.text = '货源地：' + FromCityList[
					FromCityIndex];
				DestinationGoodsValueDistribution_pieGraph_option.title.text = '目的地：' + ToCityList[
					ToCityIndex];
				for (var i = 0; i < res2['from'].length; i++) {
					dataFromNum.push({
						value: res2['from'][i][1],
						name: res2['from'][i][0]
					});
					dataFromWeight.push({
						value: res2['from'][i][2],
						name: res2['from'][i][0]
					});
				}
				SourceOfSupplyGoodsValueDistribution_pieGraph_option.series[0].data = dataFromWeight;
				SourceOfSupplyGoodsValueDistribution_pieGraph_option.series[1].data = dataFromNum;
				SourceOfSupplyGoodsValueDistribution_pieGraph.setOption(
					SourceOfSupplyGoodsValueDistribution_pieGraph_option);

				var dataToNum = [];
				var dataToWeight = [];
				for (var i = 0; i < res2['to'].length; i++) {
					dataToNum.push({
						value: res2['to'][i][1],
						name: res2['to'][i][0]
					});
					dataToWeight.push({
						value: res2['to'][i][2],
						name: res2['to'][i][0]
					});
				}
				DestinationGoodsValueDistribution_pieGraph_option.series[0].data = dataToWeight;
				DestinationGoodsValueDistribution_pieGraph_option.series[1].data = dataToNum;
				DestinationGoodsValueDistribution_pieGraph.setOption(
					DestinationGoodsValueDistribution_pieGraph_option);

				if (FromCityIndex == FromCityList.length - 1) {
					FromCityIndex = 0;
				} else {
					FromCityIndex += 1;
				}
				if (ToCityIndex == ToCityList.length - 1) {
					ToCityIndex = 0;
				} else {
					ToCityIndex += 1;
				}
			})
		})
	} else {

		// 货源地/目的地 货物数量/重量 分布饼状图的数据更新
		$.post('/G1_CityValDistribution', data).done(function(data) {
			var dataFromNum = [];
			var dataFromWeight = [];
			SourceOfSupplyGoodsValueDistribution_pieGraph_option.title.text = '货源地：' + FromCityList[
				FromCityIndex];
			DestinationGoodsValueDistribution_pieGraph_option.title.text = '目的地：' + ToCityList[
				ToCityIndex];
			for (var i = 0; i < data['from'].length; i++) {
				dataFromNum.push({
					value: data['from'][i][1],
					name: data['from'][i][0]
				});
				dataFromWeight.push({
					value: data['from'][i][2],
					name: data['from'][i][0]
				});
			}
			SourceOfSupplyGoodsValueDistribution_pieGraph_option.series[0].data = dataFromWeight;
			SourceOfSupplyGoodsValueDistribution_pieGraph_option.series[1].data = dataFromNum;
			SourceOfSupplyGoodsValueDistribution_pieGraph.setOption(
				SourceOfSupplyGoodsValueDistribution_pieGraph_option);

			var dataToNum = [];
			var dataToWeight = [];
			for (var i = 0; i < data['to'].length; i++) {
				dataToNum.push({
					value: data['to'][i][1],
					name: data['to'][i][0]
				});
				dataToWeight.push({
					value: data['to'][i][2],
					name: data['to'][i][0]
				});
			}
			DestinationGoodsValueDistribution_pieGraph_option.series[0].data = dataToWeight;
			DestinationGoodsValueDistribution_pieGraph_option.series[1].data = dataToNum;
			DestinationGoodsValueDistribution_pieGraph.setOption(
				DestinationGoodsValueDistribution_pieGraph_option);

			if (FromCityIndex == FromCityList.length - 1) {
				FromCityIndex = 0;
			} else {
				FromCityIndex += 1;
			}
			if (ToCityIndex == ToCityList.length - 1) {
				ToCityIndex = 0;
			} else {
				ToCityIndex += 1;
			}
		})
	}
}

// 货物 数量 变化图表数据更新
function TopGoodsNumFlowChange_graphDataUpdate() {
	var data = {
		'GoodsKindNum': OD_GoodsKindNum,
		'start_time': selectInfo.value_time[0],
		'end_time': selectInfo.value_time[1]
	}
	// console.log(data);
	$.post('/G2_TopGoodsNumFlowChange_data', data).done(function(data) {
		TopGoodsNumFlowChange_graph_option.dataset.source[0] = data['time'];
		TopGoodsNumFlowChange_graph_option.dataset.source[1] = data['item1'];
		TopGoodsNumFlowChange_graph_option.dataset.source[2] = data['item2'];
		TopGoodsNumFlowChange_graph_option.dataset.source[3] = data['item3'];
		TopGoodsNumFlowChange_graph_option.dataset.source[4] = data['item4'];
		setTimeout(function() {
			TopGoodsNumFlowChange_graph.setOption(TopGoodsNumFlowChange_graph_option);
		})
		if (OD_GoodsKindNum == 2) {
			OD_GoodsKindNum = 0;
		} else {
			OD_GoodsKindNum += 1;
		}
	})
}


// 货源地 货物数量/重量 变化曲线 相关变量
var FromCitySupplyGoodsIndex = 0;

function FromCityValChange_dataUpdate() {
	var data = {
		'index': FromCitySupplyGoodsIndex,
		'kind': selectInfo.value_kind,
		'start': selectInfo.value_time[0],
		'end': selectInfo.value_time[1],
	}
	$.ajax({
		url: '/G2_CityValSeq',
		data: data,
		type: 'post',
		success: function(res) {
			var num = [];
			var weight = [];
			for (var i = 0; i < res['CityList'].length; i++) {
				num.push({
					name: res['CityList'][i],
					type: 'line',
					smooth: true,
					data: res['num'][i]
				});
				weight.push({
					name: res['CityList'][i],
					type: 'line',
					smooth: true,
					data: res['weight'][i]
				});
			}
			// 处理数据缓存问题
			if (num.length < SorceOfSupplyGoodsNumChange_graph_option.series.length) {
				SorceOfSupplyGoodsNumChange_graph.dispose();
				SorceOfSupplyGoodsWeightChange_graph.dispose();
				SorceOfSupplyGoodsNumChange_graph = echarts.init(document.getElementById(
					"SorceOfSupplyGoodsNumChange_graph"), 'chalk');
				SorceOfSupplyGoodsWeightChange_graph = echarts.init(document.getElementById(
					"SorceOfSupplyGoodsWeightChange_graph"), 'purple-passion');
			}
			SorceOfSupplyGoodsNumChange_graph_option.xAxis.data = res['time'];
			SorceOfSupplyGoodsWeightChange_graph_option.xAxis.data = res['time'];
			SorceOfSupplyGoodsNumChange_graph_option.legend.data = res['CityList'];
			SorceOfSupplyGoodsWeightChange_graph_option.legend.data = res['CityList'];
			SorceOfSupplyGoodsNumChange_graph_option.series = num;
			SorceOfSupplyGoodsWeightChange_graph_option.series = weight;
			SorceOfSupplyGoodsNumChange_graph.setOption(SorceOfSupplyGoodsNumChange_graph_option);
			SorceOfSupplyGoodsWeightChange_graph.setOption(SorceOfSupplyGoodsWeightChange_graph_option);
			FromCitySupplyGoodsIndex = res['index'];
		},
		error: function() {
			SorceOfSupplyGoodsNumChange_graph_option.legend.data = FromCityValChange_defaultData['legend'];
			SorceOfSupplyGoodsWeightChange_graph_option.legend.data = FromCityValChange_defaultData[
				'legend'];
			SorceOfSupplyGoodsNumChange_graph_option.series = FromCityValChange_defaultData['series'];
			SorceOfSupplyGoodsWeightChange_graph_option.series = FromCityValChange_defaultData['series'];
			SorceOfSupplyGoodsNumChange_graph.setOption(SorceOfSupplyGoodsNumChange_graph_option);
			SorceOfSupplyGoodsWeightChange_graph.setOption(SorceOfSupplyGoodsWeightChange_graph_option);
		}
	})
}

function TopGoodsValCities_graphDataUpdate() {
	var data = {
		'kind': selectInfo.value_kind,
		'start': selectInfo.value_time[0],
		'end': selectInfo.value_time[1],
	}
	$.post('/G1_TopGoodsValCities_data', data).done(function(res) {
		TopGoodsNumCities_graph_option.title.text = '货物数量Top' + res['CityListSortByNum'].length + ' 城市';
		TopGoodsWeightCities_graph_option.title.text = '货物重量Top' + res['CityListSortByNum'].length + ' 城市';
		TopGoodsNumCities_graph_option.yAxis.data = res['CityListSortByNum'];
		TopGoodsWeightCities_graph_option.yAxis.data = res['CityListSortByWeight'];
		TopGoodsNumCities_graph_option.series[0].data = res['NumList'];
		TopGoodsWeightCities_graph_option.series[0].data = res['WeightList'];
		TopGoodsNumCities_graph.setOption(TopGoodsNumCities_graph_option);
		TopGoodsWeightCities_graph.setOption(TopGoodsWeightCities_graph_option);
	})
}

// 部分图表数据更新整体循环
function GraphDataCirculationShow() {
	// console.log(selectInfo.value_port);
	if (selectInfo.value_port == 5) {
		selectInfo.value_port = 0;
	} else {
		selectInfo.value_port = selectInfo.value_port + 1;
	}
	CitiesGoodsValDistribution_graphDataUpdate(OD_PortNumberToPortName(selectInfo.value_port), selectInfo.value_time[0],
		selectInfo.value_time[1], 'DAY');
	TopGoodsValCities_graphDataUpdate();
}

GraphDataCirculationShow();
FromCityValChange_dataUpdate();
var FromCityValChange_dataUpdate_interval = setInterval(FromCityValChange_dataUpdate, 2000);
var GraphDataCirculationShow_interval = setInterval(GraphDataCirculationShow, 2000);
var TopGoodsNumFlowChange_graphDataUpdate_interval = setInterval(TopGoodsNumFlowChange_graphDataUpdate, 2000);
// FromCityValChange_dataUpdate_init();
