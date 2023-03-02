function trainplan_graph_dataInit() {
	var data = {
		'dep': '三坪',
		'des': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01',
		'interval': 'WEEK'
	}
	$.post('/trainplan_data', data).done(function(data) {
		// console.log(data)
		trainplan_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: data['time']
			},
			series: [{
					name: '计划量',
					type: 'bar',
					data: data['plan']
				},
				{
					name: '实际量',
					type: 'bar',
					data: data['real']
				}
			]
		})
	})
}
trainplan_graph_dataInit();
