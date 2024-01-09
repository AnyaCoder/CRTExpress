
now_page = 1;

function Data_init(data, which) {
    //console.log(data)

    let D1N = [], D1W = [], D2N = [], D2W = [];
    for (let i = 0; i < data["real_time"].length; i++) {
        D1N.push([data["real_time"][i], data["real_num"][i]]);
        D1W.push([data["real_time"][i], data["real_weight"][i]]);
        D2N.push([data["real_time"][i], data["real_num"][i]]);
        D2W.push([data["real_time"][i], data["real_weight"][i]]);
    }
    for (let i = 0; i < data["predict_time"].length; i++) {
        D1N.push([data["predict_time"][i], null])
        D1W.push([data["predict_time"][i], null])
        D2N.push([data["predict_time"][i], data["predict_num"][i]]);
        D2W.push([data["predict_time"][i], data["predict_weight"][i]]);
    }
    which.setOption({
        xAxis: {
            type: 'time',
            data: data["real_time"] + data["predict_time"]
        },
        series: [
            {
                type: 'line',
                name: '数量',
                data: D1N
            },
            {
                type: 'line',
                name: '预测数量',
                color: '#3396ef',
                data: D2N,
                lineStyle: {
                    normal: {
                        type: 'dotted',
                        width: 2,
                        opacity: 0.7
                    }
                },
                smooth: true
            },
            {
                type: 'line',
                name: '重量',
                data: D1W
            },
            {
                type: 'line',
                name: '预测重量',
                color: '#afd7ec',
                data: D2W,
                lineStyle: {
                    normal: {
                        type: 'dotted',
                        width: 2,
                        opacity: 0.7
                    }
                },

                smooth: true
            }
        ],


    });


}
