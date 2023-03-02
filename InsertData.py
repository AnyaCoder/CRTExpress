# -*- coding: UTF-8 -*-
import random

import cx_Oracle as cx
import numpy as np
import matplotlib.pyplot as plt

Imaginary = {
    "table": "GRACEFULGOODS_SHOW_INFO",
    "text": "Weapons"
}

# 拟合数据控制器
FittingData = {
    # 生成文本文件的名字
    "text": "DailyLifeGoods",
    # 数量曲线待拟合点的横纵坐标（纵坐标最好为整数）
    "num_point_x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "num_point_y": [100, 120, 150, 160, 140, 120, 110, 108, 113, 125, 133, 145, 155, 178, 190],
    # 重量曲线待拟合点的横纵坐标
    "weight_point_x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "weight_point_y": [100, 120, 150, 160, 140, 120, 110, 108, 113, 125, 133, 145, 155, 178, 190],
    # 重量数据小数点位数（单位：kg）
    "weight_digit": 3,
    # 拟合区间（-1对应最后一个点）
    "num_fit_range": [0, -1],
    "weight_fit_range": [0, -1],
    # 拟合系数
    "num_fitLevel": 8.5,
    "weight_fitLevel": 8.5,
    # 扰动系数
    "num_floatLevel": 5,
    "weight_floatLevel": 1,
    # 收缩系数
    "num_shrinkLevel": 1,
    "weight_shrinkLevel": 1,
    # 数据条数
    "linesNum": 10000,
    # 显示
    "num_curve": 1,
    "weight_curve": 1,
}


def generateFittingData():
    if FittingData["num_curve"] == 1:
        # 待拟合点排序
        index = 0
        num_point_list = []
        for i in FittingData["num_point_x"]:
            num_point_list.append([])
            num_point_list[index].append(i)
            index += 1
        index = 0
        for i in FittingData["num_point_y"]:
            num_point_list[index].append(i)
            index += 1
        num_point_list.sort(key=lambda x: x[0])
        num_point = {}
        for i in num_point_list:
            num_point[i[0]] = i[1]
        num_x = np.array(list(num_point.keys()))
        num_y = np.array(list(num_point.values()))
        fit = np.polyfit(num_x, num_y, FittingData["num_fitLevel"])
        num_fun = np.poly1d(fit)
        plt.plot(num_x, num_y, "r*", label="num_point")
        num_x_fit = np.linspace(num_x[FittingData["num_fit_range"][0]], num_x[FittingData["num_fit_range"][1]],
                                FittingData["linesNum"])
        num_r_normal = np.random.normal(0, FittingData["num_floatLevel"], FittingData["linesNum"]) / \
                       FittingData[
                           "num_shrinkLevel"]
        # 数量 整数化处理
        num_y_fit = num_fun(num_x_fit) + num_r_normal
        for i in range(len(num_y_fit)):
            num_y_fit[i] = int(num_y_fit[i])
        plt.plot(num_x_fit, num_y_fit, "b", label="num_curve")

    if FittingData["weight_curve"]:
        # 待拟合点排序
        index = 0
        weight_point_list = []
        for i in FittingData["weight_point_x"]:
            weight_point_list.append([])
            weight_point_list[index].append(i)
            index += 1
        index = 0
        for i in FittingData["weight_point_y"]:
            weight_point_list[index].append(i)
            index += 1
        weight_point_list.sort(key=lambda x: x[0])
        weight_point = {}
        for i in weight_point_list:
            weight_point[i[0]] = i[1]
        weight_x = np.array(list(weight_point.keys()))
        weight_y = np.array(list(weight_point.values()))
        fit = np.polyfit(weight_x, weight_y, FittingData["weight_fitLevel"])
        weight_fun = np.poly1d(fit)
        plt.plot(weight_x, weight_y, "g*", label="weight_point")
        weight_x_fit = np.linspace(weight_x[FittingData["weight_fit_range"][0]],
                                   weight_x[FittingData["weight_fit_range"][1]], FittingData["linesNum"])
        weight_r_normal = np.random.normal(0, FittingData["weight_floatLevel"], FittingData["linesNum"]) / \
                          FittingData[
                              "weight_shrinkLevel"]
        # 重量 小数位控制
        weight_y_fit = weight_fun(weight_x_fit) + weight_r_normal
        for i in range(len(weight_y_fit)):
            weight_y_fit[i] = round(weight_y_fit[i], FittingData["weight_digit"])
        plt.plot(weight_x_fit, weight_y_fit, "y", label="weight_curve")

    if FittingData["num_curve"] == 1 or FittingData["weight_curve"] == 1:
        plt.xlabel('time')
        plt.ylabel('value')
        plt.title('Fitting result')
        plt.legend()
        plt.show()

    if FittingData["num_curve"] == 1 and FittingData["weight_curve"] == 1:
        fp = open("FITTING_DATA/{}.txt".format(FittingData["text"]), "w")
        for i in range(1, FittingData["linesNum"] + 1):
            fp.write("{order} {num} {weight}\n".format(order=i, num=int(num_y_fit[i - 1]),
                                                       weight=round(weight_y_fit[i - 1], FittingData["weight_digit"])))


def insertSql(Id, GOODS_TYPE, GOODS_NUM, GOODS_WEIGHT, DEPARTURE_TIME, SEND_LONGTITUDE, SEND_LATITUDE, TO_LONGTITUDE,
              TO_LATITUDE, TRANSPORT_TYPE, SEND_CITYNAME, TO_CITYNAME):
    DEPARTURE_TIME = "to_date(\'{}\', \'yyyy-mm-dd\')".format(DEPARTURE_TIME)
    sql = "insert into {table} " \
          "values({id}, \'{goods_type}\', {goods_num}, {goods_weight}, {departure_time}, {send_long}, {send_la}, {to_long}, {to_la}, {transport_type}, \'{send_cityName}\', \'{to_cityName}\')" \
        .format(table=Imaginary["table"], id=Id, goods_type=GOODS_TYPE, goods_num=GOODS_NUM, goods_weight=GOODS_WEIGHT,
                departure_time=DEPARTURE_TIME, send_long=SEND_LONGTITUDE, send_la=SEND_LATITUDE, to_long=TO_LONGTITUDE,
                to_la=TO_LATITUDE, transport_type=TRANSPORT_TYPE, send_cityName=SEND_CITYNAME, to_cityName=TO_CITYNAME)
    return sql


def InsertImaginaryData():
    con = cx.connect('temptest', 'temptest', '81.70.76.251/helowin')
    cursor = con.cursor()
    fp = open("GRACEFULGOODS_NEW_INFO/{}.txt".format(Imaginary["text"]), "r")
    insertData = []
    line = 0
    while True:
        content = fp.readline()
        if content:
            insertData.append(content.split(' '))
            id = int(insertData[line][0])
            goods_type = insertData[line][1]
            goods_num = int(insertData[line][2])
            goods_weight = int(insertData[line][3])
            departure_time = insertData[line][4]
            send_long = float(insertData[line][5])
            send_la = float(insertData[line][6])
            to_long = float(insertData[line][7])
            to_la = float(insertData[line][8])
            transport_type = int(insertData[line][9])
            send_cityName = insertData[line][10].split('\n')[0]
            to_cityName = insertData[line][11].split('\n')[0]
            sql = insertSql(id, goods_type, goods_num, goods_weight, departure_time, send_long, send_la, to_long, to_la,
                            transport_type, send_cityName, to_cityName)
            print(sql)
            cursor.execute(sql)
            line += 1
            # print(content)
        else:
            break
    fp.close()
    con.commit()
    cursor.close()
    con.close()


# InsertImaginaryData()
generateFittingData()
