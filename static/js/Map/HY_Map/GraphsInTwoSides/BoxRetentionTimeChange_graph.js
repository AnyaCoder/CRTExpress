var BoxRetentionTimeChange_graph = echarts.init(document.getElementById('BoxRetentionTimeChange_graph'),
	'purple-passion');
var BoxRetentionTimeChange_graph_option;

BoxRetentionTimeChange_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '集装箱滞留时间',
		left: '8%',
		top: '24%',
		textStyle: {
			color: '#bdaacf'
		}
	},
	tooltip: {
		trigger: 'axis',
	},
	legend: {
		data: ['平均时间', '最长时间', '最短时间'],
		right: '0%',
		// orient: 'vertical',
		right: '0%',
		top: '25%',
		textStyle: {
			color: 'white',
			// fontStyle: 'oblique',
			// fontWeight: 'bold',
			// fontSize: 12
		},
	},
	grid: {
		left: '4%',
		right: '0%',
		bottom: '0%',
		top: '40%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11",
			"time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19", "time20"
		],
		axisLabel: {
			color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#effcfa',
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
				color: '#effcfa',
				width: 3
			}
		},
	},
	series: [{
			name: '最长时间',
			type: 'line',
			smooth: true,
			z: 1,
			itemStyle: {
				opacity: 0,
				color: '#e098c7'
			},
			lineStyle: {
				opacity: 1,
				color: '#e098c7'
			},
			areaStyle: {
				color: '#e098c7',
				opacity: 0.3
			},
			data: [10, 12, 12, 15, 12, 14, 11, 15, 13, 10, 10, 15, 14, 13, 14, 10, 12, 13, 15, 15]
		},
		{
			name: '最短时间',
			type: 'line',
			smooth: true,
			z: 2,
			itemStyle: {
				opacity: 0,
				color: '#71669e'
			},
			lineStyle: {
				opacity: 1,
				color: '#71669e'
			},
			areaStyle: {
				color: '#71669e',
			},
			data: [1, 1, 3, 1, 2, 5, 3, 1, 3, 5, 2, 5, 4, 2, 1, 5, 1, 2, 4, 1]
		},
		{
			name: '平均时间',
			type: 'line',
			smooth: true,
			itemStyle: {
				color: '#9b8bba'
			},
			lineStyle: {
				color: '#9b8bba',
			},
			data: [6, 9, 8, 5, 10, 10, 5, 6, 5, 9, 10, 9, 7, 7, 6, 6, 7, 8, 7, 9]
		}
	]
};

BoxRetentionTimeChange_graph_option && BoxRetentionTimeChange_graph.setOption(BoxRetentionTimeChange_graph_option);
