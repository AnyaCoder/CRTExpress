// for vue creating
var traintime_graph_ctrl = new Vue({
	el: '#traintime_graph_ctrl',
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
			format: 'yyyy-MM-dd'
		}
	},
	methods: {
		prepareData() {
			let port = this.options[this.valueSelect].label
			let start_time, end_time;
			if (this.valueDate) {
				start_time = this.valueDate[0]
				end_time = this.valueDate[1]
			}
			return {
				'port': port,
				'start_time': start_time,
				'end_time': end_time
			}
		},
		changeValue(val) {
			let data = this.prepareData()
			if (data['start_time'] !== undefined && data['end_time'] !== undefined) {
				$.post('/traintime_data', data).done(function(data) {
					console.log(data)
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
		},

	},
})
