function OD_GraphDataInit() {
	if (selectInfo.value_kind == undefined || selectInfo.value_time[0] == undefined || selectInfo.value_time[1] ==
		undefined || selectInfo.value_dim == undefined) {
		return
	}
	// BrokenLineGraphDataOperation(selectInfo.value_kind, selectInfo.value_time[0], selectInfo.value_time[1]);
	// BarGraphDataOperation(selectInfo.value_kind, selectInfo.value_time[0], selectInfo.value_time[1]);
	TopGoodsValueGraph_DataOperation(selectInfo.value_kind, selectInfo.value_time[0], selectInfo.value_time[1]);
	TopGoodsNumFlowChange_graphDataUpdate(selectInfo.value_time[0], selectInfo.value_time[1]);
	// GraphsInTwoSidesDataUpdate(OD_PortNumberToPortName(selectInfo.value_port), selectInfo.value_time[0], selectInfo
	// 	.value_time[1], 'DAY');
}
OD_GraphDataInit();
