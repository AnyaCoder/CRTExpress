function traintime_graph_dataInit() {
	var data = {
		'port': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01'
	}
	$.post('/traintime_data', data).done(function(data) {
		// console.log(data)
		traintime_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: data['labels']
			},
			series: [{
					name: '列车通行时间',
					type: 'bar',
					data: data['data_through']
				},
				{
					name: '报关取票时间',
					type: 'bar',
					data: data['data_ticket']
				},
				{
					name: '通关时间',
					type: 'bar',
					data: data['data_custom']
				},
			]
		})
	})
}
traintime_graph_dataInit();
