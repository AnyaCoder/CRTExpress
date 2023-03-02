var goods_graph_ctrl = new Vue({
	el: '#infoSelect_button',
	data() {
		return {
			options: [{
				value: '生活用品',
				label: '生活用品'
			}, {
				value: '防疫物资',
				label: '防疫物资'
			}, {
				value: '食用品',
				label: '食用品'
			}, {
				value: '矿产品',
				label: '矿产品'
			}, {
				value: '化工产品',
				label: '化工产品'
			}, {
				value: '材料制品',
				label: '材料制品'
			}, {
				value: '服装首饰',
				label: '服装首饰'
			}, {
				value: '金属制品',
				label: '金属制品'
			}, {
				value: '电子产品',
				label: '电子产品'
			}, {
				value: '运输工具',
				label: '运输工具'
			}, {
				value: '武器火药',
				label: '武器火药'
			}, {
				value: '杂项制品',
				label: '杂项制品'
			}, {
				value: '文画古藏',
				label: '文画古藏'
			}],
			interval: 2,
			intervalMarks: {
				0: '日',
				1: '周',
				2: '月',
				3: '年',
			},
			value: '生活用品',
			value1: '',
			value2: ['2021-01-01 00:00:00', '2021-12-31 00:00:00'],
		}
	},
	methods: {
		sliderFormat(val) {
			if (val == 0) {
				return 'day';
			}
			if (val == 1) {
				return 'week';
			}
			if (val == 2) {
				return 'month';
			}
			if (val == 3) {
				return 'year';
			}
		},
		selectChange() {
			data = {
				kind: this.value,
				start: this.value2[0],
				end: this.value2[1],
				interval: this.interval
			}
			$.post('/G2_BarGraph_data', data).done(function(data) {
				GoodsValueDistribution_graph_option["yAxis"]["data"] = data.kind;
				GoodsValueDistribution_graph_option["series"][0]["data"] = data.num;
				GoodsValueDistribution_graph_option["series"][1]["data"] = data.weight;
				GoodsValueDistribution_graph.setOption(GoodsValueDistribution_graph_option);
			})
			$.post('/G2_BrokenLineGraph_data', data).done(function(data) {
				GoodsFlowChange_graph_option["xAxis"][0]["data"] = data["time"];
				GoodsFlowChange_graph_option["series"][0]["data"] = data["num"];
				GoodsFlowChange_graph_option["series"][1]["data"] = data["weight"];
				GoodsFlowChange_graph.setOption(GoodsFlowChange_graph_option);
			})
		}
	}
})
