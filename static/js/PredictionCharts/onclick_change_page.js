function P1_change() {
    LeftTopGraph.setOption({
        title: {
            text: '金属制品',
        },
    });
    Data_init('/P2_MetalGoods_data', LeftTopGraph);
    LeftBottomGraph.setOption({
        title: {
            text: '化学制品'
        }
    })
    Data_init('/P2_ChemicalGoods_data', LeftBottomGraph);

    RightTopGraph.setOption({
        title: {
            text: '材料制品',
        }
    });
    Data_init('/P2_MaterialGoods_data', RightTopGraph);
    RightBottomGraph.setOption({
        title: {
            text: '电子产品'
        }
    })
    Data_init('/P2_ElectronicGoods_data', RightBottomGraph);

    MidTopGraph.setOption({
        title: {
            text: '运输工具 ',
        }
    });
    Data_init('/P2_TransportGoods_data', MidTopGraph);
    MidBottomGraph.setOption({
        title: {
            text: '矿产品'
        }
    })
    Data_init('/P2_MineGoods_data', MidBottomGraph);
}


function P2_change() {
    LeftTopGraph.setOption({
        title: {
            text: '生活用品',
        }
    });
    Data_init('/P1_DaliyLifeGoods_data', LeftTopGraph);
    LeftBottomGraph.setOption({
        title: {
            text: '文化古藏 '
        }
    })
    Data_init('/P1_DrawGoods_data', LeftBottomGraph);

    RightTopGraph.setOption({
        title: {
            text: '服装首饰',
        }
    });
    Data_init('/P1_ClothesGoods_data', RightTopGraph);
    RightBottomGraph.setOption({
        title: {
            text: '武器火药'
        }
    })
    Data_init('/P1_WeaponsGoods_data', RightBottomGraph);

    MidTopGraph.setOption({
        title: {
            text: '食用品',
        }
    });
    Data_init('/P1_FoodsGoods_data', MidTopGraph);
    MidBottomGraph.setOption({
        title: {
            text: '杂项制品'
        }
    })
    Data_init('/P1_OthersGoods_data', MidBottomGraph);
}

function change_page() {

    if (now_page === 1) {
        P1_change();
        now_page = 2;
    } else {
        P2_change();
        now_page = 1;
    }
}