var radar_graph = echarts.init(document.getElementById('radar-container'));
var radar_graph_option;

radar_graph_option = {
	title: {
		text: '口岸雷达图',
		left: '15%',
		top: '5%',
		textStyle: {
			color: '#545c64',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 24
		},
	},
	legend: {
		data: ['阿拉山口', '霍尔果斯', '二连浩特', '满洲里'],
		textStyle: {
			// color: 'white',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			// fontSize: 12
		},
		orient: 'vertical',
		top: '10%',
		right: '15%'
	},
	radar: {
		// shape: 'circle',
		indicator: [{
				name: '集装箱纳入',
				// max: 4,
				color: '#144b5e',
			},
			{
				name: '班列接入量',
				// max: 4,
				color: '#144b5e',
			},
			{
				name: '集装箱滞留',
				// max: 4,
				color: '#144b5e',
			},
			{
				name: '集装箱发出',
				// max: 4,
				color: '#144b5e',
			},
			{
				name: '班列发出量',
				// max: 4,
				color: '#144b5e',
			},
			{
				name: '列车通行',
				// max: 4,
				color: '#144b5e',
			}
		]
	},
	series: [{
		name: '口岸',
		type: 'radar',
		itemStyle: {
			lineStyle: {
				width: 3 //设置线条粗细
			},
		},
		areaStyle: {},
		symbol: 'none',
		data: [{
				value: [2, 2, 2, 2, 2, 2],
				name: '阿拉山口',
				itemStyle: {
					color: '#e2d0d5'
				}
			},
			{
				value: [0, 0, 0, 2, 3, 3],
				name: '霍尔果斯',
				itemStyle: {
					color: '#db8fa2'
				}
			},
			{
				value: [3, 3, 4, 0, 0, 0],
				name: '二连浩特',
				itemStyle: {
					color: '#83cbdb'
				}
			},
			{
				value: [2, 3, 2, 1, 1, 1],
				name: '满洲里',
				itemStyle: {
					color: '#498ea5'
				}
			}
		]
	}]
};
radar_graph_option.series[0].data
radar_graph_option && radar_graph.setOption(radar_graph_option);
