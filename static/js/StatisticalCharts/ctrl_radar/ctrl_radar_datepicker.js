// for vue creating
var radar_graph_ctrl = new Vue({
	el: '#radar_graph_ctrl',
	data() {
		return {
			value: ['2021-01-01', '2022-01-01'],
			format: 'yyyy-MM-dd'
		};
	},
	methods: {
		getDatepicker(val) {
			console.log(this.value)
			let start_time;
			let end_time;
			if (this.value !== '') {
				start_time = this.value[0]
				end_time = this.value[1]
				console.log(start_time, end_time)
			}
			$.post('/radar_data', {
				'start_time': start_time,
				'end_time': end_time
			}).done(function(data) {
				radar_graph.setOption({
					series: [{
						name: '口岸',
						type: 'radar',
						itemStyle: {
							lineStyle: {
								width: 3 //设置线条粗细
							},
						},
						areaStyle: {
							normal: {}
						},
						symbol: 'none',
						data: [{
								value: data['阿拉山口'],
								name: '阿拉山口'
							},
							{
								value: data['霍尔果斯'],
								name: '霍尔果斯'
							},
							{
								value: data['满洲里'],
								name: '满洲里'
							},
							{
								value: data['二连浩特'],
								name: '二连浩特'
							}
						]
					}]
				})
			})
		}
	},
})
