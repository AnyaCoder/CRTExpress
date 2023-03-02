var timespan_graph = echarts.init(document.getElementById('timespan-container'));
var timespan_graph_option;

timespan_graph_option = {
	title: {
		text: '集装箱滞留时间',
		left: '2%',
		textStyle: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 24
		},
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['最短时间', '平均时间', '最长时间'],
		right: '5%',
		textStyle: {
			color: 'rgba(67, 70, 95, 0.7)',
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
		data: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11",
			"time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19", "time20"
		],
		axisLine: {
			show: true,
			lineStyle: {
				color: '#EB4B17',
				width: 3
			}
		},
		axisLabel: {
			color: '#03776A',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			color: '#03776A',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	series: [{
			name: '最长时间',
			type: 'line',
			smooth: true,
			z: 1,
			itemStyle: {
				opacity: 0,
				color: 'rgba(243, 147, 1, 1)'
			},
			lineStyle: {
				opacity: 1,
				color: 'rgba(234, 85, 20, 1)'
			},
			areaStyle: {
				color: '#e7a803',
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
				color: '#c7935f'
			},
			lineStyle: {
				opacity: 1,
				color: 'rgba(243, 147, 1, 1)'
			},
			areaStyle: {
				opacity: 0.8,
				color: '#ffffff',
			},
			data: [1, 1, 3, 1, 2, 5, 3, 1, 3, 5, 2, 5, 4, 2, 1, 5, 1, 2, 4, 1]
		},
		{
			name: '平均时间',
			type: 'line',
			smooth: true,
			itemStyle: {
				color: 'rgba(55, 5, 8, 1)'
			},
			lineStyle: {
				color: 'rgba(55, 5, 8, 1)',
			},
			data: [6, 9, 8, 5, 10, 10, 5, 6, 5, 9, 10, 9, 7, 7, 6, 6, 7, 8, 7, 9]
		}
	]
};

timespan_graph_option && timespan_graph.setOption(timespan_graph_option);
