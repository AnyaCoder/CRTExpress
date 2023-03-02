var PortOperationAbility_radarGraph = echarts.init(document.getElementById('PortOperationAbility_radarGraph'), 'dark');
var PortOperationAbility_radarGraph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '口岸作业图',
		left: '8%',
		textStyle: {
			color: '#afd7ec'
		}
	},
	legend: {
		data: [''],
		orient: 'vertical',
		right: '15%',
		top: '0%',
	},
	radar: {
		shape: 'circle',
		alignTicks: false,
		indicator: [{
				name: '集装箱纳入',
				color: '#ffccd7',
				// max: 27860 / 2,
			},
			{
				name: '班列接入量',
				color: 'rgba(242, 200, 103)',
				// max: 11852 / 2,
			},
			{
				name: '集装箱滞留',
				color: '#f6a09a',
				// max: 588 / 2,
			},
			{
				name: '集装箱发出',
				color: '#c5eacd',
				// max: 27716 / 2,
			},
			{
				name: '班列发出量',
				color: '#8fd1e1',
				// max: 11920 / 2,
			},
			{
				name: '列车通行',
				color: '#bccf90',
				// max: 11768 / 2,
			}
		]
	},
	series: [{
		type: 'radar',
		data: [
			[500, 500, 500, 500, 500, 500],
		],
		name: '',
		itemStyle: {
			color: 'rgb(238, 197, 102)'
		},
		areaStyle: {
			opacity: 0.65,
			color: 'rgb(238, 197, 102)'
		}
	}]
}
PortOperationAbility_radarGraph && PortOperationAbility_radarGraph.setOption(PortOperationAbility_radarGraph_option);

// 副本
// var PortOperationAbility_radarGraph_option_copy = {
// 	backgroundColor: 'transparent',
// 	title: {
// 		text: '口岸作业图',
// 		left: '8%',
// 		textStyle: {
// 			color: '#afd7ec'
// 		}
// 	},
// 	legend: {
// 		data: ['阿拉山口(境)'],
// 		orient: 'vertical',
// 		right: '15%',
// 		top: '0%',
// 	},
// 	radar: {
// 		shape: 'circle',
// 		indicator: [{
// 				name: '集装箱纳入',
// 				color: '#ffccd7',
// 				max: 27860 / 2,
// 			},
// 			{
// 				name: '班列接入量',
// 				color: 'rgba(242, 200, 103)',
// 				max: 11852 / 2,
// 			},
// 			{
// 				name: '集装箱滞留',
// 				color: '#f6a09a',
// 				max: 588.956 / 2,
// 			},
// 			{
// 				name: '集装箱发出',
// 				color: '#c5eacd',
// 				max: 27716 / 2,
// 			},
// 			{
// 				name: '班列发出量',
// 				color: '#8fd1e1',
// 				max: 11920 / 2,
// 			},
// 			{
// 				name: '列车通行',
// 				color: '#bccf90',
// 				max: 11768 / 2,
// 			}
// 		]
// 	},
// 	series: [{
// 		name: '口岸',
// 		type: 'radar',
// 		itemStyle: {
// 			lineStyle: {
// 				width: 3
// 			},
// 		},
// 		areaStyle: {},
// 		symbol: 'none',
// 		data: [{
// 			value: [6965, 2963, 147.239, 6929, 2980, 2942],
// 			name: '阿拉山口(境)'
// 		}]
// 	}]
// };
