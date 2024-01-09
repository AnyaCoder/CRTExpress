function P1_change(data) {
    LeftTopGraph.setOption({
        title: {
            text: '金属制品',
        },
    });
    Data_init(data['金属制品'], LeftTopGraph);
    LeftBottomGraph.setOption({
        title: {
            text: '化学产品'
        }
    })
    Data_init(data['材料制品'], LeftBottomGraph);

    RightTopGraph.setOption({
        title: {
            text: '材料制品',
        }
    });
    Data_init(data['材料制品'], RightTopGraph);
    RightBottomGraph.setOption({
        title: {
            text: '电子产品'
        }
    })
    Data_init(data['电子产品'], RightBottomGraph);

    MidTopGraph.setOption({
        title: {
            text: '金属制品 ',
        }
    });
    Data_init(data['金属制品'], MidTopGraph);
    MidBottomGraph.setOption({
        title: {
            text: '矿产品'
        }
    })
    Data_init(data['矿产品'], MidBottomGraph);
}


function P2_change(data) {
    LeftTopGraph.setOption({
        title: {
            text: '生活用品',
        }
    });
    Data_init(data['生活用品'], LeftTopGraph);
    LeftBottomGraph.setOption({
        title: {
            text: '文画古藏 '
        }
    })
    Data_init(data['文画古藏'], LeftBottomGraph);

    RightTopGraph.setOption({
        title: {
            text: '服装首饰',
        }
    });
    Data_init(data['服装首饰'], RightTopGraph);
    RightBottomGraph.setOption({
        title: {
            text: '武器火药'
        }
    })
    Data_init(data['武器火药'], RightBottomGraph);

    MidTopGraph.setOption({
        title: {
            text: '食用品',
        }
    });
    Data_init(data['食用品'], MidTopGraph);
    MidBottomGraph.setOption({
        title: {
            text: '杂项制品'
        }
    })
    Data_init(data['杂项制品'], MidBottomGraph);
}


function change_page() {
    var req_data = {
        "page_index": 2 - now_page
    }
    console.log(now_page);
    $.post('/Prediction_Data', req_data).done(function (res){

        if (now_page === 1) {
            P1_change(res);
            now_page = 2;
        } else {
            P2_change(res);
            now_page = 1;
        }

    })
    // if (now_page === 1) {
    //     predict_request(1);
    //     now_page = 2;
    // } else {
    //     predict_request(0);
    //     now_page = 1;
    // }
}