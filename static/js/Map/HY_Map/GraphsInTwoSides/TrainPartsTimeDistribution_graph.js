var TrainPartsTimeDistribution_graph = echarts.init(document.getElementById('TrainPartsTimeDistribution_graph'),
	'purple-passion');
var TrainPartsTimeDistribution_graph_option;

TrainPartsTimeDistribution_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '列车各环节时间分布',
		left: '10%',
		top: '15%',
		textStyle: {
			color: "#ffaea5",
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['列车通行时间', '报关取票时间', '通关时间'],
		// orient: 'vertical',
		right: '-1%',
		top: '30%',
		textStyle: {
			color: 'white',
			// fontStyle: 'oblique',
			// fontWeight: 'bold',
			fontSize: 12
		},
	},
	grid: {
		left: '5%',
		right: '0%',
		top: '45%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
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
			name: '列车通行时间',
			type: 'bar',
			color: '#f2a6a6',
			data: [62, 91, 69, 58, 92, 62, 69, 82, 66, 67, 82, 73, 81, 69, 57, 65, 86, 89, 71, 76]
		},
		{
			name: '报关取票时间',
			type: 'bar',
			color: '#99cfdd',
			data: [12, 17, 29, 14, 30, 16, 19, 13, 14, 23, 15, 19, 17, 11, 10, 24, 27, 13, 10, 26]
		},
		{
			name: '通关时间',
			type: 'bar',
			color: '#f2dfd2',
			data: [14, 13, 12, 11, 28, 11, 22, 10, 15, 12, 19, 10, 22, 28, 25, 19, 10, 26, 30, 15]
		}
	]
};

TrainPartsTimeDistribution_graph_option && TrainPartsTimeDistribution_graph.setOption(
	TrainPartsTimeDistribution_graph_option);
