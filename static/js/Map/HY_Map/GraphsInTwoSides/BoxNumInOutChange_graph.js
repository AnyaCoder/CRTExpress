var BoxNumInOutChange_graph = echarts.init(document.getElementById('BoxNumInOutChange_graph'), 'dark');
var BoxNumInOutChange_graph_option;

BoxNumInOutChange_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '集装箱接入发出量',
		textStyle: {
			color: '#ffeb87'
		},
		right: '8%',
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['接入量', '发出量'],
		textStyle: {
			color: 'white',
		},
		left: '10%'
	},
	grid: {
		left: '3%',
		right: '10%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		axisLine: {
			show: true,
			lineStyle: {
				color: '#e7f4f1',
				width: 3
			}
		},
		axisLabel: {
			color: '#d7c48c',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	yAxis: {
		type: 'value',
		splitLine: {
			show: false,
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#e7f4f1',
				width: 3
			}
		},
		axisLabel: {
			color: '#d7c48c',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	series: [{
			name: '接入量',
			type: 'line',
			smooth: true,
			color: 'rgba(242, 200, 103)',
			showSymbol: false,
			data: [563, 819, 980, 613, 522, 728, 618, 577, 584, 862, 654, 742, 592, 533, 671, 734, 857, 607,
				900, 760
			]
		},
		{
			name: '发出量',
			type: 'line',
			smooth: true,
			color: 'rgba(48, 174, 207)',
			showSymbol: false,
			data: [933, 969, 703, 705, 958, 610, 876, 925, 791, 995, 581, 800, 663, 889, 958, 906, 633, 662,
				721, 933
			]
		}
	]
};

BoxNumInOutChange_graph_option && BoxNumInOutChange_graph.setOption(BoxNumInOutChange_graph_option);
