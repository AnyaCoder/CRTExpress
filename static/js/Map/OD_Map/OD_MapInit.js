// 小窗口地图初始化
var HY_From_circleMarkers = [];
var HY_To_circleMarkers = [];
var OD_lines = [];

// 目的地
var Map_Destination = new AMap.Map('Map_Destination', {
	resizeEnable: true,
	center: [20.000923, 48.675807], //地图中心
	zoom: 2.4, //缩放级别
	mapStyle: 'amap://styles/dark'
});


$.post('/G1_data', {
	kind: selectInfo.value_kind,
	start: selectInfo.value_time[0],
	end: selectInfo.value_time[1],
}).done(function(data) {
	// 目的地
	for (var i = 0; i < data['to'].length; i++) {
		var circleMarker_to = new AMap.CircleMarker({
			center: new AMap.LngLat(data['to'][i][0], data['to'][i][1]), //中心
			// radius:data.test[i][2]/15000,    //半径
			radius: data['to'][i][6],
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
		HY_To_circleMarkers.push(circleMarker_to);
		circleMarker_to.setMap(Map_Destination);
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
	function markerClick(e) {
		var infoWindow = new AMap.InfoWindow({
			closeWhenClickMap: true,
		});
		infoWindow.setSize((10, 10))
		infoWindow.setContent(e.target.content);
		infoWindow.open(map, e.target.getCenter());
	}
})

// 货源地
var Map_Source = new AMap.Map('Map_Source', {
	resizeEnable: true,
	center: [105.000923, 38.675807], //地图中心
	zoom: 2.5, //缩放级别
	mapStyle: 'amap://styles/dark'
});

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
			radius: data['from'][i][6],
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
		HY_From_circleMarkers.push(circleMarker_from);
		circleMarker_from.setMap(Map_Source)
		//信息窗体
		circleMarker_from.content = '货源地城市：' + data['from'][i][5] + '\n商品数量(件)：' + data['from'][i][2] +
			'\n商品重量(吨)：' + data['from'][i][3];
		circleMarker_from.content = circleMarker_from.content.replace(/(\n|\r|\r\n|↵)/g, '<br/>');
		circleMarker_from.on('click', markerClick); //绑定click事件
		circleMarker_from.emit('click', {
			target: circleMarker_from
		});
	}

	//点击事件
	function markerClick(e) {
		var infoWindow = new AMap.InfoWindow({
			closeWhenClickMap: true,
		});
		infoWindow.setSize((10, 10))
		infoWindow.setContent(e.target.content);
		infoWindow.open(map, e.target.getCenter());
	}
})

// 地图初始化
var map = new AMap.Map('Map', {
	zoom: 3.0,
	// 地图初始化的位置
	center: [55.000923, 52.675807],
	showLabel: false,
	viewMode: '3D',
	mapStyle: 'amap://styles/dark',
});

var loca = new Loca.Container({
	map: map,
});

$.get('/G2_data').done(function(data) {
	// 颜色配置
	var headColors = ['#ECFFB1', '#146968', '#146968', '#146968', '#146968', '#146968', '#146968',
		'#146968'
	];
	var trailColors = [
		'rgba(255,178,6, 0.2)',
		'rgba(255,178,6, 0.2)',
		'rgba(20,105,104, 0.2)',
		'rgba(20,105,104, 0.2)',
		'rgba(20,105,104, 0.2)',
		'rgba(20,105,104, 0.2)',
		'rgba(20,105,104, 0.2)',
		'rgba(20,105,104, 0.2)',
	];
	// 进入的线
	for (let i = 0, len = data.info.length; i < len; i++) {
		var inLineSource = new Loca.GeoJSONSource({
			data: {
				"type": "FeatureCollection",
				"features": [{
					"type": "Feature",
					"properties": {
						"type": 0,
						"ratio": 0.0369,
						// "lineWidthRatio": data.info[i][4] / 100000
						"lineWidthRatio": data.info[i][6]
					},
					"geometry": {
						"type": "LineString",
						"coordinates": [
							[
								data.info[i][0],
								data.info[i][1]
							],
							[
								data.info[i][2],
								data.info[i][3]
							]
						]
					}
				}]
			}
		});

		var inLinelayer = new Loca.PulseLineLayer({
			// loca,
			zIndex: 11,
			opacity: 1,
			visible: true,
			zooms: [2, 22],
		});

		inLinelayer.setStyle({
			altitude: 0,
			lineWidth: (_, feature) => feature.properties.lineWidthRatio * 4 + 1,
			headColor: (_, feature) => headColors[feature.properties.type],
			trailColor: (_, feature) => trailColors[feature.properties.type],
			interval: 0.5,
			duration: 2000,
		});
		inLinelayer.setSource(inLineSource);
		loca.add(inLinelayer);
	}
	// 出的线
	var outLineSource = new Loca.GeoJSONSource({
		url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json',
	});

	var outLinelayer = new Loca.PulseLineLayer({
		// loca,
		zIndex: 11,
		opacity: 1,
		visible: true,
		zooms: [2, 22],
	});

	outLinelayer.setStyle({
		altitude: 0,
		lineWidth: (_, feature) => feature.properties.lineWidthRatio * 1 + 3,
		headColor: (_, feature) => headColors[feature.properties.type],
		trailColor: (_, feature) => trailColors[feature.properties.type],
		interval: 0.25,
		duration: 5000,
	});

	// 下方呼吸点层
	var scatter = new Loca.ScatterLayer({
		// loca,
		zIndex: 10,
		opacity: 1,
		visible: true,
		zooms: [2, 22],
	});

	var scatterlist = []
	var scatterGeo = new Loca.GeoJSONSource({
		data: {
			"type": "FeatureCollection",
			"features": []
		}
	})
	for (let i = 0, len = data.info.length; i < len; i++) {
		//console.log(data.info)
		scatterGeo.options.data["features"].push({
			"type": "Feature",
			"properties": {
				"type": 0,
				"ratio": 0.0577,
				"lineWidthRatio": 1
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					data.info[i][0],
					data.info[i][1]
				]
			}
		})
		scatterGeo.options.data["features"].push({
			"type": "Feature",
			"properties": {
				"type": 0,
				"ratio": 0.0577,
				"lineWidthRatio": 1
			},
			"geometry": {
				"type": "Point",
				"coordinates": [
					data.info[i][2],
					data.info[i][3]
				]
			}
		})
	}
	scatter.setSource(scatterGeo);
	scatter.setStyle({
		unit: 'px',
		size: (_, feature) => {
			var size = feature.properties.lineWidthRatio * 2 + 30;
			return [size, size];
		},
		borderWidth: 0,
		texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
		duration: 2000,
		animate: true,
	});
	loca.add(scatter);
	loca.animate.start();
})
