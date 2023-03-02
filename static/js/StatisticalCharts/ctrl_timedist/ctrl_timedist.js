var timedist_graph = echarts.init(document.getElementById('timedist-container'));
var timedist_graph_option;

timedist_graph_option = {
	title: {
		text: '集装箱滞留时间分布',
		left: 'center',
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
		data: ['时间分布'],
		right: '5%',
		textStyle: {
			color: '#4D1018',
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
		data: ["period1", "period2", "period3", "period4", "period5", "period6", "period7", "period8", "period9",
			"period10", "period11",
			"period12", "period13", "period14", "period15", "period16", "period17", "period18", "period19",
			"period20"
		],
		axisLine: {
			show: true,
			lineStyle: {
				color: '#B47844',
				width: 3
			}
		},
		axisLabel: {
			color: '#283643',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			color: '#283643',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
	},
	series: [{
		data: [9, 8, 6, 5, 6, 7, 9, 10, 7, 9, 5, 9, 5, 9, 7, 9, 7, 10, 9, 9],
		name: '时间分布',
		type: 'bar',
		// color: {
		// 	type: 'radial',
		// 	x: 0.5,
		// 	y: 0.5,
		// 	r: 3,
		// 	colorStops: [{
		// 		offset: 0,
		// 		color: 'rgba(233, 209, 181, 1)' // 0% 处的颜色
		// 	}, {
		// 		offset: 1,
		// 		color: 'rgba(95, 63, 43, 1)' // 100% 处的颜色
		// 	}],
		// }
		color: '#ffe78f',
	}]
};

timedist_graph_option && timedist_graph.setOption(timedist_graph_option);
