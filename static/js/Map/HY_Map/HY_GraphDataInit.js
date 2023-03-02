function HY_GraphDataInit() {
	if (selectInfo.value_time[0] == undefined || selectInfo.value_time[1] == undefined) {
		return
	}
	GraphsInTwoSidesDataUpdate(HY_ToPortNumToName(HY_ToPortNum), selectInfo.value_time[0], selectInfo.value_time[1],
		IntervalNumToName(temp_interval));
	POA_radarGraph_DataCirculationShow();
}

HY_GraphDataInit();
