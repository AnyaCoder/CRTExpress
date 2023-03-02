import cx_Oracle as cx
from db_configuration import *


"""
G2_infoSelect:
包含各个获取数据函数所对应的数据库表
可通过修改其内容来改变函数所获取的数据对应的数据库表

真实数据表：GOODS_INFO
假数据表：GRACEFULGOODS_INFO

现在用的是假数据表
"""
G2_infoSelect = {
    "AllData": "YJtest2",
    "SelectedData": "YJtest2",
    # GOODS_INFO
    "SelectedRealData": "GRACEFULGOODS_TEST_INFO",
    "SelectGoodsValueSeq": "GRACEFULGOODS_TEST_INFO",
    "SelectVariousGoodsValue": "GRACEFULGOODS_TEST_INFO"
}


def G2_AllData():
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    sql = "select * from {}".format(G2_infoSelect["AllData"])
    cursor.execute(sql)  # 执行sql语句
    a = cursor.fetchall()  # 获取数据
    cursor.close()  # 关闭游标
    con.close()  # 关闭数据库连接
    return a


def G2_SelectedData(kind, start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select sum(cargo_value),sum(cargo_quantity),sum(cargo_weight),sum(cargo_box),src_longitude,src_latitude,des_longitude,des_latitude from {table} where cargo_kind= \'{kind}\' and trans_time between {start} and {end} group by src_longitude,src_latitude,des_longitude,des_latitude'.format(
        table=G2_infoSelect["SelectedData"], kind=kind, start=trans_start, end=trans_end)
    cursor.execute(sql)  # 执行sql语句
    a = cursor.fetchall()  # 获取数据
    # print(a)  # 打印数据
    cursor.close()  # 关闭游标
    con.close()  # 关闭数据库连接
    return a


def ValueToWidth(index, num):
    WidthList = [1.5, 0.9, 0.3]
    if num < 3:
        return WidthList[index]
    else:
        if index + 1 <= num / 3:
            return WidthList[0]
        elif index + 1 <= num / 3 * 2:
            return WidthList[1]
        else:
            return WidthList[2]


def G2_SelectedRealData(kind, start, end):
    """
    :return: 最后一个元素是宽度
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select SEND_LONGTITUDE,SEND_LATITUDE,TO_LONGTITUDE,TO_LATITUDE,sum(GOODS_NUM),sum(GOODS_WEIGHT) from {table} \
        where GOODS_TYPE= \'{kind}\' and DEPARTURE_TIME between {start} and {end} group by SEND_LONGTITUDE,SEND_LATITUDE,TO_LONGTITUDE,TO_LATITUDE' \
        .format(table=G2_infoSelect["SelectedRealData"], kind=kind, start=trans_start, end=trans_end)
    cursor.execute(sql)  # 执行sql语句
    a = cursor.fetchall()  # 获取数据
    # print(type(a[0]))     #打印数据
    # print(a)     #打印数据

    # 以货物数量为排序标准进行排序
    a.sort(key=lambda x: x[4], reverse=True)
    res = []
    index = 0
    for i in a:
        res.append([])
        for j in i:
            res[index].append(j)
        res[index].append(ValueToWidth(index, len(a)))
        index += 1
    cursor.close()  # 关闭游标
    con.close()  # 关闭数据库连接
    return res


def Add_days(date, n):
    """
    向指定日期增加天数（用于获取有关粒度的数据时日期的更替）
    :param date:指定日期（字符串，格式：yyyy-mm-dd）
    :param n:增加的天数（对 1、7、30、365 开辟了更快捷的计算方式）
    :return:增加天数后的日期（字符串，格式：yyyy-mm-dd）
    """
    leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    normalYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    yearList = [normalYear, leapYear]
    temp = date.split('-')
    year = int(temp[0])
    month = int(temp[1])
    day = int(temp[2])
    day += n
    while True:
        if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
            leapFlag = 1
        else:
            leapFlag = 0
        if day <= yearList[leapFlag][month - 1]:
            break
        else:
            day -= yearList[leapFlag][month - 1]
            month += 1
            if month > 12:
                year += 1
                month = 1
    year = str(year)
    if month < 10:
        month = '0' + str(month)
    else:
        month = str(month)
    if day < 10:
        day = '0' + str(day)
    else:
        day = str(day)
    return year + '-' + month + '-' + day


def Add_months(date, n):
    """
    向日期增加月的函数
    注意：增加的月份数量应小于12
    :param date: 指定日期（字符串，格式：yyyy-mm）
    :param n: 增加的月数
    :return: 增加月数后的日期（字符串，格式：yyyy-mm）
    """
    temp = date.split('-')
    year = int(temp[0])
    month = int(temp[1])
    month += n
    if month > 12:
        year += 1
        month -= 12
    year = str(year)
    if month < 10:
        month = '0' + str(month)
    else:
        month = str(month)
    return year + '-' + month


def Add_years(date, n):
    """
    向日期增加年数
    :param date:指定日期（字符串，格式：yyyy）
    :param n:年数
    :return:增加年数后的日期（字符串，格式：yyyy）
    """
    year = int(date)
    year += n
    return str(year)


def SortGoodsValue(GoodsValue):
    """
    对货物值字典按值进行排序
    （作为样例功能函数，供以后函数编写参考）
    :param GoodsValue: 货物值字典
    :return: 排序后的货物值字典
    """
    temp = []
    index = 0
    for i in GoodsValue.keys():
        temp.append([])
        temp[index].append(i)
        index += 1
    index = 0
    for i in GoodsValue.values():
        temp[index].append(i)
        index += 1
    temp.sort(key=lambda x: x[1], reverse=True)
    res = {}
    for i in temp:
        res[i[0]] = i[1]
    return res


def G2_SelectGoodsValueSeq(kind, start, end, interval):
    """
    折线图功能主函数，以选定粒度获取某时间段内货物数量/质量的变化
    :param kind: 货物种类（字符串）
    :param start: 起始时间（字符串，格式：yyyy-mm-dd）
    :param end: 截止时间（同上）
    :param interval: 粒度（整数，单位：天）
    :return:
     对应结构的数据点集
     字典：{“time”:时间序列（列表）,“num”:数量序列,“weight”:重量序列}
    """
    if interval == 365:
        # 以年为粒度
        return GoodsValueSeqByYear(kind, start, end)
    elif interval == 30:
        # 以月为粒度
        return GoodsValueSeqByMonth(kind, start, end)
    elif interval == 1:
        # 以天为粒度
        return GoodsValueSeqByDay(kind, start, end)
    else:
        # 以周或其它长度为粒度
        con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
        cursor = con.cursor()  # 创建游标
        trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm-dd')
        trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'yyyy-mm-dd')
        sql = "select to_char(DEPARTURE_TIME,\'yyyy-mm-dd\'), GOODS_NUM, GOODS_WEIGHT " \
              "from {} where GOODS_TYPE = \'{}\' " \
              "and DEPARTURE_TIME between {} and {}".format(G2_infoSelect["SelectGoodsValueSeq"], kind, trans_start,
                                                            trans_end)
        cursor.execute(sql)
        res = cursor.fetchall()
        res.sort()
        # print(res)
        i = interval
        dataNum = {}
        dataWeight = {}
        timeSeries = []
        while start < end:
            dataNum[start] = 0
            dataWeight[start] = 0
            timeSeries.append(start)
            start = Add_days(start, i)
        # print(timeSeries)
        length = len(timeSeries)
        # print(length)
        index = 0
        for i in res:
            if i[0] <= timeSeries[index + 1]:
                dataNum[timeSeries[index]] += i[1]
                dataWeight[timeSeries[index]] += i[2]
            else:
                while True:
                    if index + 1 < length - 1:
                        index += 1
                        # print(index)
                        if i[0] <= timeSeries[index + 1]:
                            dataNum[timeSeries[index]] += i[1]
                            dataWeight[timeSeries[index]] += i[2]
                            break
                    else:
                        break
        # print(dataNum)
        # print(dataWeight)
        data = {}
        timeSeries.pop()
        for i in dataWeight.keys():
            dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)
        data["time"] = timeSeries
        data["num"] = list(dataNum.values())
        data["weight"] = list(dataWeight.values())
        cursor.close()
        con.close()
        return data


def G2_SelectVariousGoodsValue(start, end):
    """
    柱状图功能主函数，获取所有种类的数量/重量分布
    :param start: 起始时间（字符串，格式：yyyy-mm-dd）
    :param end: 截止时间（格式同上）
    :return:
    对应结构的数据点集
    字典：{“kind”:种类（列表）,“num”:数量分布,“weight”:重量分布}
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    start += ' 00:00:00'
    end += ' 23:59:59'
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm-dd hh24:mi:ss')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'yyyy-mm-dd hh24:mi:ss')
    sql = 'select distinct GOODS_TYPE from {}'.format(G2_infoSelect["SelectVariousGoodsValue"])
    cursor.execute(sql)
    res = cursor.fetchall()
    dataNum = {}
    dataWeight = {}
    for i in res:
        dataNum[i[0]] = 0
        dataWeight[i[0]] = 0
    # print(res)
    sql = 'select GOODS_TYPE, sum(GOODS_NUM), sum(GOODS_WEIGHT) from {} ' \
          'where DEPARTURE_TIME between {} and {} ' \
          'group by GOODS_TYPE'.format(G2_infoSelect["SelectVariousGoodsValue"], trans_start, trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    for i in res:
        dataNum[i[0]] = i[1]
        dataWeight[i[0]] = i[2]
    # 关闭数据库连接和游标
    cursor.close()
    con.close()
    for i in dataWeight.keys():
        dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)

    # 排序代码
    # NumSortedRes = SortGoodsValue(dataNum)
    # print(NumSortedRes)
    # WeightSortedRes = SortGoodsValue(dataWeight)
    # print(WeightSortedRes)
    # TopNumData = []
    # TopWeightData = []
    # for i in list(NumSortedRes.keys())[0:6]:
    #     TopNumData.append({"value": NumSortedRes[i], "name": i})
    # for i in list(WeightSortedRes.keys())[0:6]:
    #     TopWeightData.append({"value": WeightSortedRes[i], "name": i})

    GoodsNumPieData = []
    GoodsWeightPieData = []
    for i in dataNum.keys():
        GoodsNumPieData.append({'value': dataNum[i], 'name': i})
    for i in dataWeight.keys():
        GoodsWeightPieData.append({'value': dataWeight[i], 'name': i})

    return {"kind": list(dataNum.keys()), "num": list(dataNum.values()), "weight": list(dataWeight.values()),
            "GoodsNumPieData": GoodsNumPieData, "GoodsWeightPieData": GoodsWeightPieData}


def GoodsValueSeqByYear(kind, start, end):
    """
    获取以年为粒度的货物序列值
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    i = 1
    dataNum = {}
    dataWeight = {}
    date = start.split('-')[0]
    while date < end:
        trans_start = 'to_date(\'{}\',\'{}\')'.format(Add_years(date, -1), 'yyyy')
        trans_end = 'to_date(\'{}\',\'{}\')'.format(date, 'yyyy')
        sql = 'select GOODS_TYPE, sum(GOODS_NUM), sum(GOODS_WEIGHT) from {} where GOODS_TYPE= \'{}\' ' \
              'and DEPARTURE_TIME between {} and {} group by GOODS_TYPE' \
            .format(G2_infoSelect["SelectGoodsValueSeq"], kind, trans_start, trans_end)
        cursor.execute(sql)
        res = cursor.fetchall()
        if len(res) == 0:
            res = (kind, 0, 0)
        else:
            res = res[0]
        dataNum[date] = res[1]
        # print(type(res[1]))
        dataWeight[date] = res[2]
        date = Add_years(date, i)
    for i in dataWeight.keys():
        dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)
    cursor.close()
    con.close()
    return {"time": list(dataNum.keys()), "num": list(dataNum.values()), "weight": list(dataWeight.values())}


def GoodsValueSeqByMonth(kind, start, end):
    """
    获取以月为粒度的货物序列值
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    temp = start.split('-')
    start = temp[0] + '-' + temp[1]
    temp = end.split('-')
    end = temp[0] + '-' + temp[1]
    sTop = Add_months(end, 1)
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(sTop, 'yyyy-mm')
    sql = 'select to_char(DEPARTURE_TIME, \'yyyy-mm\'), GOODS_NUM, GOODS_WEIGHT ' \
          'from {} ' \
          'where GOODS_TYPE = \'{}\' and DEPARTURE_TIME between {} and {}'.format(G2_infoSelect["SelectGoodsValueSeq"],
                                                                                  kind, trans_start, trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    i = 1
    dataNum = {}
    dataWeight = {}
    while start <= end:
        dataNum[start] = 0
        dataWeight[start] = 0
        start = Add_months(start, i)
    for j in res:
        if j[0] >= sTop:
            continue
        dataNum[j[0]] += j[1]
        dataWeight[j[0]] += j[2]
    for i in dataWeight.keys():
        dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)
    cursor.close()
    con.close()
    return {"time": list(dataNum.keys()), "num": list(dataNum.values()), "weight": list(dataWeight.values())}


def GoodsValueSeqByDay(kind, start, end):
    """
    获取以天为粒度的货物序列值
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm-dd')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'yyyy-mm-dd')
    sql = 'select to_char(DEPARTURE_TIME, \'yyyy-mm-dd\'), GOODS_NUM, GOODS_WEIGHT ' \
          'from {} ' \
          'where GOODS_TYPE = \'{}\' and DEPARTURE_TIME between {} and {}'.format(G2_infoSelect["SelectGoodsValueSeq"],
                                                                                  kind, trans_start, trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    i = 1
    dataNum = {}
    dataWeight = {}
    while start <= end:
        dataNum[start] = 0
        dataWeight[start] = 0
        start = Add_days(start, i)
    for j in res:
        dataNum[j[0]] += j[1]
        dataWeight[j[0]] += j[2]
    cursor.close()
    con.close()
    for i in dataWeight.keys():
        dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)
    return {"time": list(dataNum.keys()), "num": list(dataNum.values()), "weight": list(dataWeight.values())}


def G2_SelectTopGoodsNumFlowChange_data(GoodsKind, start_time, end_time):
    data = {}
    item = []
    flag = 0
    for i in GoodsKind:
        res = G2_SelectGoodsValueSeq(i, start_time, end_time, 30)
        if flag == 0:
            res['time'].insert(0, 'time')
            data['time'] = res['time']
            flag = 1
        res['num'].insert(0, i)
        item.append(res['num'])
    data['item1'] = item[0]
    data['item2'] = item[1]
    data['item3'] = item[2]
    data['item4'] = item[3]
    return data


def SelectCityValSeq(cursor, CityName, kind, start, end):
    sTop = Add_months(end, 1)
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(sTop, 'yyyy-mm')
    sql = 'select to_char(DEPARTURE_TIME, \'yyyy-mm\'), GOODS_NUM, GOODS_WEIGHT ' \
          'from {} ' \
          'where GOODS_TYPE = \'{}\' and SEND_CITYNAME = \'{}\' ' \
          'and DEPARTURE_TIME between {} and {}'.format(G2_infoSelect["SelectGoodsValueSeq"], kind, CityName,
                                                        trans_start, trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    i = 1
    dataNum = {}
    dataWeight = {}
    while start <= end:
        dataNum[start] = 0
        dataWeight[start] = 0
        start = Add_months(start, i)
    for j in res:
        if j[0] >= sTop:
            continue
        dataNum[j[0]] += j[1]
        dataWeight[j[0]] += j[2]
    for i in dataWeight.keys():
        dataWeight[i] = round(1.0 * dataWeight[i] / 1000, 3)

    return {"time": list(dataNum.keys()), "num": list(dataNum.values()), "weight": list(dataWeight.values())}


def G2_SelectCityValSeq(kind, start, end, index):
    """
    以月为粒度（获得城市的货物序列）
    """
    index = int(index)
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    temp = start.split('-')
    start = temp[0] + '-' + temp[1]
    temp = end.split('-')
    end = temp[0] + '-' + temp[1]
    sTop = Add_months(end, 1)
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(sTop, 'yyyy-mm')

    CityList = []
    sql = 'select distinct SEND_CITYNAME from {table} \
        where DEPARTURE_TIME between {start} and {end} and GOODS_TYPE = \'{goods_type}\' ' \
        .format(table=G2_infoSelect["SelectGoodsValueSeq"], start=trans_start, end=trans_end, goods_type=kind)
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    for i in res:
        CityList.append(i[0])

    data = {'CityList': [], 'num': [], 'weight': []}
    if len(CityList) < 4:
        for i in CityList:
            data['CityList'].append(i)
            res = SelectCityValSeq(cursor, i, kind, start, end)
            data['time'] = res['time']
            data['num'].append(res['num'])
            data['weight'].append(res['weight'])
        data['index'] = index
    else:
        temp = index
        for i in range(4):
            if index + i >= len(CityList):
                index = index + i - len(CityList)
            else:
                index = index + i
            data['CityList'].append(CityList[index])
            res = SelectCityValSeq(cursor, CityList[index], kind, start, end)
            data['time'] = res['time']
            data['num'].append(res['num'])
            data['weight'].append(res['weight'])
        if temp + 1 >= len(CityList):
            temp = temp + 1 - len(CityList)
        else:
            temp = temp + 1
        data['index'] = temp
    return data


def G2_SelectCityValDistribution(FromCityName, ToCityName, start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'yyyy-mm-dd hh24:mi:ss')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'yyyy-mm-dd hh24:mi:ss')
    sql = 'select GOODS_TYPE, sum(GOODS_NUM), sum(GOODS_WEIGHT) from {} ' \
          'where DEPARTURE_TIME between {} and {} ' \
          'and SEND_CITYNAME=\'{}\' ' \
          'group by GOODS_TYPE'.format(G2_infoSelect["SelectVariousGoodsValue"], trans_start,
                                       trans_end, FromCityName)
    cursor.execute(sql)
    res = cursor.fetchall()
    CityValSeqData = {}
    CityValSeqData['from'] = res

    sql = 'select GOODS_TYPE, sum(GOODS_NUM), sum(GOODS_WEIGHT) from {} ' \
          'where DEPARTURE_TIME between {} and {} ' \
          'and TO_CITYNAME=\'{}\' ' \
          'group by GOODS_TYPE'.format(G2_infoSelect["SelectVariousGoodsValue"], trans_start,
                                       trans_end, ToCityName)
    cursor.execute(sql)
    res = cursor.fetchall()
    CityValSeqData['to'] = res
    cursor.close()
    con.close()
    return CityValSeqData

# 下面是测试部分
# begin = datetime.now()
# print(G2_SelectGoodsValueSeq("化工产品", "2021-01-01", "2021-12-31", 30))
# print(G2_SelectVariousGoodsValue("2021-01-01", "2021-12-31"))
# print(G2_SelectTopGoodsNumFlowChange_data(['生活用品', '食用品', '矿产品', '化工产品'], "2021-01-01", "2021-12-31"))
# print(G2_SelectedRealData('电子产品', '2021-01-01 00:00:00', '2021-12-31 00:00:00'))
# print(G2_SelectCityValDistribution('北京', '苏黎世', "2021-01-01", "2021-12-31"))
# print(G2_SelectCityValSeq('食用品', '2021-01-01', '2021-12-31', 0))
# stop = datetime.now()
# print(stop - begin)
