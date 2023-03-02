// var geocoder = new AMap.Geocoder({
//city: "010", //城市设为北京，默认：“全国”
// });
var selectInfo = new Vue({
	el: '#selectCtrl',
	data() {
		return {
			// options: [{
			// 	value: '活动物',
			// 	label: '活动物'
			// }, {
			// 	value: '植物产品',
			// 	label: '植物产品'
			// }, {
			// 	value: '动、植物油、脂及其分解品；精制的食用油脂；动、植物蜡',
			// 	label: '动、植物油、脂及其分解品；精制的食用油脂；动、植物蜡'
			// }, {
			// 	value: '食品；饮料、酒及醋；烟草及烟草代用品的制品',
			// 	label: '食品；饮料、酒及醋；烟草及烟草代用品的制品'
			// }, {
			// 	value: '矿产品',
			// 	label: '矿产品'
			// }, {
			// 	value: '化学工业及其相关工业的产品',
			// 	label: '化学工业及其相关工业的产品'
			// }, {
			// 	value: '塑料及其制品；橡胶及其制品',
			// 	label: '塑料及其制品；橡胶及其制品'
			// }, {
			// 	value: '生皮、皮革、毛皮及其制品；鞍具及挽具；旅行用品、手提包及类似容器；动物肠线（蚕胶丝除外）制品',
			// 	label: '生皮、皮革、毛皮及其制品；鞍具及挽具；旅行用品、手提包及类似容器；动物肠线（蚕胶丝除外）制品'
			// }, {
			// 	value: '木及木制品；木炭；软木及软木制品；稻草、秸秆、针茅或其他编结材料制品；篮筐及柳条编结品',
			// 	label: '木及木制品；木炭；软木及软木制品；稻草、秸秆、针茅或其他编结材料制品；篮筐及柳条编结品'
			// }, {
			// 	value: '木浆及其他纤维状纤维素浆；回收（废碎）纸或纸板；纸、纸板及其制品',
			// 	label: '木浆及其他纤维状纤维素浆；回收（废碎）纸或纸板；纸、纸板及其制品'
			// }, {
			// 	value: '纺织原料及纺织制品',
			// 	label: '纺织原料及纺织制品'
			// }, {
			// 	value: '鞋、帽、伞、杖、鞭及其零件；已加工的羽毛及其制品；人造花；人发制品',
			// 	label: '鞋、帽、伞、杖、鞭及其零件；已加工的羽毛及其制品；人造花；人发制品'
			// }, {
			// 	value: '石料、石膏、水泥、石棉、云母及类似材料的制品；陶瓷产品；玻璃及其制品',
			// 	label: '石料、石膏、水泥、石棉、云母及类似材料的制品；陶瓷产品；玻璃及其制品'
			// }, {
			// 	value: '天然或养殖珍珠、宝石或半宝石、贵金属、包贵金属及其制品；仿首饰；硬币',
			// 	label: '天然或养殖珍珠、宝石或半宝石、贵金属、包贵金属及其制品；仿首饰；硬币'
			// }, {
			// 	value: '贱金属及其制品',
			// 	label: '贱金属及其制品'
			// }, {
			// 	value: '机器、机器器具、电气设备及其零件；录音机及放声机、电视图像、声音的录制和重放设备及其零件、附件',
			// 	label: '机器、机器器具、电气设备及其零件；录音机及放声机、电视图像、声音的录制和重放设备及其零件、附件'
			// }, {
			// 	value: '车辆、航空器、船舶及有关运输设备',
			// 	label: '车辆、航空器、船舶及有关运输设备'
			// }, {
			// 	value: '光学、照相、电影、计量、检验、医疗或外科用仪器及设备、精密仪器及设备；钟表；乐器；上述物品的零件、附件',
			// 	label: '光学、照相、电影、计量、检验、医疗或外科用仪器及设备、精密仪器及设备；钟表；乐器；上述物品的零件、附件'
			// }, {
			// 	value: '武器、弹药及其零件、附件',
			// 	label: '武器、弹药及其零件、附件'
			// }, {
			// 	value: '杂项制品',
			// 	label: '杂项制品'
			// }, {
			// 	value: '艺术品、收藏品及古物',
			// 	label: '艺术品、收藏品及古物'
			// }, {
			// 	value: '特殊交易品及未分类商品',
			// 	label: '特殊交易品及未分类商品'
			// }],
			options: [{
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
			value_kind: '电子产品',
			value_time: ['2021-01-01', '2021-12-31'],
			value_dim: '商品数量',
			value_port: 0,
		}
	},
	methods: {
		PortsCirculationProgressShow(val) {
			if (val == 0) {
				return "阿拉山口（境）";
			}
			if (val == 1) {
				return "霍尔果斯（境）";
			}
			if (val == 2) {
				return "满洲里（境）";
			}
			if (val == 3) {
				return "二连（境）";
			}
			if (val == 4) {
				return "绥芬河（境）";
			}
			if (val == 5) {
				return "凭祥（境）";
			}
		},

		GoodsKindChange() {
			if (this.value_kind == undefined || this.value_time[0] == undefined || this.value_time[1] ==
				undefined || this.value_dim == undefined) {
				return
			}
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			OD_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1], this.value_dim);
			HY_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);

			// clearInterval(FromCityValChange_dataUpdate_interval);
			FromCityValChange_dataUpdate();
			// setInterval(FromCityValChange_dataUpdate, 5000);
		},

		DateChange() {
			if (this.value_kind == undefined || this.value_time[0] == undefined || this.value_time[1] ==
				undefined || this.value_dim == undefined) {
				return
			}
			// BarGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			TopGoodsValueGraph_DataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
			OD_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1], this.value_dim);
			// console.log('selectInfo: ', PortNumberToPortName(this.value_port), this.value_time[0], this
			// 	.value_time[1], 'DAY')

			CitiesGoodsValDistribution_graphDataUpdate(PortNumberToPortName(this.value_port), this.value_time[
				0], this.value_time[1], 'DAY');
			TopGoodsValCities_graphDataUpdate();

			// clearInterval(FromCityValChange_dataUpdate_interval);
			FromCityValChange_dataUpdate();
			// setInterval(FromCityValChange_dataUpdate, 5000);
		},

		DimChange() {
			if (this.value_kind == undefined || this.value_time[0] == undefined || this.value_time[1] ==
				undefined || this.value_dim == undefined) {
				return
			}
			OD_MapDataOperation(this.value_kind, this.value_time[0], this.value_time[1], this.value_dim);
		},

		SliderChange() {
			if (this.value_kind == undefined || this.value_time[0] == undefined || this.value_time[1] ==
				undefined || this.value_dim == undefined) {
				return
			}
			// BrokenLineGraphDataOperation(this.value_kind, this.value_time[0], this.value_time[1]);
		},

	}
})

// function GraphDataCirculationShow() {
// 	if (selectInfo.value_port == 3) {
// 		selectInfo.value_port = 0;
// 	} else {
// 		selctInfo.value_port = selectInfo.value_port + 1;
// 	}
// 	GraphsInTwoSidesDataUpdate(PortNumberToPortName(selectInfo.value_port), selectInfo.value_time[0], selectInfo
// 		.value_time[1], 'DAY')
// }

// setInterval(GraphDataCirculationShow(), 3000);
