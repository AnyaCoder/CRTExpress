var BoxRetentionTimeDistribution_graph = echarts.init(document.getElementById("BoxRetentionTimeDistribution_graph"),
	'chalk');
var BoxRetentionTimeDistribution_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '集装箱滞留时间分布',
		right: '5%',
		textStyle: {
			color: '#ffd800'
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['时间分布'],
		left: '13%',
		textStyle: {
			color: 'white',
			// fontStyle: 'oblique',
			// fontWeight: 'bold',
			fontSize: 12
		},
	},
	grid: {
		left: '3%',
		right: '4%',
		top: '18%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
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
		data: [9, 8, 6, 5, 6, 7, 9, 10, 7, 9],
		type: 'bar',
		color: '#f6a09a',
		name: '时间分布',
	}],
	yAxis: {
		type: 'category',
		data: ["period1", "period2", "period3", "period4", "period5", "period6", "period7", "period8", "period9",
			"period10"
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
}
BoxRetentionTimeDistribution_graph_option && BoxRetentionTimeDistribution_graph.setOption(
	BoxRetentionTimeDistribution_graph_option);
