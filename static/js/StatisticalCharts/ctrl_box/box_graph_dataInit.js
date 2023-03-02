function box_graph_dataInit() {
	var data = {
		'port': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01',
		'interval': 'DAY'
	}
	$.post('/box_data', data).done(function(data) {
		// console.log(data)
		Box_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: data['time']
			},
			series: [{
					name: '接入量',
					type: 'line',
					smooth: true,
					itemStyle: {
						lineStyle: {
							width: 3 //设置线条粗细
						},
					},
					data: data['in']
				},
				{
					name: '发出量',
					type: 'line',
					smooth: true,
					itemStyle: {
						lineStyle: {
							width: 3 //设置线条粗细
						},
					},
					data: data['out']
				}
			]
		})
	})
}
box_graph_dataInit();
