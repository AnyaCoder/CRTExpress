(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports', 'echarts'], factory);
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		factory(exports, require('echarts'));
	} else {
		// Browser globals
		factory({}, root.echarts);
	}
}(this, function(exports, echarts) {
	var log = function(msg) {
		if (typeof console !== 'undefined') {
			console && console.error && console.error(msg);
		}
	};
	if (!echarts) {
		log('ECharts is not Loaded');
		return;
	}
	var contrastColor = '#eee';
	var axisCommon = function() {
		return {
			axisLine: {
				lineStyle: {
					color: contrastColor
				}
			},
			axisTick: {
				lineStyle: {
					color: contrastColor
				}
			},
			axisLabel: {
				color: contrastColor
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: '#aaa'
				}
			},
			splitArea: {
				areaStyle: {
					color: contrastColor
				}
			}
		};
	};

	var colorPalette = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc',
		'#7289ab', '#91ca8c', '#f49f42'
	];
	var dark_theme = {
		color: colorPalette,
		backgroundColor: '#333',
		tooltip: {
			axisPointer: {
				lineStyle: {
					color: contrastColor
				},
				crossStyle: {
					color: contrastColor
				},
				label: {
					backgroundColor: '#333'
				}
			}
		},
		legend: {
			textStyle: {
				color: contrastColor
			}
		},
		textStyle: {
			color: contrastColor
		},
		title: {
			textStyle: {
				color: contrastColor
			}
		},
		toolbox: {
			iconStyle: {
				borderColor: contrastColor
			}
		},
		dataZoom: {
			textStyle: {
				color: contrastColor
			}
		},
		timeline: {
			lineStyle: {
				color: contrastColor
			},
			itemStyle: {
				color: colorPalette[1]
			},
			label: {
				color: contrastColor
			},
			controlStyle: {
				color: contrastColor,
				borderColor: contrastColor
			}
		},
		timeAxis: axisCommon(),
		logAxis: axisCommon(),
		valueAxis: axisCommon(),
		categoryAxis: axisCommon(),

		line: {
			symbol: 'circle'
		},
		graph: {
			color: colorPalette
		},
		gauge: {
			title: {
				textStyle: {
					color: contrastColor
				}
			}
		},
		candlestick: {
			itemStyle: {
				color: '#FD1050',
				color0: '#0CF49B',
				borderColor: '#FD1050',
				borderColor0: '#0CF49B'
			}
		}
	};
	dark_theme.categoryAxis.splitLine.show = false;
	echarts.registerTheme('dark', dark_theme);
}));
