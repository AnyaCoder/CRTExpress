var traininfo_graph = echarts.init(document.getElementById('traininfo-container'));
var traininfo_graph_option;

traininfo_graph_option = {
	title: {
		text: '班列接入发出量',
		left: '2%',
		textStyle: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 24
		},
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {
		data: ['接入量', '发出量', '接入量line', '发出量line'],
		right: '5%',
		textStyle: {
			color: '#5b3663',
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
		data: ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10",
			"time11", "time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19",
			"time20"
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
		axisLabel: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	series: [{
			name: '接入量',
			type: 'bar',
			data: [95, 56, 61, 88, 67, 64, 94, 79, 80, 69, 96, 99, 68, 58, 96, 95, 92, 83, 89, 72],
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: '#BACCD9' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#10AEC2' 
			// 	}],
			// }
			color: '#99cfdd',
		},
		{
			name: '发出量',
			type: 'bar',
			data: [42, 38, 46, 13, 50, 15, 43, 16, 41, 28, 45, 31, 47, 42, 49, 47, 22, 27, 50, 25],
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: '#BACCD9' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#10AEC2' 
			// 	}],
			// }
			color: '#f2a6a6',
		},
		{
			name: '接入量line',
			type: 'line',
			smooth: true,
			data: [95, 56, 61, 88, 67, 64, 94, 79, 80, 69, 96, 99, 68, 58, 96, 95, 92, 83, 89, 72],
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: '#BACCD9' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#10AEC2' 
			// 	}],
			// }
			color: '#4065c6',
		},
		{
			name: '发出量line',
			type: 'line',
			smooth: true,
			data: [42, 38, 46, 13, 50, 15, 43, 16, 41, 28, 45, 31, 47, 42, 49, 47, 22, 27, 50, 25],
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: '#BACCD9' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#10AEC2' 
			// 	}],
			// }
			color: '#b92e35',
		}
	]
};

traininfo_graph_option && traininfo_graph.setOption(traininfo_graph_option);
