# encoding: utf-8

"""
用flask框架搭建的中欧班列货运数据集成分析页面
"""

from flask import *
from G1_GetData import *
from G2_GetData import *
from G3_utils import *
from datetime import datetime

app = Flask(__name__, template_folder='templates')


@app.route('/')
def show_all():
    return render_template('OD.html')


@app.route('/HY')
def show_HY():
    return render_template('HY.html')


@app.route('/MenuCover')
def MenuCover():
    return render_template('GraphsIntegration/Start.html')


@app.route('/Prediction')
def Prediction():
    return render_template('YC.html')


@app.route('/ContainersGraph')
def ContainersGraph():
    return render_template('GraphsIntegration/ContainersGraph.html')


@app.route('/TrainSituationAnalysis')
def TrainSituationAnalysis():
    return render_template('GraphsIntegration/TrainSituationAnalysis.html')


@app.route('/PortOperationAbilityAnalysis')
def PortOperationAbilityAnalysis():
    return render_template('GraphsIntegration/PortOperationAbilityAnalysis.html')


@app.route('/GoodsGraph')
def GoodsGraph():
    return render_template('GraphsIntegration/GoodsGraph.html')


@app.route('/G1_data', methods=['GET', 'POST'])
def G1_data():
    kind = request.form.get('kind')
    start_time = request.form.get('start')
    end_time = request.form.get('end')
    res = G1_SelectedRealData(kind, 1, start_time, end_time)
    return jsonify(res)


@app.route('/G1_CityValDistribution', methods=['GET', 'POST'])
def G1_CityValDistribution():
    res = {}
    start = request.values['start_time']
    end = request.values['end_time']
    if int(request.values['CityUpdateFlag']) == 1:
        res['FromCityList'] = G1_SelectedFromCityList(start, end)
        res['ToCityList'] = G1_SelectedToCityList(start, end)
        return jsonify(res)
    else:
        FromCityName = request.values['FromCityName']
        ToCityName = request.values['ToCityName']
        a = G2_SelectCityValDistribution(FromCityName, ToCityName, start, end)
        return jsonify(a)


@app.route('/G1_TopGoodsValCities_data', methods=['GET', 'POST'])
def G1_TopGoodsValCities_data():
    kind = request.values['kind']
    start = request.values['start']
    end = request.values['end']
    res = G1_SortFromCitiesByGoodsVal(kind, start, end)
    return jsonify(res)


@app.route('/G2_CityValSeq', methods=['GET', 'POST'])
def G2_CityValSeq():
    kind = request.values['kind']
    start = request.values['start']
    end = request.values['end']
    index = request.values['index']
    res = G2_SelectCityValSeq(kind, start, end, index)
    return jsonify(res)


@app.route('/G2_data', methods=['GET', 'POST'])
def G2_data():
    if request.method == 'POST':
        a = G2_SelectedRealData(request.values['kind'], request.values['start'], request.values['end'])
        value_dim = request.values['dim']
        # print(a)
        return jsonify(info=a, dim=value_dim)
    if request.method == 'GET':
        # a = G2_AllData()
        a = G2_SelectedRealData('电子产品', '2021-01-01 00:00:00', '2021-12-31 00:00:00')
        return jsonify(info=a)


@app.route('/kind', methods=['GET', 'POST'])
def kind():
    a = []
    if request.method == 'GET':
        if (request.values['io'] == "进口"):
            flag_io = 1
        else:
            flag_io = 0
        a = G1_SelectedRealData(request.values['kind'], flag_io, request.values['start'], request.values['end'])
        value_dim = request.values['dim']
        return jsonify({"test": a, "dim": value_dim})
    return ('1')


@app.route('/G2_BrokenLineGraph_data', methods=["get", "post"])
def getGoodsValueSeq():
    """
    获取选定种类货物在选定时间段的数量/重量变化数据
    :return: jsonify字符串（{"time":[...], "num":[...], "weight":[...]}）
    """
    reflect = [1, 7, 30, 365]
    kind = request.values['kind']
    start = request.values['start'].split()[0]
    end = request.values['end'].split()[0]
    interval = int(request.values['interval'])
    interval = reflect[interval]
    # print(interval)
    data = G2_SelectGoodsValueSeq(kind, start, end, interval)
    # print(data)
    return jsonify(data)


@app.route('/G2_BarGraph_data', methods=["get", "post"])
def getVariousGoodsValue():
    """
    获取各种类货物在选定时间段的数量/重量分布数据
    :return: jsonify字符串（{"kind":[...], "num":[...], "weight":[...]}）
    """
    start = request.values['start'].split()[0]
    end = request.values['end'].split()[0]
    data = G2_SelectVariousGoodsValue(start, end)
    # print(data)
    return jsonify(data)


@app.route('/G2_TopGoodsNumFlowChange_data', methods=['GET', 'POST'])
def TopGoodsNumFlowChange_data():
    GoodsKindList = [
        ['生活用品', '食用品', '矿产品', '化工产品'],
        ['材料制品', '服装首饰', '金属制品', '电子产品'],
        ['运输工具', '武器火药', '杂项制品', '文画古藏']
    ]
    GoodsKind = GoodsKindList[int(request.values['GoodsKindNum'])]
    start_time = request.values['start_time']
    end_time = request.values['end_time']
    res = G2_SelectTopGoodsNumFlowChange_data(GoodsKind, start_time, end_time)
    return jsonify(res)


@app.route('/POA_radarGraph_data', methods=['GET', 'POST'])
def POA_radarGraph_data():
    PortNameList = ['霍尔果斯(境)', '满洲里(境)', '二连(境)', '绥芬河(境)']
    portName = request.values['port']
    start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
    end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
    interval = request.values['interval']
    res = selectPOA_radarGraphData(PortNameList, portName, start_time, end_time, interval)
    print(res)
    return jsonify(res)


@app.route('/radar_data', methods=['GET', 'POST'])
def radar_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        # print(request.form.get('start_time'), request.form.get('end_time'))
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        # print(start_time, end_time)
        res = {}
        for port in ports:
            res[port] = select_port_from_radar(start_time, end_time, 'MONTH', port)
        # print(res)
        return jsonify(res)


@app.route('/box_data', methods=['GET', 'POST'])
def box_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        # print(request.values)
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        port = request.form.get('port')
        # print('port: ', port)
        interval = request.form.get('interval')
        # print(start_time, end_time)
        res, SUM = select_boxinfo(start_time, end_time, port)
        res = split_data(res, start_time, end_time, interval, ['time', 'in', 'out'])
        res['inTotal'] = SUM['inTotal']
        res['outTotal'] = SUM['outTotal']
        # print('box_res: ', res)
        return jsonify(res)


@app.route('/timespan_data', methods=['GET', 'POST'])
def timespan_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        port = request.form.get('port')
        interval = request.form.get('interval')
        # print(start_time, end_time)
        res, SUM = select_timespan(start_time, end_time, port)
        res = split_data(res, start_time, end_time, interval, ['time', 'avg', 'max', 'min'])
        res['avgSum'] = SUM
        return jsonify(res)


@app.route('/timedist_data', methods=['GET', 'POST'])
def timedist_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        port = request.form.get('port')
        # print(start_time, end_time)
        res = select_timedist(start_time, end_time, port)
        # print(res)
        return jsonify(res)


@app.route('/traininfo_data', methods=['GET', 'POST'])
def traininfo_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        port = request.form.get('port')
        interval = request.form.get('interval')
        # print(start_time, end_time)
        in_out, SUM = select_traininfo(start_time, end_time, port)
        res = {'time': [], 'in': [], 'out': []}
        for k, v in in_out.items():
            # print(v)
            res['time'].append(k)
            res['in'].append(v['in'])
            res['out'].append(v['out'])
        res = split_data(res, start_time, end_time, interval, ['time', 'in', 'out'])
        res['inTotal'] = SUM['inTotal']
        res['outTotal'] = SUM['outTotal']
        return jsonify(res)


@app.route('/trainplan', methods=['GET', 'POST'])
def show_trainplan():
    if request.method == 'GET':
        return render_template('trainplan.html')


@app.route('/trainplan_data', methods=['GET', 'POST'])
def trainplan_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        # departure
        dep = request.form.get('dep')
        # destination
        des = request.form.get('des')
        # interval
        interval = request.form.get('interval')
        res = select_trainplan(start_time, end_time, dep, des)
        res = split_data(res, start_time, end_time, interval, ['time', 'plan', 'real'])
        return jsonify(res)


@app.route('/traintime_data', methods=['GET', 'POST'])
def traintime_data():
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        start_time = datetime.strptime(request.form.get('start_time'), '%Y-%m-%d')
        end_time = datetime.strptime(request.form.get('end_time'), '%Y-%m-%d')
        port = request.form.get('port')
        res = select_traintime(start_time, end_time, port)
        print(res)
        return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)
