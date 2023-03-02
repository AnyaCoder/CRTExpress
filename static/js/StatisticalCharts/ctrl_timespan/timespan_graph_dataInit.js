function timespan_graph_dataInit() {
	var data = {
		'port': '霍尔果斯(境)',
		'start_time': '2021-01-01',
		'end_time': '2022-01-01',
		'interval': 'DAY'
	}
	$.post('/timespan_data', data).done(function(data) {
		// console.log(data)
		timespan_graph.setOption({
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: data['time']
			},
			series: [{
					name: '最短时间',
					type: 'line',
					smooth: true,
					z: 2,
					// itemStyle: {
					// 	opacity: 0
					// },
					// lineStyle: {
					// 	opacity: 0
					// },
					// areaStyle: {
					// 	color: '#ffffff',
					// },
					data: data['min']
				},
				{
					name: '最长时间',
					type: 'line',
					smooth: true,
					z: 1,
					// itemStyle: {
					// 	opacity: 0
					// },
					// lineStyle: {
					// 	opacity: 0
					// },
					// areaStyle: {
					// 	color: '#000000',
					// 	opacity: 0.3
					// },
					data: data['max']
				},
				{
					name: '平均时间',
					type: 'line',
					smooth: true,
					// itemStyle: {
					// 	color: '#000'
					// },
					// lineStyle: {
					// 	color: '#000',
					// },
					data: data['avg']
				},
			]
		})
	})
}
timespan_graph_dataInit();
