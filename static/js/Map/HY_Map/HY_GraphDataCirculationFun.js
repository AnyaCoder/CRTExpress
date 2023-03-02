// 雷达图口岸循环变量
var radarGraph_port_num = 0;
// var toPortNameList = ['阿拉山口(境)', '霍尔果斯(境)', '满洲里(境)', '二连(境)', '绥芬河(境)', '凭祥(境)'];
var toPortNameList = ['霍尔果斯(境)', '满洲里(境)', '二连(境)', '绥芬河(境)'];
// var POA_radarGraph_colorsMatching = ['#002EA6', '#FFE76F', '#FF770F', '#91B822', '#80D1CB', '#CDA59E'];
var POA_radarGraph_colorsMatching = ['#FFE76F', '#FF770F', '#91B822', '#80D1CB'];

function HY_ToPortNumToName(val) {
	if (val == 0) {
		return "阿拉山口(境)";
	}
	if (val == 1) {
		return "霍尔果斯(境)";
	}
	if (val == 2) {
		return "满洲里(境)";
	}
	if (val == 3) {
		return "二连(境)";
	}
	if (val == 4) {
		return "绥芬河(境)";
	}
	if (val == 5) {
		return "凭祥(境)";
	}
}

function HY_FromPortNumToName(val) {
	if (val == 0) {
		return '七苏木';
	}
	if (val == 1) {
		return '三坪';
	}
	if (val == 2) {
		return '下元';
	}
}

function IntervalNumToName(val) {
	if (val == 0) {
		return "DAY";
	}
	if (val == 1) {
		return "WEEK";
	}
	if (val == 2) {
		return "MONTH";
	}
}

function GraphsInTwoSidesDataUpdate(value_port, start_time, end_time, interval) {
	var data = {
		'port': value_port,
		'start_time': start_time,
		'end_time': end_time,
		'interval': interval
	}
	var TrainPlanGraphData = {
		'start_time': start_time,
		'end_time': end_time,
		'dep': '三坪',
		'des': "霍尔果斯(境)",
		'interval': 'WEEK'
	}
	// console.log('selectinfo: ', data);

	// 班列接入发出量图表数据更新
	// 因数据问题，粒度设置为'MONTH'
	$.post('/traininfo_data', {
		'port': value_port,
		'start_time': start_time,
		'end_time': end_time,
		'interval': "MONTH"
	}).done(function(data) {
		// console.log(data)
		TrainNumInOut_graph_option.xAxis.data = data['time'];
		TrainNumInOut_graph_option.series[0].data = data['in'];
		TrainNumInOut_graph_option.series[1].data = data['out'];
		TrainNumInOut_graph.setOption(TrainNumInOut_graph_option);
	})

	// 列车各环节时间分布图表数据更新
	$.post('/traintime_data', data).done(function(data) {
		// console.log(data)
		TrainPartsTimeDistribution_graph_option.xAxis.data = data['labels'];
		TrainPartsTimeDistribution_graph_option.series[0].data = data['data_through'];
		TrainPartsTimeDistribution_graph_option.series[1].data = data['data_ticket'];
		TrainPartsTimeDistribution_graph_option.series[2].data = data['data_custom'];
		TrainPartsTimeDistribution_graph.setOption(TrainPartsTimeDistribution_graph_option);
	})

	// 集装箱滞留时间图表数据更新
	$.post('/timespan_data', data).done(function(data) {
		// console.log(data)
		BoxRetentionTimeChange_graph_option.xAxis.data = data['time'];
		BoxRetentionTimeChange_graph_option.series[0].data = data['max'];
		BoxRetentionTimeChange_graph_option.series[1].data = data['min'];
		BoxRetentionTimeChange_graph_option.series[2].data = data['avg'];
		BoxRetentionTimeChange_graph.setOption(BoxRetentionTimeChange_graph_option);
	})

	// 集装箱滞留时间分布图表数据更新
	$.post('/timedist_data', data).done(function(data) {
		// console.log(data)
		BoxRetentionTimeDistribution_graph_option.yAxis.data = data['labels'];
		BoxRetentionTimeDistribution_graph_option.series[0].data = data['data'];
		BoxRetentionTimeDistribution_graph.setOption(BoxRetentionTimeDistribution_graph_option);
	})

	// 集装箱接入发出量图表数据更新
	$.post('/box_data', data).done(function(data) {
		// console.log(data)
		BoxNumInOutChange_graph_option.xAxis.data = data['time'];
		BoxNumInOutChange_graph_option.series[0].data = data['in'];
		BoxNumInOutChange_graph_option.series[1].data = data['out'];
		BoxNumInOutChange_graph.setOption(BoxNumInOutChange_graph_option);
	})

	// 班列计划开行与实际开行图表数据更新
	$.post('/trainplan_data', TrainPlanGraphData).done(function(data) {
		// console.log(data)
		TrainExpectedAndActualPlan_graph_option.xAxis.data = data['time'];
		TrainExpectedAndActualPlan_graph_option.series[0].data = data['plan'];
		TrainExpectedAndActualPlan_graph_option.series[1].data = data['real'];
		TrainExpectedAndActualPlan_graph.setOption(TrainExpectedAndActualPlan_graph_option);
	})
}

function GraphDataCirculationShow() {
	// console.log(selectInfo.value_port);
	if (HY_ToPortNum == 5) {
		HY_ToPortNum = 0;
	} else {
		HY_ToPortNum += 1;
	}
	GraphsInTwoSidesDataUpdate(HY_ToPortNumToName(HY_ToPortNum), selectInfo.value_time[0], selectInfo.value_time[1],
		'DAY');
}


function POA_radarGraph_DataCirculationShow() {
	if (radarGraph_port_num == 3) {
		radarGraph_port_num = 0;
	} else {
		radarGraph_port_num += 1;
	}

	var data = {
		'port': toPortNameList[radarGraph_port_num],
		'start_time': selectInfo.value_time[0],
		'end_time': selectInfo.value_time[1],
		'interval': 'Month'
	}

	$.ajax({
		url: '/POA_radarGraph_data',
		data: data,
		type: 'post',
		success: function(data) {
			PortOperationAbility_radarGraph_option.series[0].name = data['portName'];
			PortOperationAbility_radarGraph_option.legend.data = [data['portName']];
			// PortOperationAbility_radarGraph_option.radar.indicator[0].max = data['totalNum_boxIn'] / 2;
			// PortOperationAbility_radarGraph_option.radar.indicator[3].max = data['totalNum_boxOut'] / 2;
			// PortOperationAbility_radarGraph_option.radar.indicator[1].max = data['totalNum_trainIn'] / 2;
			// PortOperationAbility_radarGraph_option.radar.indicator[4].max = data['totalNum_trainOut'] / 2;
			// PortOperationAbility_radarGraph_option.radar.indicator[2].max = data['totalNum_avgTime'] / 2;
			// PortOperationAbility_radarGraph_option.radar.indicator[5].max = data['totalNum_throughTime'] / 2;
			PortOperationAbility_radarGraph_option.series[0].data = [
				[data['Num_boxIn'], data['Num_trainIn'], data[
					'Num_avgTime'], data['Num_boxOut'], data['Num_trainOut'], data[
					'Num_throughTime']]
			];
			// PortOperationAbility_radarGraph_option.series[0].data[0][0] = data['Num_boxIn'];
			// PortOperationAbility_radarGraph_option.series[0].data[0][3] = data['Num_boxOut'];
			// PortOperationAbility_radarGraph_option.series[0].data[0][1] = data['Num_trainIn'];
			// PortOperationAbility_radarGraph_option.series[0].data[0][4] = data['Num_trainOut'];
			// PortOperationAbility_radarGraph_option.series[0].data[0][2] = data['Num_avgTime'];
			// PortOperationAbility_radarGraph_option.series[0].data[0][5] = data['Num_throughTime'];
			PortOperationAbility_radarGraph_option.series[0]['itemStyle']['color'] =
				POA_radarGraph_colorsMatching[
					radarGraph_port_num];
			PortOperationAbility_radarGraph_option.series[0]['areaStyle']['color'] =
				POA_radarGraph_colorsMatching[
					radarGraph_port_num];
			PortOperationAbility_radarGraph.setOption(PortOperationAbility_radarGraph_option);
		},
		error: function() {
			PortOperationAbility_radarGraph_option.series[0]['itemStyle']['color'] =
				POA_radarGraph_colorsMatching[
					radarGraph_port_num];
			PortOperationAbility_radarGraph_option.series[0]['areaStyle']['color'] =
				POA_radarGraph_colorsMatching[
					radarGraph_port_num];
			PortOperationAbility_radarGraph.setOption(PortOperationAbility_radarGraph_option);
		}
	})

	// console.log(PortOperationAbility_radarGraph_option);

}

POA_radarGraph_DataCirculationShow();
GraphDataCirculationShow();
setInterval(GraphDataCirculationShow, 2000);
setInterval(POA_radarGraph_DataCirculationShow, 2000);
