// 双x轴的柱状图
var GoodsValueDistribution_graph = echarts.init(document.getElementById("GoodsValueDistribution_graph"));
var GOODS_TYPE, GOODS_NUM, GOODS_WEIGHT;
GOODS_TYPE = ['种类1', '种类2', '种类3', '种类4', '种类5', '种类6', '种类7', '种类8', '种类9', '种类10', '种类11', '种类12', '种类13', '种类14',
	'种类15', '种类16', '种类17', '种类18', '种类19', '种类20'
];
GOODS_NUM = [778, 847, 357, 889, 208, 60, 831, 864, 638, 656, 535, 157, 987, 446, 196, 536, 1, 166, 236, 722];
GOODS_WEIGHT = [555, 166, 283, 560, 619, 874, 689, 151, 376, 529, 513, 286, 889, 59, 301, 244, 935, 570, 370, 826];
var GoodsValueDistribution_graph_option = {
	backgroundColor: '#f2eade',
	title: {
		text: '货物分布',
		textStyle: {
			color: '#545c64',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 24
		},
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross'
		}
	},
	grid: {
		left: '8%',
		right: '10%'
	},
	// toolbox: {
	// 	feature: {
	// 		dataView: {
	// 			show: true,
	// 			readOnly: false
	// 		},
	// 		restore: {
	// 			show: true
	// 		},
	// 		saveAsImage: {
	// 			show: true
	// 		}
	// 	}
	// },
	legend: {
		data: ['数量（个）', '重量（t）'],
		textStyle: {
			color: '#4D1018',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15
		},
	},
	xAxis: [{
			type: 'value',
			boundaryGap: false,
			name: '数量/个',
			position: 'top',
			axisLine: {
				show: true,
				// lineStyle: {
				// 	color: '#5470C6'
				// }
			},
			axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#2E282E',
					width: 3
				}
			},
			axisLabel: {
				color: '#2E282E',
				fontStyle: 'oblique',
				fontWeight: 'bold',
				fontSize: 20,
				// formatter: '{value} 个',
			},
		},
		{
			type: 'value',
			boundaryGap: false,
			name: '重量/t',
			position: 'bottom',
			axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#2E282E',
					width: 3
				}
			},
			axisLabel: {
				color: '#2E282E',
				fontStyle: 'oblique',
				fontWeight: 'bold',
				fontSize: 20,
				formatter: '{value} t',
			},
		}
	],
	yAxis: {
		type: 'category',
		axisLabel: {
			show: false
		},
		data: GOODS_TYPE
	},
	series: [{
			name: '数量（个）',
			type: 'bar',
			data: GOODS_NUM,
			// color: '#39363F'
			color: 'rgba(97, 95, 116, 1)'
		},
		{
			name: '重量（t）',
			type: 'bar',
			xAxisIndex: 1,
			data: GOODS_WEIGHT,
			color: 'rgba(199, 147, 95, 1)'
		}
	]
};
GoodsValueDistribution_graph_option && GoodsValueDistribution_graph.setOption(GoodsValueDistribution_graph_option)
