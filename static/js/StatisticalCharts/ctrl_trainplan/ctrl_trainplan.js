var trainplan_graph = echarts.init(document.getElementById('trainplan-container'));
var trainplan_graph_option;

trainplan_graph_option = {
	title: {
		text: '班列计划开行 vs 实际运行',
		left: 'center',
		textStyle: {
			color: '#545c64',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 25
		},
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {
		data: ['计划量', '实际量'],
		right: '10%',
		textStyle: {
			color: 'rgba(14, 50, 101)',
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
			name: '计划量',
			type: 'bar',
			data: [69, 83, 98, 80, 90, 100, 84, 86, 100, 59, 84, 85, 52, 95, 97, 72, 52, 91, 86, 55],
			// color: {
			// 	type: 'linear',
			// 	x: 0,
			// 	y: 0,
			// 	x2: 0,
			// 	y2: 1,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: 'rgba(92,56,101,1)' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#015467' 
			// 	}],
			// }
			color: '#f1c98b',
		},
		{
			name: '实际量',
			type: 'bar',
			data: [89, 58, 82, 92, 92, 73, 79, 87, 80, 52, 59, 84, 57, 60, 90, 93, 67, 69, 65, 78],
			// color: {
			// 	type: 'linear',
			// 	x: 0,
			// 	y: 0,
			// 	x2: 0,
			// 	y2: 1,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: '#fedc5e' 
			// 	}, {
			// 		offset: 1,
			// 		color: '#8fd1e1'
			// 	}],
			// }
			color: '#aee19d',
		}
	]
};

trainplan_graph_option && trainplan_graph.setOption(trainplan_graph_option);
