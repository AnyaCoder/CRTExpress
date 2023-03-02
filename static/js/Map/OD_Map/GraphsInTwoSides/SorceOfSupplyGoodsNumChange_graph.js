var SorceOfSupplyGoodsNumChange_graph = echarts.init(document.getElementById("SorceOfSupplyGoodsNumChange_graph"),
	'chalk');
var SorceOfSupplyGoodsNumChange_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '货源地 货物数量变化',
		textStyle: {
			color: '#bee0d0'
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: [],
		// data: ['上海', '北京', '杭州', '山西', '南京'],
		top: '15%',
		textStyle: {
			fontWeight: 'bold',
			color: 'white',
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		top: '35%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ['01-01', '01-08', '01-15', '01-22', '01-29', '02-05', '02-12'],
		axisLabel: {
			color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#4C8045',
				width: 3
			}
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#30aecf',
				width: 3
			}
		},
	},
	series: [],
	// series: [{
	// 		name: '上海',
	// 		type: 'line',
	// 		smooth: true,
	// 		data: [110, 112, 81, 104, 90, 120, 110]
	// 	},
	// 	{
	// 		name: '北京',
	// 		type: 'line',
	// 		smooth: true,
	// 		data: [140, 122, 101, 124, 110, 140, 130]
	// 	},
	// 	{
	// 		name: '杭州',
	// 		type: 'line',
	// 		smooth: true,
	// 		data: [150, 142, 121, 144, 120, 160, 150]
	// 	},
	// 	{
	// 		name: '山西',
	// 		type: 'line',
	// 		smooth: true,
	// 		data: [200, 202, 181, 194, 160, 200, 200]
	// 	},
	// 	{
	// 		name: '南京',
	// 		type: 'line',
	// 		smooth: true,
	// 		data: [220, 232, 201, 234, 190, 230, 220]
	// 	},
	// ]
};
SorceOfSupplyGoodsNumChange_graph.setOption(SorceOfSupplyGoodsNumChange_graph_option);
