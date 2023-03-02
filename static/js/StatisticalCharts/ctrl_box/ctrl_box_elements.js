// for vue creating
var box_graph_ctrl = new Vue({
	el: '#box_graph_ctrl',
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
				$.post('/box_data', data).done(function(data) {
					console.log(data)
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
		},

	},
})
