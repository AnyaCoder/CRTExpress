function goods_graph_dataInit() {
	var data = {
		kind: '生活用品',
		start: '2021-01-01',
		end: '2021-12-31',
		interval: 2
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
goods_graph_dataInit();
