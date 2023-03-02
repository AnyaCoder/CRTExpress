var traintime_graph = echarts.init(document.getElementById('traintime-container'));
var traintime_graph_option;

traintime_graph_option = {
	title: {
		text: '列车各环节时间分布',
		left: '2%',
		textStyle: {
			// color: 'rgba(162, 210, 226)',
			// color: 'rgba(241, 189, 63)',
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 25
		},
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['列车通行时间', '报关取票时间', '通关时间'],
		right: '5%',
		textStyle: {
			color: '#545c64',
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
		boundaryGap: false,
		data: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11",
			"time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19", "time20"
		],
		axisLine: {
			show: true,
			lineStyle: {
				color: '#545c64',
				width: 3
			}
		},
		axisLabel: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	yAxis: {
		type: 'value',
		offset: 12,
		axisLabel: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			formatter: '{value} 列'
		},
	},
	series: [{
			name: '列车通行时间',
			type: 'bar',
			color: '#c0e8e4',
			data: [62, 91, 69, 58, 92, 62, 69, 82, 66, 67, 82, 73, 81, 69, 57, 65, 86, 89, 71, 76]
		},
		{
			name: '报关取票时间',
			type: 'bar',
			color: '#baa288',
			data: [12, 17, 29, 14, 30, 16, 19, 13, 14, 23, 15, 19, 17, 11, 10, 24, 27, 13, 10, 26]
		},
		{
			name: '通关时间',
			type: 'bar',
			color: '#fced7c',
			data: [14, 13, 12, 11, 28, 11, 22, 10, 15, 12, 19, 10, 22, 28, 25, 19, 10, 26, 30, 15]
		}
	]
};

traintime_graph_option && traintime_graph.setOption(traintime_graph_option);
