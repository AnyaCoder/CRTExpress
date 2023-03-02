from datetime import datetime
from dateutil.relativedelta import relativedelta
from G3_GetData import *


def split_time(start_date, end_date, interval):
    result = []
    delta_time = offset_time = relativedelta(days=1)
    if interval == 'WEEK':
        delta_time = relativedelta(days=7)
    elif interval == 'MONTH':
        delta_time = relativedelta(months=1) - offset_time

    if start_date + delta_time > end_date:
        result.append((start_date, start_date + delta_time))
    else:
        while start_date + delta_time <= end_date:
            result.append((start_date, start_date + delta_time))
            start_date = start_date + delta_time + offset_time

    return result


def query_from_split_time(split_time_list, interval):
    if not connection_test():
        return None

    for (start_time, end_time) in split_time_list:
        # print(start_time, end_time)
        for port in ports:
            select_port_from_radar(start_time, end_time, interval, port)


def split_data(res, start_date, end_date, interval, key_list):
    if start_date == end_date or interval == 'DAY':
        return res
    result = {}
    for key in key_list:
        result[key] = []
    delta_time = offset_time = relativedelta(days=1)
    if interval == 'WEEK':
        delta_time = relativedelta(days=6)
    elif interval == 'MONTH':
        delta_time = relativedelta(months=1) - offset_time

    # 预处理result字典
    cur_end_date = start_date + delta_time
    start_date_str = datetime.datetime.strftime(start_date, '%y-%m-%d')
    cur_end_date_str = datetime.datetime.strftime(cur_end_date, '%y-%m-%d')
    temp_key = '{} to {}'.format(start_date_str, cur_end_date_str)
    result['time'].append(temp_key)
    for key in key_list[1:]:
        result[key].append(0)
    temp_key_index = 0
    for index in range(len(res['time'])):
        cur_date = datetime.datetime.strptime(res['time'][index], '%y-%m-%d')
        # 如果当前的时间戳在下一时间段内，就更新时间段信息
        if cur_date > cur_end_date:
            start_date = start_date + delta_time + offset_time
            cur_end_date = min(start_date + delta_time, end_date)
            start_date_str = datetime.datetime.strftime(start_date, '%y-%m-%d')
            cur_end_date_str = datetime.datetime.strftime(cur_end_date, '%y-%m-%d')
            temp_key = '{} to {}'.format(start_date_str, cur_end_date_str)
            result['time'].append(temp_key)
            temp_key_index = len(result['time']) - 1
            for key in key_list[1:]:
                result[key].append(0)
                result[key][temp_key_index] += res[key][index]
        # 如果在同一时间段内，就把这个加进去
        else:
            for key in key_list[1:]:
                result[key][temp_key_index] += res[key][index]

    return result
