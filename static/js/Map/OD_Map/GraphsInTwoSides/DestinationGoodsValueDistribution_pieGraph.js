var DestinationGoodsValueDistribution_pieGraph = echarts.init(document.getElementById(
	"DestinationGoodsValueDistribution_pieGraph"), 'chalk');

var DestinationGoodsValueDistribution_pieGraph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '目的地：苏黎世',
		subtext: '数量(内环)/重量(外环) 分布',
		left: 'center',
		top: '-1%',
		textStyle: {
			color: '#10AEC2',
			// fontStyle: 'oblique',
			// fontWeight: 'bold'
		},
		subtextStyle: {
			color: '#ffffff',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15,
		},
	},
	legend: {
		bottom: '-3%',
		// orient: 'vertical',
		left: '4%',
		width: '90%',
		textStyle: {
			color: '#ffffff',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 12
		},
		type: 'scroll',
		pageIconInactiveColor: 'rgba(117, 193, 196, 1)',
		pageIconColor: 'rgba(229, 168, 75, 1)',
		pageTextStyle: {
			color: '#ffffff',
		},
	},
	tooltip: {
		trigger: 'item'
	},
	series: [{
			labelLine: {
				show: false
			},
			label: {
				show: false,
				position: 'center'
			},
			name: '货物重量/t',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '55%'],
			// roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			data: [{
					value: 10,
					name: '生活用品',
				},
				{
					value: 20,
					name: '食用品'
				},
				{
					value: 70,
					name: '矿产品'
				},
				{
					value: 66,
					name: '武器火药',
				},
			]
		},
		{
			labelLine: {
				show: false
			},
			label: {
				show: false,
				position: 'center'
			},
			name: '货物数量/个',
			type: 'pie',
			radius: ['0%', '35%'],
			center: ['50%', '55%'],
			// roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			data: [{
					value: 15,
					name: '生活用品'
				},
				{
					value: 33,
					name: '食用品'
				},
				{
					value: 81,
					name: '矿产品'
				},
				{
					value: 66,
					name: '武器火药',
				},
			]
		},
	]
}
DestinationGoodsValueDistribution_pieGraph.setOption(DestinationGoodsValueDistribution_pieGraph_option);
