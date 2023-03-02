var train_boxplot_graph = echarts.init(document.getElementById('train_boxplot-container'));
var train_boxplot_graph_option;

// Generate data.
function makeData() {
	let data = [];
	for (let i = 0; i < 18; i++) {
		let cate = [];
		for (let j = 0; j < 100; j++) {
			cate.push(Math.random() * 10);
		}
		data.push(cate);
	}
	return data;
}
const data0 = makeData();
const data1 = makeData();
const data2 = makeData();
train_boxplot_graph_option = {
	title: {
		text: '班列通行各部分时间 盒须图',
		left: 'center',
		textStyle: {
			color: '#545c64',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 24
		},
	},
	dataset: [{
			source: data0
		},
		{
			source: data1
		},
		{
			source: data2
		},
		{
			fromDatasetIndex: 0,
			transform: {
				type: 'boxplot'
			}
		},
		{
			fromDatasetIndex: 1,
			transform: {
				type: 'boxplot'
			}
		},
		{
			fromDatasetIndex: 2,
			transform: {
				type: 'boxplot'
			}
		}
	],
	legend: {
		top: '10%',
		textStyle: {
			// color: '#bee0d0',
			color: '#545c64',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 12
		},
	},
	tooltip: {
		trigger: 'item',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '10%',
		top: '20%',
		right: '10%',
		bottom: '15%'
	},
	xAxis: {
		type: 'category',
		boundaryGap: true,
		nameGap: 30,
		splitArea: {
			show: true
		},
		splitLine: {
			show: false
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#545c64',
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
		name: 'Value',
		min: 0,
		max: 10,
		splitArea: {
			show: false
		},
		axisLabel: {
			color: '#283643',
			fontStyle: 'oblique',
			fontWeight: 'bold'
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: '#545c64',
				width: 3
			}
		},
	},

	series: [{
			name: '列车通行时间',
			type: 'boxplot',
			datasetIndex: 3,
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: 'rgba(202, 220, 182)' // 0% 处的颜色
			// 	}, {
			// 		offset: 1,
			// 		color: 'rgba(227, 235, 152)' // 100% 处的颜色
			// 	}],
			// }
			color: 'rgba(231, 177, 64, 1)',
		},
		{
			name: '报关取票时间',
			type: 'boxplot',
			datasetIndex: 4,
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: 'rgba(157, 157, 130)' // 0% 处的颜色
			// 	}, {
			// 		offset: 1,
			// 		color: 'rgba(108, 169, 132)' // 100% 处的颜色
			// 	}],
			// }
			color: 'rgba(178, 182, 182, 1)',
		},
		{
			name: '通关时间',
			type: 'boxplot',
			datasetIndex: 5,
			// color: {
			// 	type: 'radial',
			// 	x: 0.9,
			// 	y: 0.9,
			// 	r: 3,
			// 	colorStops: [{
			// 		offset: 0,
			// 		color: 'rgba(63, 80, 59)' // 0% 处的颜色
			// 	}, {
			// 		offset: 1,
			// 		color: 'rgba(69, 73, 61)' // 100% 处的颜色
			// 	}],
			// }
			color: 'rgba(117, 193, 196, 1)',
		}
	]
};

train_boxplot_graph_option && train_boxplot_graph.setOption(train_boxplot_graph_option);
