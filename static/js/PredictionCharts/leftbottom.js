// 假设您有以下外部的 Time 和 Data 数组
var Time = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'];
var Data = [820, 932, 901, 934, 1290, 1330, 1320];

// 构造一个新的数组，用于设置 xAxis.data 和 series.data
var newData = [];
for (var i = 0; i < Time.length; i++) {
    newData.push([Time[i], Data[i]]);
}
var LeftBottomGraph = echarts.init(document.getElementById('LeftBottomGraph'), 'dark');
const chartContainer3 = document.getElementById('LeftBottomGraph');

// 创建一个 div 元素作为背景层
const bgDiv3 = document.createElement('div');
bgDiv3.style.position = 'absolute';
bgDiv3.style.width = '100%';
bgDiv3.style.height = '100%';
bgDiv3.style.backgroundImage = 'url(../static/img/ScientificBackground.jpeg)';
bgDiv3.style.backgroundSize = 'cover';
bgDiv3.style.opacity = 0.3; // 设置透明度
bgDiv3.style.filter = 'blur(10px)'; // 设置高斯模糊程度
bgDiv3.style.zIndex = -1; // 设置 z-index 属性，将背景层放在 echarts 图表下面

// 将背景层插入到 echarts 图表所在的 div 中
chartContainer3.insertBefore(bgDiv3, chartContainer3.firstChild);

LeftBottomGraph.setOption({
    backgroundColor: 'transparent',
    graphic: {
        type: 'group',
        children: [
            {
                type: 'rect',
                left: 0,
                top: 0,
                z: -1, // 将 z 属性设置为 -1，比其他组件的 z 值低
                shape: {
                    width: '100%',
                    height: '100%'
                },
                style: {
                    fill: 'rgba(0,0,0,0.3)', // 设置半透明的黑色背景
                    blur: 50 // 设置高斯模糊程度
                }
            }
        ]
    },
    title: {
        text: '文画古藏',
        textStyle: {
            color: '#72aff3',
            // fontStyle: 'oblique',
            fontWeight: 'bold',
            fontSize: 24
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },


    xAxis: {
        type: 'time',
        data: Time,
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#72aff3'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#666' // 指定坐标轴轴线颜色
            }
        },
        axisTick: {
            lineStyle: {
                color: '#666' // 指定坐标轴刻度线颜色
            }
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                opacity: 0.3, // 设置透明度为 0.3
                type: 'dashed'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#72aff3'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#666' // 指定坐标轴轴线颜色
            }
        },
        axisTick: {
            lineStyle: {
                color: '#666' // 指定坐标轴刻度线颜色
            }
        },
        show: true
    },
    series: [
        {
            name: '数量',
            type: 'line',
            color: '#3396ef',
            data: newData,
            smooth: true,
            lineStyle: {
                width: 3,
            }

        },
        {
            name: '重量',
            color: '#afd7ec',
            type: 'line',
            data: newData,
            smooth: true,
            lineStyle: {
                width: 3,
            }

        }
    ],
    legend: {
        show: true,
        data: [{name: '数量', textStyle: {color: '#3396ef', fontFamily: '楷体', fontSize: 20}},
            {name: '重量', textStyle: {color: '#afd7ec', fontFamily: '楷体', fontSize: 20}}],

    },
});
LeftBottomGraph.render;