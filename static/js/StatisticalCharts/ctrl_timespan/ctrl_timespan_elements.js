// for vue creating
var timespan_graph_ctrl = new Vue({
	el: '#timespan_graph_ctrl',
	data() {
		return {
			options: [{
				value: '0',
				label: '阿拉山口(境)'
			}, {
				value: '1',
				label: '霍尔果斯(境)'
			}, {
				value: '2',
				label: '满洲里(境)'
			}, {
				value: '3',
				label: '二连(境)'
			}, {
				value: '4',
				label: '绥芬河(境)'
			}, {
				value: '5',
				label: '凭祥(境)'
			}],
			valueSelect: '1',
			valueDate: ['2021-01-01', '2022-01-01'],
			interval: 0,
			intervalMarks: {
				0: '天',
				50: '周',
				100: '月',
			},
			format: 'yyyy-MM-dd'
		}
	},
	methods: {
		sliderFormat(val) {
			if (val == 0) {
				return 'day';
			}
			if (val == 50) {
				return 'week';
			}
			if (val == 100) {
				return 'month';
			}
		},
		prepareData() {
			let port = this.options[this.valueSelect].label
			let start_time, end_time;
			let mark = {
				'天': 'DAY',
				'周': 'WEEK',
				'月': 'MONTH'
			}
			let intervalMark = mark[this.intervalMarks[this.interval]]
			if (this.valueDate) {
				start_time = this.valueDate[0]
				end_time = this.valueDate[1]
			}
			return {
				'port': port,
				'start_time': start_time,
				'end_time': end_time,
				'interval': intervalMark
			}
		},
		changeValue(val) {
			let data = this.prepareData()
			// console.log(data['start_time'] !== undefined, data['end_time'] !== undefined)
			if (data['start_time'] !== undefined && data['end_time'] !== undefined) {
				$.post('/timespan_data', data).done(function(data) {
					console.log(data)
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
								// 	opacity: 0,
								// 	color: '#F0C9CF'
								// },
								// lineStyle: {
								// 	opacity: 1,
								// 	color: '#F0C9CF'
								// },
								// areaStyle: {
								// 	color: '#F0C9CF',
								// },
								data: data['min']
							},
							{
								name: '最长时间',
								type: 'line',
								smooth: true,
								z: 1,
								// itemStyle: {
								// 	opacity: 0,
								// 	color: '#DE3F7C'
								// },
								// lineStyle: {
								// 	opacity: 1,
								// 	color: '#DE3F7C'
								// },
								// areaStyle: {
								// 	color: '#DE3F7C',
								// 	opacity: 0.3
								// },
								data: data['max']
							},
							{
								name: '平均时间',
								type: 'line',
								smooth: true,
								// itemStyle: {
								// 	color: '#F03752'
								// },
								// lineStyle: {
								// 	color: '#F03752',
								// },
								data: data['avg']
							},
						]
					})
				})
			}
		},

	},
})
