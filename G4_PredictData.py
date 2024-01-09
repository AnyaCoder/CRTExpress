# encoding: utf-8

from db_configuration import *

import datetime

import numpy as np

import cx_Oracle

categories_group = [
    [
        '生活用品', '食用品', '服装首饰',
        '文画古藏', '杂项制品', '武器火药'
    ],
    [
        '金属制品', '运输工具', '材料制品',
        '化学产品', '矿产品', '电子产品'
    ]
]

# 历史数据时间段
real_start = "2021-12-1"
real_end = "2021-12-31"

# 预测时间段长度
predict_days = 10

table_name = "GRACEFULGOODS_TEST_INFO"

fitting_level = 12


def SQL_toDateTime(date):
    """
    将日期字符串转换为sql语句中的日期
    :param date: 待转换日期（type: str 格式：yyyy-mm-dd）
    :return: sql语句可执行的日期字符串
    """
    trans_datetime = 'to_date(\'{}\',\'{}\')'.format(date, 'YY-MM-DD HH24:Mi:SS')

    return trans_datetime


def SQL_select(cursor, table_name, *args, **kwargs):
    """
    select简单语句获取数据库信息

    select 字段1, 字段2, ... from 表名
    [where a = b and c = d and ...]
    [a1 between b1 and c1 and a2 between b2 and c2 and ...]
    [group by a, b, ...]
    [order by a [ASC]/DESC, b [ASC]/DESC, ...]

    :param table_name: 数据库表名
    :param args: select 目标（type: list）
    :param kwargs:
        "=" - [[a, b], [c, d], ...]（约束条件：a == b, c == d, ...）,
        "between_and" - [[attribute, from, to], ...]（约束条件：from <= attribute <= to, ...）
        "like" - [[a, b], ...]（约束条件：a like b, ...）

        "group_by" - [a, b, c, ...] （约束条件：group by a, b, c, ...）
        "order_by" - [[a, "ASC/DESC"], [b, "ASC/DESC"], ...] （约束条件：order by a ASC/DESC, b ASC/DESC, ...）
    :return: select语句获取的数据记录信息
    """
    sql = "select "

    # 索引，记录约束变量的位置（用于分隔）
    index = 0

    for key in args:
        # 添加select目标
        if index > 0:
            sql += ", "
        sql += key

        index += 1

    sql += " from " + table_name

    index = 0

    if "=" in kwargs.keys():
        # “等于”约束条件
        sql += " where "

        is_limited = True

        for a_b in kwargs["="]:
            if index > 0:
                sql += " and "
            sql += a_b[0] + "=" + a_b[1]

            index += 1
    else:
        is_limited = False

    if "between_and" in kwargs.keys():
        # “范围”约束条件
        if not is_limited:
            sql += " where "

            is_limited = True
        else:
            sql += " and "

        index = 0

        for a_between_b_and_c in kwargs["between_and"]:
            if index > 0:
                sql += " and "
            sql += a_between_b_and_c[0] + " between " + a_between_b_and_c[1] + " and " + a_between_b_and_c[2]

    if "like" in kwargs.keys():
        # 相似匹配
        if not is_limited:
            sql += " where "
        else:
            sql += " and "

        index = 0

        for a_like_b in kwargs["like"]:
            if index > 0:
                sql += " and "
            sql += a_like_b[0] + " like " + a_like_b[1]

            index += 1

    if "group_by" in kwargs.keys():
        # “分组”约束条件
        sql += " group by "

        index = 0

        for group in kwargs["group_by"]:
            if index > 0:
                sql += ", "
            sql += group

            index += 1

    if "order_by" in kwargs.keys():
        # “排序”约束条件（排序标准-排序方式（升序/降序））
        sql += " order by "

        index = 0

        for attr_order in kwargs["order_by"]:
            if index > 0:
                sql += ", "
            # 排序标准
            sql += attr_order[0]

            # 排序顺序（升序/降序）
            sql += " " + attr_order[1]

            index += 1

    print(">> select: " + sql)

    cursor.execute(sql)

    res = cursor.fetchall()

    return res


def Selected_Goods_Time_Value_Series(cursor, category, start, end, interval=1):
    """
    获取 指定货物种类 不同粒度（天，周，月） 的 时间-值 序列
    :param category: 货物种类（type: str）
    :param start: 起始时间（type: str; format: yyyy-mm-dd）
    :param end: 终止时间（type: str; format: yyyy-mm-dd）
    :param interval: 时间粒度（1-天 7-周 30-月）
    :return: 货物 时间-值 序列：
        res = {
            "time": ["2021-12-01", ...],（时间）
            "num": [22, ...],（对应数量）
            "weight": [17.9, ...]（对应重量）
        }
    """
    # 时间转换
    trans_start = SQL_toDateTime(start)
    trans_end = SQL_toDateTime(end)

    # 要获取的字段内容
    selected_attrs = [
        "DEPARTURE_TIME",
        "GOODS_NUM", "GOODS_WEIGHT"
    ]

    # 约束条件
    selected_conditions = {
        "=": [
            ["GOODS_TYPE", "\'" + category + "\'"]
        ],
        "between_and": [
            ["DEPARTURE_TIME", trans_start, trans_end]
        ]
    }

    # 获取所有数据条记录
    records = SQL_select(cursor, table_name, *selected_attrs, **selected_conditions)

    # 按发车时间（departure_time）从早到晚的顺序对数据记录排序，便于粒度聚合处理
    records.sort()

    # 设定时间间隔
    time_delta = datetime.timedelta(days=interval)

    start = datetime.datetime.strptime(start, "%Y-%m-%d")

    end = datetime.datetime.strptime(end, "%Y-%m-%d")

    time_seq = []

    value_seq = {
        "num": [],
        "weight": []
    }

    # 计算对应粒度的时间结点序列
    while start < end:
        time_seq.append(start)

        value_seq["num"].append(0)
        value_seq["weight"].append(0)

        start += time_delta

    # 时间序列索引，标志第几个 时间-值 点（从0开始）
    t_index = 0

    # 记录条数索引，标志第几条记录
    r_index = 0

    # 记录条数
    record_num = len(records)

    # 时间点的数目
    t_node_num = len(time_seq)

    while r_index < record_num:
        # record: [departure_time, goods_num, goods_weight]
        record = records[r_index]

        # 分配属性
        departure_time, goods_num, goods_weight = record[:]

        if departure_time <= time_seq[t_index]:
            value_seq["num"][t_index] += goods_num
            value_seq["weight"][t_index] += goods_weight
        else:
            t_index += 1

            if t_index >= t_node_num:
                break

            continue

        r_index += 1

    # 将时间结点的数据类型转换为字符串
    for i in range(t_node_num):
        time_seq[i] = datetime.datetime.strftime(time_seq[i], "%Y-%m-%d")

    # 返回统计数据字典
    res = {
        "time": time_seq,
        "num": value_seq["num"],
        "weight": value_seq["weight"]
    }

    return res


def Get_Goods_Prediction_Data(page_index):
    res = {
        # "daily_life_goods": {
        #     "real_time": [],
        #     "real_num": [],
        #     "real_weight": [],
        #
        #     "predict_time": [],
        #     "predict_num": [],
        #     "predict_weight": []
        # },
        # "foods": {
        #     "real_time": [],
        #     "real_num": [],
        #     "real_weight": [],
        #
        #     "predict_time": [],
        #     "predict_num": [],
        #     "predict_weight": []
        # },
        # ...
    }

    # 连接数据库
    con = cx_Oracle.connect(
        db_config['id'],
        db_config['psw'],
        db_config['host'],
        encoding=db_config['encoding']
    )

    # 获取数据库游标
    cursor = con.cursor()

    # 获取未来预测时间序列
    predict_time_series = []

    predict_start = datetime.datetime.strptime(real_end, "%Y-%m-%d")
    time_delta = datetime.timedelta(days=1)

    for i in range(predict_days):
        predict_time_series.append(datetime.datetime.strftime(predict_start, "%Y-%m-%d"))

        predict_start += time_delta

    categories = categories_group[page_index]

    for category in categories:
        time_value_series = Selected_Goods_Time_Value_Series(cursor, category, real_start, real_end)
        res[category] = {
            "real_time": time_value_series["time"],
            "real_num": time_value_series["num"],
            "real_weight": time_value_series["weight"]
        }

        real_days = len(time_value_series["time"])

        x_time = np.array(
            np.arange(0, real_days, 1)
        )

        y_num = np.array(time_value_series["num"])
        y_weight = np.array(time_value_series["weight"])

        # 线性回归
        time_num_fit = np.polyfit(x_time, y_num, fitting_level)

        time_weight_fit = np.polyfit(x_time, y_weight, fitting_level)

        predict_x_time = np.array(
            np.arange(real_days - predict_days, real_days, 1)
        )

        num_fit_fun = np.poly1d(time_num_fit)
        weight_fit_fun = np.poly1d(time_weight_fit)

        predict_num = list(num_fit_fun(predict_x_time))
        predict_weight = list(weight_fit_fun(predict_x_time))

        res[category]["predict_time"] = predict_time_series
        res[category]["predict_num"] = [int(i) for i in predict_num]
        res[category]["predict_weight"] = [round(i, 2) for i in predict_weight]

    # 关闭数据库
    cursor.close()
    con.close()

    return res


# res = Get_Goods_Prediction_Data(0)
# print(res)
