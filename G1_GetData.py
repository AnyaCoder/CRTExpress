import cx_Oracle as cx
from db_configuration import *

"""
G1_infoSelect:
包含各个获取数据函数所对应的数据库表
可通过修改其内容来改变函数所获取的数据对应的数据库表

真实数据表：GOODS_INFO
假数据表：GRACEFULGOODS_INFO

现在用的是假数据表
"""
G1_infoSelect = {
    "AllData": "YJtest",
    "SelectedData": "YJtest",
    # GOODS_INFO
    "SelectedRealData": "GRACEFULGOODS_TEST_INFO"
}


def G1_AllData():
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()  # 创建游标
    sql = "select * from {}".format(G1_infoSelect["AllData"])
    cursor.execute(sql)  # 执行sql语句
    a = cursor.fetchall()  # 获取数据
    cursor.close()  # 关闭游标
    con.close()  # 关闭数据库连接
    return a


def G1_SelectedData(kind, io, start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select sum(cargo_value),src_longitude,src_latitude,flag_io,sum(cargo_quantity),sum(cargo_weight) from {table} \
        where cargo_kind= \'{kind}\' and trans_time between {start} and {end} and flag_io={io} group by src_longitude,src_latitude,flag_io' \
        .format(table=G1_infoSelect["SelectedData"], kind=kind, start=trans_start, end=trans_end, io=io)
    cursor.execute(sql)
    a = cursor.fetchall()
    cursor.close()
    con.close()
    return a


def ValueToRadius(index, num):
    # 半径等级划分
    RadiusList = [20, 12, 6]
    if num < 3:
        return RadiusList[index]
    else:
        if index + 1 <= num / 3:
            return RadiusList[0]
        elif index + 1 <= num / 3 * 2:
            return RadiusList[1]
        else:
            return RadiusList[2]


def G1_SelectedRealData(kind, io, start, end):
    """
    :return: 最后一个元素是半径
    """
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    pointData = {}
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')

    sql = 'select SEND_LONGTITUDE,SEND_LATITUDE,sum(GOODS_NUM),sum(GOODS_WEIGHT),TRANSPORT_TYPE, SEND_CITYNAME from {table} \
        where GOODS_TYPE= \'{kind}\' and DEPARTURE_TIME between {start} and {end} and TRANSPORT_TYPE={io} group by SEND_LONGTITUDE,SEND_LATITUDE,TRANSPORT_TYPE, SEND_CITYNAME order by sum(GOODS_NUM) DESC' \
        .format(table=G1_infoSelect["SelectedRealData"], kind=kind, start=trans_start, end=trans_end, io=io)
    cursor.execute(sql)
    res = cursor.fetchall()

    # 以货物数量为排序标准
    index = 0
    temp = []
    for i in res:
        temp.append([])
        for j in i:
            temp[index].append(j)
        temp[index].append(ValueToRadius(index, len(res)))
        index += 1
    pointData['from'] = temp

    sql = 'select TO_LONGTITUDE,TO_LATITUDE,sum(GOODS_NUM),sum(GOODS_WEIGHT),TRANSPORT_TYPE, TO_CITYNAME from {table} \
        where GOODS_TYPE= \'{kind}\' and DEPARTURE_TIME between {start} and {end} and TRANSPORT_TYPE={io} group by TO_LONGTITUDE,TO_LATITUDE,TRANSPORT_TYPE, TO_CITYNAME order by sum(GOODS_NUM) DESC' \
        .format(table=G1_infoSelect["SelectedRealData"], kind=kind, start=trans_start, end=trans_end, io=io)
    cursor.execute(sql)
    res = cursor.fetchall()

    # 以货物数量为排序标准
    index = 0
    temp = []
    for i in res:
        temp.append([])
        for j in i:
            temp[index].append(j)
        temp[index].append(ValueToRadius(index, len(res)))
        index += 1
    pointData['to'] = temp

    cursor.close()
    con.close()
    return pointData


def G1_SelectedFromCityList(start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select distinct SEND_CITYNAME from {table} \
        where DEPARTURE_TIME between {start} and {end}' \
        .format(table=G1_infoSelect["SelectedRealData"], start=trans_start, end=trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    temp = []
    for i in res:
        temp.append(i[0])
    cursor.close()
    con.close()
    return temp


def G1_SelectedToCityList(start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select distinct TO_CITYNAME from {table} \
        where DEPARTURE_TIME between {start} and {end}' \
        .format(table=G1_infoSelect["SelectedRealData"], start=trans_start, end=trans_end)
    cursor.execute(sql)
    res = cursor.fetchall()
    temp = []
    for i in res:
        temp.append(i[0])
    cursor.close()
    con.close()
    return temp


def G1_FromCityListSupplyGoods(kind, start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select distinct SEND_CITYNAME from {table} \
        where DEPARTURE_TIME between {start} and {end} and GOODS_TYPE = \'{goods_type}\' ' \
        .format(table=G1_infoSelect["SelectedRealData"], start=trans_start, end=trans_end, goods_type=kind)
    cursor.execute(sql)
    res = cursor.fetchall()
    temp = []
    for i in res:
        temp.append(i[0])
    cursor.close()
    con.close()
    return temp


def G1_SortFromCitiesByGoodsVal(kind, start, end):
    con = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    cursor = con.cursor()
    trans_start = 'to_date(\'{}\',\'{}\')'.format(start, 'YY-MM-DD HH24:Mi:SS')
    trans_end = 'to_date(\'{}\',\'{}\')'.format(end, 'YY-MM-DD HH24:Mi:SS')
    sql = 'select SEND_CITYNAME, sum(GOODS_NUM), sum(GOODS_WEIGHT) from {table} \
        where DEPARTURE_TIME between {start} and {end} and GOODS_TYPE = \'{goods_type}\' ' \
          'group by SEND_CITYNAME' \
        .format(table=G1_infoSelect["SelectedRealData"], start=trans_start, end=trans_end, goods_type=kind)
    cursor.execute(sql)
    data = cursor.fetchall()
    temp = []
    index = 0
    for i in data:
        temp.append([])
        for j in i:
            temp[index].append(j)
        index += 1

    res_num = {'CityList': [], 'NumList': []}
    temp.sort(key=lambda x: x[1])
    for i in temp:
        res_num['CityList'].append(i[0])
        res_num['NumList'].append(i[1])

    res_weight = {'CityList': [], 'WeightList': []}
    temp.sort(key=lambda x: x[2], reverse=True)
    for i in temp:
        res_weight['CityList'].append(i[0])
        res_weight['WeightList'].append(i[2])

    res = {}
    # Top 5 限制
    if len(res_num['CityList']) > 5:
        res['CityListSortByNum'] = res_num['CityList'][0:5]
        res['CityListSortByWeight'] = res_weight['CityList'][0:5]
        res['NumList'] = res_num['NumList'][0:5]
        res['WeightList'] = res_weight['WeightList'][0:5]
    else:
        res['CityListSortByNum'] = res_num['CityList']
        res['CityListSortByWeight'] = res_weight['CityList']
        res['NumList'] = res_num['NumList']
        res['WeightList'] = res_weight['WeightList']
    cursor.close()
    con.close()
    return res


# a = G1_SelectedRealData('生活用品', 1, '2021-01-01 00:00:00', '2021-12-31 00:00:00')
# print(a)
# print(G1_SelectedFromCityList('2021-01-01', '2021-12-31'))
# print(G1_SelectedToCityList('2021-01-01', '2021-12-31'))
# print(G1_FromCityListSupplyGoods('电子产品', '2021-01-01', '2021-12-31'))
# print(G1_SortFromCitiesByGoodsVal('电子产品', '2021-01-01', '2021-12-31'))
