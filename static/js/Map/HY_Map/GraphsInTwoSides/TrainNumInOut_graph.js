var TrainNumInOut_graph = echarts.init(document.getElementById('TrainNumInOut_graph'), 'purple-passion');
var TrainNumInOut_graph_option;

TrainNumInOut_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '班列接入发出量',
		left: '10%',
		top: '10%',
		textStyle: {
			color: '#75c1c4'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {
		data: ['接入量', '发出量'],
		// orient: 'vertical',
		right: '0%',
		top: '10%',
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
		top: '28%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: ["train1", "train2", "train3", "train4", "train5", "train6", "train7", "train8", "train9", "train10",
			"train11", "train12", "train13", "train14", "train15", "train16", "train17", "train18", "train19",
			"train20"
		],
		axisLabel: {
			color: '#d4e5ef',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#30aecf',
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
				color: '#30aecf',
				width: 3
			}
		},
	},
	series: [{
			name: '接入量',
			type: 'bar',
			color: 'rgba(253,235,116,1)',
			data: [95, 56, 61, 88, 67, 64, 94, 79, 80, 69, 96, 99, 68, 58, 96, 95, 92, 83, 89, 72]
		},
		{
			name: '发出量',
			type: 'bar',
			color: '#88abda',
			data: [42, 38, 46, 13, 50, 15, 43, 16, 41, 28, 45, 31, 47, 42, 49, 47, 22, 27, 50, 25]
		},
		// {
		// 	name: '接入量line',
		// 	type: 'line',
		// 	smooth: true,
		// 	data: [95, 56, 61, 88, 67, 64, 94, 79, 80, 69, 96, 99, 68, 58, 96, 95, 92, 83, 89, 72]
		// },
		// {
		// 	name: '发出量line',
		// 	type: 'line',
		// 	smooth: true,
		// 	data: [42, 38, 46, 13, 50, 15, 43, 16, 41, 28, 45, 31, 47, 42, 49, 47, 22, 27, 50, 25]
		// }
	]
};

TrainNumInOut_graph_option && TrainNumInOut_graph.setOption(TrainNumInOut_graph_option);
