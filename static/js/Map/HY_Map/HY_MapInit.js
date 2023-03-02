//创建地图实例对象
var map = new AMap.Map('Map', {
	resizeEnable: true,
	center: [100.000923, 48.675807], //地图中心
	zoom: 3.3, //缩放级别
	mapStyle: 'amap://styles/dark'
});

var HY_circleMarkers = [];

$.post('/G1_data', {
	kind: selectInfo.value_kind,
	start: selectInfo.value_time[0],
	end: selectInfo.value_time[1],
}).done(function(data) {
	// 货源地
	for (var i = 0; i < data['from'].length; i++) {
		// console.log(data.test[i]['src_longitude'])
		//创建一个圆形标记
		var circleMarker_from = new AMap.CircleMarker({
			center: new AMap.LngLat(data['from'][i][0], data['from'][i][1]), //中心
			// radius:data.test[i][2]/15000,    //半径
			radius: from_ValueToRadius(data['from'][i][2]),
			strokeColor: 'white',
			strokeWeight: 2,
			strokeOpacity: 0.5,
			fillColor: 'rgba(12, 38, 201, 1)',
			fillOpacity: 0.5,
			zIndex: 10,
			bubble: true,
			cursor: 'pointer',
			clickable: true
		})
		HY_circleMarkers.push(circleMarker_from);
		circleMarker_from.setMap(map)
		//信息窗体
		circleMarker_from.content = '货源地城市：' + data['from'][i][5] + '\n商品数量(件)：' + data['from'][i][2] +
			'\n商品重量(吨)：' + data['from'][i][3];
		circleMarker_from.content = circleMarker_from.content.replace(/(\n|\r|\r\n|↵)/g, '<br/>');
		circleMarker_from.on('click', markerClick); //绑定click事件
		circleMarker_from.emit('click', {
			target: circleMarker_from
		});
	}

	// 目的地
	for (var i = 0; i < data['to'].length; i++) {
		var circleMarker_to = new AMap.CircleMarker({
			center: new AMap.LngLat(data['to'][i][0], data['to'][i][1]), //中心
			// radius:data.test[i][2]/15000,    //半径
			radius: to_ValueToRadius(data['to'][i][2]),
			strokeColor: 'white',
			strokeWeight: 2,
			strokeOpacity: 0.5,
			fillColor: 'rgba(0, 255, 0, 1)',
			fillOpacity: 0.5,
			zIndex: 10,
			bubble: true,
			cursor: 'pointer',
			clickable: true
		})
		HY_circleMarkers.push(circleMarker_to);
		circleMarker_to.setMap(map)
		//信息窗体
		circleMarker_to.content = '目的地城市：' + data['to'][i][5] + '\n商品数量(件)：' + data['to'][i][2] +
			'\n商品重量(吨)：' + data['to'][i][3];
		circleMarker_to.content = circleMarker_to.content.replace(/(\n|\r|\r\n|↵)/g, '<br/>');
		circleMarker_to.on('click', markerClick); //绑定click事件
		circleMarker_to.emit('click', {
			target: circleMarker_to
		});
	}
	//点击事件

	function from_ValueToRadius(val) {
		if (val >= 78000) {
			return 20;
		} else if (val >= 76000) {
			return 12;
		} else if (val >= 75000) {
			return 8;
		} else {
			return 5;
		}
	}

	function to_ValueToRadius(val) {
		if (val >= 100000) {
			return 20;
		} else if (val >= 40000) {
			return 12;
		} else if (val >= 37000) {
			return 8;
		} else {
			return 5;
		}
	}

	function markerClick(e) {
		var infoWindow = new AMap.InfoWindow({});
		infoWindow.setSize((10, 10))
		infoWindow.setContent(e.target.content);
		infoWindow.open(map, e.target.getCenter());
	}
})
