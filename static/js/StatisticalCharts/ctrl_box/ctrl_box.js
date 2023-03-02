var Box_graph = echarts.init(document.getElementById('box-container'));
var Box_graph_option;

Box_graph_option = {
	title: {
		text: '集装箱接入发出量',
		left: '2%',
		textStyle: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 25
		},
	},
	tooltip: {
		trigger: 'axis',
	},
	legend: {
		data: ['接入量', '发出量'],
		textStyle: {
			color: '#4D1018',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15
		},
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		axisLine: {
			show: true,
			lineStyle: {
				color: '#a58375',
				width: 3
			}
		},
		axisLabel: {
			color: '#417851',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			color: '#417851',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	series: [{
			name: '接入量',
			type: 'line',
			smooth: true,
			data: [563, 819, 980, 613, 522, 728, 618, 577, 584, 862, 654, 742, 592, 533, 671, 734, 857, 607,
				900, 760
			],
			color: {
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: '#b25c43' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#ca6a24' // 100% 处的颜色
				}],
			}
		},
		{
			name: '发出量',
			type: 'line',
			smooth: true,
			data: [933, 969, 703, 705, 958, 610, 876, 925, 791, 995, 581, 800, 663, 889, 958, 906, 633, 662,
				721, 933
			],
			color: {
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: '#494367' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#417851' // 100% 处的颜色
				}],
			}
		}
	]
};

Box_graph_option && Box_graph.setOption(Box_graph_option);
