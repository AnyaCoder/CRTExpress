//Element UI 选择框数据
var selectInfo = new Vue({
	el: '#selectCtrl', //与div标签中的ID对应
	data() {
		return {
			options_kind: [{
				value: '生活用品',
				label: '生活用品'
			}, {
				value: '食用品',
				label: '食用品'
			}, {
				value: '矿产品',
				label: '矿产品'
			}, {
				value: '化工产品',
				label: '化工产品'
			}, {
				value: '材料制品',
				label: '材料制品'
			}, {
				value: '服装首饰',
				label: '服装首饰'
			}, {
				value: '金属制品',
				label: '金属制品'
			}, {
				value: '电子产品',
				label: '电子产品'
			}, {
				value: '运输工具',
				label: '运输工具'
			}, {
				value: '武器火药',
				label: '武器火药'
			}, {
				value: '杂项制品',
				label: '杂项制品'
			}, {
				value: '文画古藏',
				label: '文画古藏'
			}],
			options_dim: [{
				value: '商品数量',
				label: '商品数量'
			}, {
				value: '商品重量',
				label: '商品重量'
			}],
			options_io: [{
				value: '进口',
				label: '进口'
			}, {
				value: '出口',
				label: '出口'
			}, {
				value: '进口和出口',
				label: '进口和出口'
			}],
			options_dim: [{
				value: '商品数量',
				label: '商品数量'
			}, {
				value: '商品重量',
				label: '商品重量'
			}],
			value_kind: '武器火药',
			// value_io: '进口',
			value_time: ['2021-01-01', '2021-12-31'],
			// value_dim: '商品数量'
		}
	},
	methods: {
		GoodsKindChange() {
			if (this.value_kind === '' || this.value_io === '' || this.value_time === '' || this
				.value_dim === '') {
				return
			}
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			HY_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		},

		DateChange() {
			if (this.value_kind === '' || this.value_io === '' || this.value_time === '' || this
				.value_dim === '') {
				return
			}
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			// BarGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			HY_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		},

		IoChange() {
			if (this.value_kind === '' || this.value_io === '' || this.value_time === '' || this
				.value_dim === '') {
				return
			}
			HY_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		},

		DimChange() {
			if (this.value_kind === '' || this.value_io === '' || this.value_time === '' || this
				.value_dim === '') {
				return
			}
			HY_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		},

		SliderChange() {
			if (this.value_kind === '' || this.value_io === '' || this.value_time === '' || this
				.value_dim === '') {
				return
			}
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		}
	}
})
