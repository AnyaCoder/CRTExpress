import cx_Oracle as cx
import datetime
from db_configuration import *

ports = {
    '阿拉山口(境)': '10002',
    '霍尔果斯(境)': '43120',
    '满洲里(境)': '57872A',
    '二连(境)': '885',
    '绥芬河(境)': '622520',
    '凭祥(境)': '67f87d32274e44fcbaa1b92f6de5b456',
}


# db_config = {
#     'id': 'wty',
#     'psw': 'wty',
#     'host': '172.31.41.144:1522/helowin',
#     'encoding': 'UTF-8'
# }


def connection_test():
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    if conn is None:
        return False
    else:
        return True


def select_db(start_date, end_date, interval):
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()

    result = {
        'label': [],
        'value': []
    }
    date_template = 'YY-MM-DD HH24:Mi:SS'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    if interval == b'DAY':
        date_template = 'YY-MM-DD'
    elif interval == b'MONTH':
        date_template = 'YY-MM'

    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    sql = 'select to_char(\"box_date\", \'{}\'), count(*) from ' \
          '(select \"box_date\" from \"box_info\" where \"box_date\" between {} and {}) as bibd ' \
          'group by to_char(\"box_date\", \'{}\') ' \
          'order by to_char(\"box_date\", \'{}\')'.format(date_template, start_date_str, end_date_str, date_template,
                                                          date_template)
    # print(sql)
    csr.execute(sql)
    for res in csr:
        # print(res)
        result['label'].append(res[0])
        result['value'].append(res[1])

    return result


def select_port_from_radar(start_date, end_date, interval, port):
    assert type(start_date) == datetime.datetime
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = {
        'values': ''
    }
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)
    sql = 'select avg(f1), avg(f2), avg(f3), avg(f4), avg(f5), avg(f6) from FOR_RADAR ' \
          'where (time between {} ' \
          'and {}) and port like \'{}\'' \
        .format(start_date_str, end_date_str, port)
    csr.execute(sql)

    for res in csr:
        result = list(res)

    return result


def select_boxinfo(start_date, end_date, port):
    assert type(start_date) == datetime.datetime
    assert ports[port] is not None
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result_tmp = {}
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    # in box numbers
    sql_in = 'select to_char(time, \'{}\'), in_num from REAL_BOX_IN ' \
             'where (time between {} ' \
             'and {}) and port_id like \'{}\' order by time' \
        .format(date_template, start_date_str, end_date_str, ports[port])
    # print(sql_in)
    csr.execute(sql_in)

    boxInfoSum = {'inTotal': 0, 'outTotal': 0}

    for res_in in csr:
        if res_in[0] not in result_tmp.keys():
            result_tmp[res_in[0]] = {'in': 0, 'out': 0}
        result_tmp[res_in[0]]['in'] += res_in[1]
        boxInfoSum['inTotal'] += res_in[1]

    # out box numbers
    sql_out = 'select to_char(time, \'{}\'), out_num from REAL_BOX_OUT ' \
              'where (time between {} ' \
              'and {}) and port_id like \'{}\' order by time' \
        .format(date_template, start_date_str, end_date_str, ports[port])
    # print(sql_out)
    csr.execute(sql_out)

    for res_out in csr:
        if res_out[0] not in result_tmp.keys():
            result_tmp[res_out[0]] = {'in': 0, 'out': 0}
        result_tmp[res_out[0]]['out'] += res_out[1]
        boxInfoSum['outTotal'] += res_out[1]

    sort_list = sorted(result_tmp)

    result = {'time': [], 'in': [], 'out': []}
    for k in sort_list:
        result['time'].append(k)
        result['in'].append(result_tmp[k]['in'])
        result['out'].append(result_tmp[k]['out'])

    return result, boxInfoSum


def select_timespan(start_date, end_date, port):
    assert type(start_date) == datetime.datetime
    assert ports[port] is not None
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = {
        'time': [],
        'avg': [],
        'max': [],
        'min': []
    }
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    # sql = 'select to_char(time, \'{}\'), avg_time_span, max_time_span, min_time_span from STAY_TIME ' \
    #       'where (time between {} ' \
    #       'and {}) and port like \'{}\'' \
    #     .format(date_template, start_date_str, end_date_str, port)

    sql = 'select to_char(time, \'{}\'), IN_OUT_AVG, IN_OUT_MAX, IN_OUT_MIN from REAL_BOX_PORT_TIME_IN_OUT ' \
          'where (time between {} ' \
          'and {}) and port_id like \'{}\' order by time' \
        .format(date_template, start_date_str, end_date_str, ports[port])

    # print(sql)
    csr.execute(sql)

    for res in csr:
        result['time'].append(res[0])
        result['avg'].append(max(round(res[1], 3), 0))
        result['max'].append(max(round(res[2], 3), 0))
        result['min'].append(max(round(res[3], 3), 0))

    timespanSum = 0
    for i in result['avg']:
        timespanSum += i

    # print('timespan: ', result)
    return result, timespanSum


def select_timedist(start_date, end_date, port):
    assert type(start_date) == datetime.datetime
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = {
        'labels': ['0-0.5h', '0.5h-1h', '1h-2h', '2h-4h', '4h-8h', '8h+'],
        'data': [],
    }
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    sql = 'select sum(BELOW_POINTFIVE), sum(POINTFIVE_ONE), sum(ONE_TWO), sum(TWO_FOUR), ' \
          'sum(FOUR_EIGHT), sum(BIGGER_THAN_EIGHT) from REAL_BOX_IN_OUT_DISTRIBUTION ' \
          'where (time between {} ' \
          'and {}) and port_id like \'{}\'' \
        .format(start_date_str, end_date_str, ports[port])
    # print(sql)
    csr.execute(sql)

    for res in csr:
        result['data'] = list(res)

    return result


def select_traininfo(start_date, end_date, port):
    assert type(start_date) == datetime.datetime
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = {}
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    # in train numbers
    sql_in = 'select to_char(time, \'{}\'), in_num from REAL_TRAIN_IN ' \
             'where (time between {} ' \
             'and {}) and port_id like \'{}\' order by time' \
        .format(date_template, start_date_str, end_date_str, ports[port])
    # print(sql_in)
    csr.execute(sql_in)

    trainInfoSum = {'inTotal': 0, 'outTotal': 0}

    for res_in in csr:
        if res_in[0] not in result.keys():
            result[res_in[0]] = {'in': 0, 'out': 0}
        result[res_in[0]]['in'] += res_in[1]
        trainInfoSum['inTotal'] += res_in[1]

    # out train numbers
    sql_out = 'select to_char(time, \'{}\'), out_num from REAL_TRAIN_OUT ' \
              'where (time between {} ' \
              'and {}) and port_id like \'{}\' order by time' \
        .format(date_template, start_date_str, end_date_str, ports[port])
    # print(sql_out)
    csr.execute(sql_out)

    for res_out in csr:
        if res_out[0] not in result.keys():
            result[res_out[0]] = {'in': 0, 'out': 0}
        result[res_out[0]]['out'] += res_out[1]
        trainInfoSum['outTotal'] += res_out[1]

    # print(port, trainInfoSum)
    return result, trainInfoSum


def select_trainplan(start_date, end_date, dep, des):
    assert type(start_date) == datetime.datetime
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result_tmp = {}
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    # 计划量
    sql_plan = 'select to_char(time, \'{}\'), plan_num from REAL_TRAIN_PLAN_INFO ' \
               'where (time between {} ' \
               'and {}) and send_name like \'{}\' and port_id like \'{}\' ' \
        .format(date_template, start_date_str, end_date_str, dep, ports[des])
    csr.execute(sql_plan)

    for res_plan in csr:
        if res_plan[0] not in result_tmp.keys():
            result_tmp[res_plan[0]] = {'plan': 0, 'real': 0}
        result_tmp[res_plan[0]]['plan'] += res_plan[1]

    # 实际量
    sql_real = 'select to_char(time, \'{}\'),real_num from REAL_TRAIN_REAL_INFO ' \
               'where (time between {} ' \
               'and {}) and send_name like \'{}\' and port_id like \'{}\' ' \
        .format(date_template, start_date_str, end_date_str, dep, ports[des])
    csr.execute(sql_real)

    for res_real in csr:
        if res_real[0] not in result_tmp.keys():
            result_tmp[res_real[0]] = {'plan': 0, 'real': 0}
        result_tmp[res_real[0]]['real'] += res_real[1]

    sort_list = sorted(result_tmp)

    result = {'time': [], 'plan': [], 'real': []}
    for k in sort_list:
        result['time'].append(k)
        result['plan'].append(result_tmp[k]['plan'])
        result['real'].append(result_tmp[k]['real'])
    # print(result)

    return result


def select_all_dep_or_des(mode):
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = []

    if mode == 'DEP':
        mode_str = 'departure'
    elif mode == 'DES':
        mode_str = 'destination'
    else:
        raise ValueError('mode should be either \'DEP\' or \'DES\'! ')

    sql = 'select distinct {} from TRAIN_PLAN'.format(mode_str, )
    # print(sql)
    csr.execute(sql)

    for i, res in enumerate(csr):
        tmp_dict = {
            'label': i,
            'value': res[0],
        }
        result.append(tmp_dict)
        # result.append(res[0])

    return result


def select_traintime(start_date, end_date, port):
    assert type(start_date) == datetime.datetime
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = {
        'labels': ['0-0.5h', '0.5h-1h', '1h-2h', '2h-4h', '4h-8h', '8h+'],
        'data_through': [],
        'data_ticket': [],
        'data_custom': [],
    }
    date_template = 'YY-MM-DD'
    date_template_raw = 'YY-MM-DD HH24:Mi:SS'
    start_date_str = 'to_date(\'{}\', \'{}\')'.format(start_date, date_template_raw)
    end_date_str = 'to_date(\'{}\', \'{}\')'.format(end_date, date_template_raw)

    sql = 'select sum(BELOW_POINTFIVE), sum(POINTFIVE_ONE), sum(ONE_TWO), sum(TWO_FOUR), ' \
          'sum(FOUR_EIGHT), sum(BIGGER_THAN_EIGHT) from REAL_TRAIN_DISTRIBUTION ' \
          'where (time between {} ' \
          'and {}) and port_id like \'{}\'' \
        .format(start_date_str, end_date_str, ports[port])
    # print(sql)
    csr.execute(sql)

    for res in csr:
        result['data_through'] = list(res)

    sql = 'select sum(BELOW_POINTFIVE), sum(POINTFIVE_ONE), sum(ONE_TWO), sum(TWO_FOUR), ' \
          'sum(FOUR_EIGHT), sum(BIGGER_THAN_EIGHT) from REAL_TICKETS_DISTRIBUTION ' \
          'where (time between {} ' \
          'and {}) and port_id like \'{}\'' \
        .format(start_date_str, end_date_str, ports[port])
    # print(sql)
    csr.execute(sql)

    for res in csr:
        result['data_ticket'] = list(res)

    sql = 'select sum(BELOW_POINTFIVE), sum(POINTFIVE_ONE), sum(ONE_TWO), sum(TWO_FOUR), ' \
          'sum(FOUR_EIGHT), sum(BIGGER_THAN_EIGHT) from REAL_CUSTOMS_DISTRIBUTION ' \
          'where (time between {} ' \
          'and {}) and port_id like \'{}\'' \
        .format(start_date_str, end_date_str, ports[port])
    # print(sql)
    csr.execute(sql)

    for res in csr:
        result['data_custom'] = list(res)

    # print("traintime:\n", result)

    result['ThroughTimeTotal'] = 0
    for i in result['data_through']:
        result['ThroughTimeTotal'] += i

    return result


def station2dict():
    conn = cx.connect(db_config['id'], db_config['psw'], db_config['host'], encoding=db_config['encoding'])
    csr = conn.cursor()
    result = []
    value = 0

    sql = "select distinct SEND_NAME from (select distinct SEND_NAME from REAL_TRAIN_PLAN_INFO union select distinct SEND_NAME from REAL_TRAIN_REAL_INFO) order by SEND_NAME"
    # print(sql)
    csr.execute(sql)

    for res in csr:
        result.append({'value': '{}'.format(value), 'label': res[0]})
        # print(res[0], value)
        value += 1

    # print(result)


def selectPOA_radarGraphData(PortNameList, portName, start_time, end_time, interval):
    totalNum_boxIn = 0
    totalNum_boxOut = 0
    totalNum_trainIn = 0
    totalNum_trainOut = 0
    totalNum_avgTime = 0
    totalNum_throughTime = 0
    Num_boxIn = 0
    Num_boxOut = 0
    Num_trainIn = 0
    Num_trainOut = 0
    Num_avgTime = 0
    Num_throughTime = 0

    for i in PortNameList:
        if i == portName:
            # 集装箱纳入、集装箱发出
            res, SUM = select_boxinfo(start_time, end_time, portName)
            Num_boxIn = SUM['inTotal']
            Num_boxOut = SUM['outTotal']

            # 班列接入量、班列发出量
            in_out, SUM = select_traininfo(start_time, end_time, portName)
            Num_trainIn = SUM['inTotal']
            Num_trainOut = SUM['outTotal']

            # 集装箱滞留
            res, SUM = select_timespan(start_time, end_time, portName)
            Num_avgTime = SUM

            # 列车通行
            res = select_traintime(start_time, end_time, portName)
            Num_throughTime = res['ThroughTimeTotal']

        # 集装箱纳入、集装箱发出
        res, SUM = select_boxinfo(start_time, end_time, i)
        totalNum_boxIn += SUM['inTotal']
        totalNum_boxOut += SUM['outTotal']

        # 班列接入量、班列发出量
        in_out, SUM = select_traininfo(start_time, end_time, i)
        totalNum_trainIn += SUM['inTotal']
        totalNum_trainOut += SUM['outTotal']

        # 集装箱滞留
        res, SUM = select_timespan(start_time, end_time, i)
        totalNum_avgTime += SUM

        # 列车通行
        res = select_traintime(start_time, end_time, i)
        totalNum_throughTime += res['ThroughTimeTotal']

    res = {}
    res['portName'] = portName
    res['totalNum_boxIn'] = int(totalNum_boxIn)
    res['totalNum_boxOut'] = int(totalNum_boxOut)
    res['totalNum_trainIn'] = int(totalNum_trainIn)
    res['totalNum_trainOut'] = int(totalNum_trainOut)
    res['totalNum_avgTime'] = int(totalNum_avgTime)
    res['totalNum_throughTime'] = int(totalNum_throughTime)
    res['Num_boxIn'] = int(Num_boxIn)
    res['Num_boxOut'] = int(Num_boxOut)
    res['Num_trainIn'] = int(Num_trainIn)
    res['Num_trainOut'] = int(Num_trainOut)
    res['Num_avgTime'] = int(Num_avgTime)
    res['Num_throughTime'] = int(Num_throughTime)
    return res
