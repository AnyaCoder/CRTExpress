var TopGoodsWeightCities_graph = echarts.init(document.getElementById("TopGoodsWeightCities_graph"), 'purple-passion');
var TopGoodsWeightCities_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '货物重量Top5 城市',
		textStyle: {
			color: '#FF770F',
		},
		left: 'right',
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		top: '12%',
		left: 'center',
		show: false,
	},
	grid: {
		left: '3%',
		right: '4%',
		top: '12%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		boundaryGap: [0, 0.01],
		show: false,
		inverse: true,
	},
	yAxis: {
		type: 'category',
		position: 'right',
		axisLabel: {
			color: '#FF770F',
			fontWeight: 'bold',
			fontStyle: 'oblique',
			fontSize: 15
		},
		data: ['北京', '广东', '杭州', '山西', '南京'],
		inverse: true,
	},
	series: [{
		name: '货物重量',
		type: 'bar',
		color: '#FF770F',
		data: [17883, 16334, 15555, 12345, 9870]
	}]
};
TopGoodsWeightCities_graph.setOption(TopGoodsWeightCities_graph_option);
