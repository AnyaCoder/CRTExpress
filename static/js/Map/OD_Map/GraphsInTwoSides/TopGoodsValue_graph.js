var TopGoodsValue_graph = echarts.init(document.getElementById("TopGoodsValue_graph"), 'macarons');
var TopGoodsValue_graph_option = {
	title: {
		text: '货物 数量(内环)/重量(外环) 分布图',
		left: '20%',
		top: '12%',
		textStyle: {
			color: '#ffccd7',
			// fontStyle: 'oblique',
			// fontWeight: 'bold'
		}
	},
	backgroundColor: 'transparent',
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b}: {c} ({d}%)'
	},
	legend: {
		data: [
			'生活用品',
			'食用品',
			'矿产品',
			'化工产品',
			'材料制品',
			'服装首饰',
			'金属制品',
			'电子产品',
			'运输工具',
			'武器火药',
			'杂项制品',
			'文画古藏'
		],
		textStyle: {
			color: 'white',
			// fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15
		},
		orient: 'vertical',
		height: '60%',
		right: '45%',
		top: '32%',
		// bottom: '0%',
	},
	series: [{
			name: '货物数量/个',
			type: 'pie',
			selectedMode: 'single',
			radius: [0, '30%'],
			center: ['20%', '60%'],
			label: {
				show: false,
				position: 'inner',
				fontSize: 14
			},
			labelLine: {
				show: false
			},
			data: [{
					value: 108,
					name: '生活用品'
				},
				{
					value: 335,
					name: '食用品'
				},
				{
					value: 310,
					name: '矿产品'
				},
				{
					value: 251,
					name: '化工产品'
				},
				{
					value: 234,
					name: '材料制品'
				},
				{
					value: 147,
					name: '服装首饰'
				},
				{
					value: 135,
					name: '金属制品'
				},
				{
					value: 102,
					name: '电子产品'
				},
				{
					value: 102,
					name: '运输工具'
				},
				{
					value: 102,
					name: '武器火药'
				},
				{
					value: 102,
					name: '杂项制品'
				},
				{
					value: 102,
					name: '文画古藏'
				}
			]
		},
		{
			name: '货物重量/t',
			type: 'pie',
			radius: ['45%', '62%'],
			center: ['20%', '60%'],
			labelLine: {
				show: false,
				length: 30
			},
			label: {
				show: false,
				formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
				backgroundColor: '#F6F8FC',
				borderColor: '#8C8D8E',
				borderWidth: 1,
				borderRadius: 4,
				rich: {
					a: {
						color: '#6E7079',
						lineHeight: 22,
						align: 'center'
					},
					hr: {
						borderColor: '#8C8D8E',
						width: '100%',
						borderWidth: 1,
						height: 0
					},
					b: {
						color: '#4C5058',
						fontSize: 14,
						fontWeight: 'bold',
						lineHeight: 33
					},
					per: {
						color: '#fff',
						backgroundColor: '#4C5058',
						padding: [3, 4],
						borderRadius: 4
					}
				}
			},
			data: [{
					value: 108,
					name: '生活用品'
				},
				{
					value: 335,
					name: '食用品'
				},
				{
					value: 310,
					name: '矿产品'
				},
				{
					value: 251,
					name: '化工产品'
				},
				{
					value: 234,
					name: '材料制品'
				},
				{
					value: 147,
					name: '服装首饰'
				},
				{
					value: 135,
					name: '金属制品'
				},
				{
					value: 102,
					name: '电子产品'
				},
				{
					value: 102,
					name: '运输工具'
				},
				{
					value: 102,
					name: '武器火药'
				},
				{
					value: 102,
					name: '杂项制品'
				},
				{
					value: 102,
					name: '文画古藏'
				}
			]
		}
	]
};
TopGoodsValue_graph.setOption(TopGoodsValue_graph_option);
