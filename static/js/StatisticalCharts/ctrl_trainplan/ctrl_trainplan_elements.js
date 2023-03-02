// for vue creating
var trainplan_graph_ctrl = new Vue({
	el: '#trainplan_graph_ctrl',
	data() {
		return {
			options: [{
				value: '0',
				label: '七苏木'
			}, {
				value: '1',
				label: '三坪'
			}, {
				value: '2',
				label: '下元'
			}, {
				value: '3',
				label: '东孚'
			}, {
				value: '4',
				label: '中川北'
			}, {
				value: '5',
				label: '中鼎物流园'
			}, {
				value: '6',
				label: '中鼎物流园站'
			}, {
				value: '7',
				label: '义乌西'
			}, {
				value: '8',
				label: '乌西'
			}, {
				value: '9',
				label: '兰州东川'
			}, {
				value: '10',
				label: '兴隆山'
			}, {
				value: '11',
				label: '农中'
			}, {
				value: '12',
				label: '南宁南'
			}, {
				value: '13',
				label: '南康'
			}, {
				value: '14',
				label: '卧里屯'
			}, {
				value: '15',
				label: '合肥北'
			}, {
				value: '16',
				label: '吴家山'
			}, {
				value: '17',
				label: '团结村'
			}, {
				value: '18',
				label: '圃田'
			}, {
				value: '19',
				label: '城厢'
			}, {
				value: '20',
				label: '塔铺'
			}, {
				value: '21',
				label: '大朗'
			}, {
				value: '22',
				label: '尧化门'
			}, {
				value: '23',
				label: '平湖南'
			}, {
				value: '24',
				label: '新港'
			}, {
				value: '25',
				label: '新港(水)'
			}, {
				value: '26',
				label: '新港北'
			}, {
				value: '27',
				label: '新筑'
			}, {
				value: '28',
				label: '新香坊'
			}, {
				value: '29',
				label: '日照'
			}, {
				value: '30',
				label: '木里图'
			}, {
				value: '31',
				label: '朱保'
			}, {
				value: '32',
				label: '柳州南'
			}, {
				value: '33',
				label: '横岗'
			}, {
				value: '34',
				label: '武威南'
			}, {
				value: '35',
				label: '沈阳东'
			}, {
				value: '36',
				label: '泗亭'
			}, {
				value: '37',
				label: '洛阳'
			}, {
				value: '38',
				label: '济南南'
			}, {
				value: '39',
				label: '烟台'
			}, {
				value: '40',
				label: '王木匠'
			}, {
				value: '41',
				label: '石龙'
			}, {
				value: '42',
				label: '福山'
			}, {
				value: '43',
				label: '胶州'
			}, {
				value: '44',
				label: '苏州西'
			}, {
				value: '45',
				label: '董家镇'
			}, {
				value: '46',
				label: '衡阳南'
			}, {
				value: '47',
				label: '西安国际港'
			}, {
				value: '48',
				label: '赣州国际港'
			}, {
				value: '49',
				label: '远达'
			}, {
				value: '50',
				label: '连云港港口'
			}, {
				value: '51',
				label: '金华南'
			}, {
				value: '52',
				label: '金港'
			}, {
				value: '53',
				label: '铜山'
			}, {
				value: '54',
				label: '长沙北'
			}, {
				value: '55',
				label: '青岛港'
			}, {
				value: '56',
				label: '高邑'
			}, {
				value: '57',
				label: '鱼嘴'
			}, {
				value: '58',
				label: '鹰潭南'
			}, {
				value: '59',
				label: '黄许镇'
			}],
			valueSelect: '1',
			options2: [{
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
			valueSelect2: '1',
			valueDate: ['2021-01-01', '2022-01-01'],
			interval: 50,
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
			let dep = this.options[this.valueSelect].label
			let des = this.options2[this.valueSelect2].label
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
				'dep': dep,
				'des': des,
				'start_time': start_time,
				'end_time': end_time,
				'interval': intervalMark
			}
		},
		changeValue(val) {
			let data = this.prepareData();
			console.log(data);
			// console.log(data['start_time'] !== undefined, data['end_time'] !== undefined)
			if (data['start_time'] !== undefined && data['end_time'] !== undefined) {
				$.post('/trainplan_data', data).done(function(data) {
					console.log(data)
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
		},
	},
})
