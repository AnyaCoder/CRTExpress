var TopGoodsNumFlowChange_graph = echarts.init(document.getElementById("TopGoodsNumFlowChange_graph"), 'macarons');
var TopGoodsNumFlowChange_graph_option;
var TGoodsN_FC_time = ['time', '2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07',
	'2021-08',
	'2021-09', '2021-10', '2021-11', '2021-12'
];
var TGoodsN_FC_item = [
	['生活用品', 1999, 9896, 3125, 8597, 1437, 1550, 4540, 9738, 4961,
		1037,
		9410,
		9163
	],
	['食用品', 1884, 2252, 1561, 1942, 1120, 2487, 2425, 2422, 3174,
		2728,
		1853, 1504
	],
	['矿产品', 1794, 1567, 2035, 2243, 4694, 4936, 6580, 9468, 5904,
		1047,
		6593, 3276
	],
	['化工产品', 1366, 1459, 1045, 1886, 8765, 1599, 5144, 6697, 1093,
		6042, 5572,
		6554
	]
];
// setTimeout(function() {});
TopGoodsNumFlowChange_graph_option = {
	title: {
		text: '货物 数量变化分析图',
		top: '0%',
		left: '30%',
		textStyle: {
			color: '#afd7ec'
		}
	},
	backgroundColor: 'transparent',
	legend: {
		show: false
	},
	tooltip: {
		trigger: 'axis',
		showContent: true
	},
	dataset: {
		source: [TGoodsN_FC_time, TGoodsN_FC_item[0], TGoodsN_FC_item[1], TGoodsN_FC_item[2],
			TGoodsN_FC_item[3]
		]
	},
	xAxis: {
		type: 'category',
		axisLabel: {
			color: '#B47844',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#494367',
				width: 3
			}
		},
	},
	yAxis: {
		gridIndex: 0,
		axisLabel: {
			color: '#B47844',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		splitArea: {
			show: false,
		},
		splitLine: {
			show: false,
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#494367',
				width: 3
			}
		},
	},
	grid: {
		top: '50%',
		left: '15%',
	},
	series: [{
			type: 'line',
			smooth: true,
			seriesLayoutBy: 'row',
			emphasis: {
				focus: 'series'
			}
		},
		{
			type: 'line',
			smooth: true,
			seriesLayoutBy: 'row',
			emphasis: {
				focus: 'series'
			}
		},
		{
			type: 'line',
			smooth: true,
			seriesLayoutBy: 'row',
			emphasis: {
				focus: 'series'
			}
		},
		{
			type: 'line',
			smooth: true,
			seriesLayoutBy: 'row',
			emphasis: {
				focus: 'series'
			}
		},
		{
			type: 'pie',
			id: 'pie',
			roseType: 'area',
			radius: ['8%', '30%'],
			center: ['50%', '25%'],
			emphasis: {
				focus: 'self'
			},
			label: {
				formatter: '{b}: {@2021-01} ({d}%)',
				color: 'white',
				fontSize: 15
			},
			// textStyle: {
			// 	color: 'white',
			// 	fontSize: 15
			// },
			encode: {
				itemName: 'time',
				value: TGoodsN_FC_time[1],
				tooltip: TGoodsN_FC_time[1]
			}
		}
	]
};
TopGoodsNumFlowChange_graph.on('updateAxisPointer', function(event) {
	const xAxisInfo = event.axesInfo[0];
	if (xAxisInfo) {
		const dimension = xAxisInfo.value + 1;
		TopGoodsNumFlowChange_graph.setOption({
			series: {
				id: 'pie',
				label: {
					formatter: '{b}: {@[' + dimension + ']} ({d}%)'
				},
				encode: {
					value: dimension,
					tooltip: dimension
				}
			}
		});
	}
});
TopGoodsNumFlowChange_graph.setOption(TopGoodsNumFlowChange_graph_option);
