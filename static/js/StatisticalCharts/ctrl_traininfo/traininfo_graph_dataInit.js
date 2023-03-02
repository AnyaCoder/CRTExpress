function traininfo_graph_dataInit() {
	var data = {
		'port': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01',
		'interval': 'DAY'
	}
	// console.log('trainInfo: ', data)
	$.post('/traininfo_data', data).done(function(data) {
		// console.log('trainInfo: ', data)
		traininfo_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: true,
				data: data['time']
			},
			series: [{
					name: '接入量',
					type: 'bar',
					data: data['in']
				},
				{
					name: '发出量',
					type: 'bar',
					data: data['out']
				}, {
					name: '接入量line',
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
					name: '发出量line',
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
traininfo_graph_dataInit();
