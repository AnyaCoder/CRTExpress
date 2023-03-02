var TrainExpectedAndActualPlan_graph = echarts.init(document.getElementById('TrainExpectedAndActualPlan_graph'),
	'dark');
var TrainExpectedAndActualPlan_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '班列计划开行 & 实际运行',
		left: '7%',
		textStyle: {
			color: '#bee0d0'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {
		data: ['计划量', '实际量'],
		// orient: 'vertical',
		// right: '0%',
		top: '10%',
		left: 'right',
		textStyle: {
			color: 'white',
			// fontStyle: 'oblique',
			// fontWeight: 'bold',
			fontSize: 12
		},
	},
	grid: {
		top: '30%',
		left: '3%',
		right: '0%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10",
			"time11", "time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19",
			"time20"
		],
		axisLabel: {
			// color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				// color: '#30aecf',
				width: 3
			}
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			// color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				// color: '#30aecf',
				width: 3
			}
		},
	},
	series: [{
			name: '计划量',
			type: 'bar',
			color: '#3862ac',
			data: [69, 83, 98, 80, 90, 100, 84, 86, 100, 59, 84, 85, 52, 95, 97, 72, 52, 91, 86, 55]
		},
		{
			name: '实际量',
			type: 'bar',
			color: '#e7b7c5',
			data: [89, 58, 82, 92, 92, 73, 79, 87, 80, 52, 59, 84, 57, 60, 90, 93, 67, 69, 65, 78]
		}
	]
};

TrainExpectedAndActualPlan_graph_option && TrainExpectedAndActualPlan_graph.setOption(
	TrainExpectedAndActualPlan_graph_option);
