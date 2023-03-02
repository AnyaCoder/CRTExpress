// for vue creating
var train_boxplot_graph_ctrl = new Vue({
	el: '#train_boxplot_graph_ctrl',
	data() {
		return {
			options: [{
				value: '0',
				label: '阿拉山口'
			}, {
				value: '1',
				label: '霍尔果斯'
			}, {
				value: '2',
				label: '二连浩特'
			}, {
				value: '3',
				label: '满洲里'
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
				$.post('/train_boxplot', data).done(function(data) {
					console.log(data)
					train_boxplot_graph.setOption({
						xAxis: {
							type: 'category',
							boundaryGap: true,
							data: data['time']
						},
						series: [{
								name: '接入量',
								type: 'line',
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
