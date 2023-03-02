var SourceOfSupplyGoodsValueDistribution_pieGraph = echarts.init(document.getElementById(
	"SourceOfSupplyGoodsValueDistribution_pieGraph"), 'purple-passion');

var SourceOfSupplyGoodsValueDistribution_pieGraph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '货源地：北京',
		subtext: '数量(内环)/重量(外环) 分布',
		right: 'center',
		top: '-1%',
		textStyle: {
			color: '#EE3F4D',
			// fontStyle: 'oblique',
			// fontWeight: 'bold'
		},
		subtextStyle: {
			color: '#ffffff',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15,
			rich: {
				align: 'right',
			}
		},
	},
	legend: {
		bottom: '-3%',
		// orient: 'vertical',
		// top: '-1%',
		right: '0%',
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
					value: 30,
					name: '生活用品'
				},
				{
					value: 60,
					name: '食用品'
				},
				{
					value: 55,
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
					value: 40,
					name: '生活用品'
				},
				{
					value: 55,
					name: '食用品'
				},
				{
					value: 44,
					name: '矿产品'
				},
				{
					value: 66,
					name: '武器火药',
				},
			]
		},
	]
};
SourceOfSupplyGoodsValueDistribution_pieGraph.setOption(SourceOfSupplyGoodsValueDistribution_pieGraph_option);
