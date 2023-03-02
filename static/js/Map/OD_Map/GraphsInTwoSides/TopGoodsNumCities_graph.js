var TopGoodsNumCities_graph = echarts.init(document.getElementById("TopGoodsNumCities_graph"), 'purple-passion');
var TopGoodsNumCities_graph_option = {
	backgroundColor: 'transparent',
	title: {
		text: '货物数量Top5 城市',
		textStyle: {
			color: '#80D1CB',
		},
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
	},
	yAxis: {
		type: 'category',
		axisLabel: {
			color: '#80D1CB',
			fontStyle: 'oblique',
			fontWeight: 'bold',
			fontSize: 15
		},
		data: ['上海', '北京', '杭州', '山西', '南京']
	},
	series: [{
		name: '货物数量',
		type: 'bar',
		color: '#80D1CB',
		data: [18203, 23489, 29034, 104970, 131744]
	}]
};
TopGoodsNumCities_graph.setOption(TopGoodsNumCities_graph_option);
