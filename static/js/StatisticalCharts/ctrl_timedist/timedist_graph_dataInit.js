function timedist_graph_dataInit() {
	var data = {
		'port': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01'
	}
	$.post('/timedist_data', data).done(function(data) {
		// console.log(data)
		timedist_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: data['labels']
			},
			series: [{
				type: 'bar',
				data: data['data']
			}, ]
		})
	})
}
timedist_graph_dataInit();
