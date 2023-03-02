var GoodsFlowChange_graph = echarts.init(document.getElementById("GoodsFlowChange_graph"));
var GoodsFlowChange_graph_option;
var xValue, GoodsNum, GoodsWeight;
// 初始化简单的数据
xValue = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
	122, 123, 124, 125, 126, 127, 128, 129
];
GoodsNum = [20, 32, 89, 20, 98, 30, 69, 46, 2, 55, 75, 96, 98, 84, 3, 100, 68, 6, 6, 1, 41, 93, 75, 14, 45, 9, 45, 40,
	6, 60
];
GoodsWeight = [21, 27, 1, 23, 3, 59, 86, 72, 3, 22, 52, 62, 45, 83, 33, 32, 49, 43, 54, 12, 9, 82, 28, 88, 33, 73, 19,
	34, 96, 81
];

GoodsFlowChange_graph_option = {
	// backgroundColor: 'floralwhite',
	title: {
		text: '货流变化',
		textStyle: {
			color: '#482522',
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
		left: '12%',
		right: '20%'
		// containLabel: false
	},
	dataZoom: [{
			id: 'dataZoomX',
			type: 'inside',
			xAxisIndex: [0],
			filterMode: 'filter'
		},
		{
			id: 'dataZoomY',
			type: 'inside',
			yAxisIndex: [0],
			filterMode: 'filter'
		}
	],
	legend: {
		data: ["数量（个）", "重量（t）"],
		textStyle: {
			color: '#B6A476',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15
		},
	},
	xAxis: [{
		type: 'category',
		axisTick: {
			alignWithLabel: true
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#B6A476',
				width: 3
			}
		},
		axisLabel: {
			color: '#2E282E',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 20
		},
		// prettier-ignore
		data: xValue
	}],
	yAxis: [{
			type: 'value',
			name: '数量（个）',
			position: 'right',
			alignTicks: true,
			axisLine: {
				show: true,
				lineStyle: {
					color: '#B6A476',
					width: 3
				}
			},
			axisLabel: {
				color: '#2E282E',
				fontStyle: 'oblique',
				fontWeight: 'bold',
				fontSize: 20,
				formatter: '{value} 个',
			},
		},
		{
			type: 'value',
			name: '重量（t）',
			position: 'left',
			alignTicks: true,
			axisLine: {
				show: true,
				lineStyle: {
					color: '#B6A476',
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
	series: [{
			name: '数量（个）',
			type: 'line',
			smooth: true,
			data: GoodsNum,
			color: '#652B1C'
		},
		{
			name: '重量（t）',
			type: 'line',
			smooth: true,
			yAxisIndex: 1,
			data: GoodsWeight,
			color: '#000013'
		}
	]
};
GoodsFlowChange_graph_option && GoodsFlowChange_graph.setOption(GoodsFlowChange_graph_option);
