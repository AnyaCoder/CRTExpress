
now_page = 1;

function Data_init(URL, which) {

    $.post(URL).done(function (data) {
        console.log(URL + '已使用!')
        let D1N = [], D1W = [], D2N = [], D2W = [];
        let halfIndex = Math.floor(data["time"].length / 2);
        for (let i = 0; i <= halfIndex; i++) {
            D1N.push([data["time"][i], data["nums"][i]]);
            D1W.push([data["time"][i], data["weights"][i]]);
            D2N.push([data["time"][i], null])
            D2W.push([data["time"][i], null])
        }
        for (let i = halfIndex; i < data["time"].length; i++) {
            D1N.push([data["time"][i], null])
            D1W.push([data["time"][i], null])
            D2N.push([data["time"][i], data["nums"][i]]);
            D2W.push([data["time"][i], data["weights"][i]]);
        }
        console.log(D1N);
        console.log(D1W);
        console.log(D2N);
        console.log(D2W);
        which.setOption({
            xAxis: {
                type: 'time',
                data: data["time"]
            },
            series: [
                {
                    type: 'line',
                    name: '数量',
                    data: D1N
                },
                {
                    type: 'line',
                    name: '数量',
                    color: '#3396ef',
                    data: D2N,
                    lineStyle: {
                        normal: {
                            type: 'dotted'
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
                    name: '重量',
                    color: '#afd7ec',
                    data: D2W,
                    lineStyle: {
                        normal: {
                            type: 'dotted'
                        }
                    },
                    smooth: true
                }
            ],


        });
    })

}
