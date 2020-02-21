import dateUtil from './date'
import formats from './formats'

/**
 * 获取上个月剩下的天数(距离这个月一周内)
 * @param {Date} date
 * @return {Array}
 */
function getPrevMonthDays (date) {
  date = new Date(date.getTime())
  // 将时间跳转到上月的最后一天
  date.setDate(0)

  // 上月的最后一天是星期几
  const weekDay = date.getDay()

  // 当星期天作为一周的第一天时，weekDay 为6表示上个月的最后一天是星期六
  if (weekDay === 6) {
    return []
  }
  // 上月的最后一天是几号
  const day = date.getDate()
  // 年
  const year = date.getFullYear()
  // 月
  const month = date.getMonth() + 1
  // 天数集合
  const days = []
  // 上月的最后一天不是星期六(星期天是一周第一天)
  // 那就要在这月显示
  for (let i = 0; i <= weekDay; i++) {
    const value = day - weekDay + i
    days.push({
      overflow: true,
      value,
      year,
      month
    })
  }
  return days
}

/**
 * 获取当月的天数
 * @param {Date} date
 * @return {Array}
 */
function getCurrentMonthDays (date) {
  date = new Date(date.getTime())
  // 设置日期到下个月
  date.setMonth(date.getMonth() + 1)
  // 将时间跳转到本月的最后一天
  date.setDate(0)

  // 本月的最后一天是几号
  const day = date.getDate()
  // 年
  const year = date.getFullYear()
  // 月
  const month = date.getMonth() + 1
  // 天数集合
  const days = []

  for (let i = 1; i <= day; i++) {
    days.push({
      value: i,
      year,
      month
    })
  }

  return days
}

/**
 * 获取这个月底到下个月的天数(距离这个月最后一天的一周内)
 * @param {Date} date
 * @param {number} remain 剩下的空余数量
 * @return {Array}
 */
function getNextMonthDays (date, remain) {
  date = new Date(date.getTime())
  // 设置日期到下个月
  date.setMonth(date.getMonth() + 1)

  // 年
  const year = date.getFullYear()
  // 月
  const month = date.getMonth() + 1
  // 天数集合
  const days = []

  // 多显示7天
  for (let i = 1; i <= remain + 7; i++) {
    days.push({
      overflow: true,
      value: i,
      year,
      month
    })
  }

  return days
}

const util = {
  /**
   * 获取当前日期是一年中的第几天
   * @param date
   * @param includeCurrentMonth
   * @return {number}
   */
  getDayOfYear (date, includeCurrentMonth) {
    date = date ? this.parse(date) : new Date()
    let days = 0
    if (includeCurrentMonth !== false) {
      days += date.getDate()
    }
    // 前面的月份
    let month = date.getMonth()
    for (let i = 0; i < month; i++) {
      date.setMonth(i + 1, 0)
      days += date.getDate()
    }
    return days
  },
  /**
   * 获取传入日期处于一年中的第多少周
   * @param year
   * @param month
   * @param date
   * @param formatted 是否返回格式化串
   */
  getWeekOfYear (year, month, date, formatted) {
    const value = new Date(year, month, date)
    const [start, end] = this.getWeekRange(value)

    let week

    // 处理跨年的情况
    if (start.getFullYear() < end.getFullYear()) {
      year = end.getFullYear()
      week = Math.ceil(this.getDayOfYear(end) / 7)
    } else {
      // 年末
      week = Math.ceil(this.getDayOfYear(start) / 7)
    }
    return formatted ? [week, `${year}年 第${week}周`] : week
  },
  /**
   * 根据传入日期生成日期所在月的日历视图
   * @param {Date|String|Number} date
   * @return {*[]}
   */
  makeDateView (date) {
    date = date ? this.parse(date) : new Date()
    // 一共是7列5行
    const size = 7 * 5
    const prevMonthDays = getPrevMonthDays(date)
    const currentMonthDays = getCurrentMonthDays(date)
    const nextMonthDays = getNextMonthDays(date, size - prevMonthDays.length - currentMonthDays.length)
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  },
  /**
   * 根据一个日期，谋算出其所在周的起止日期
   * @param {Date|String|Number} date
   * @return {Array<Date>}
   */
  getWeekRange (date) {
    const weekDay = date.getDay()
    const begin = new Date(date.getTime())
    begin.setDate(begin.getDate() - weekDay)

    const end = new Date(date.getTime())
    end.setDate(begin.getDate() + 6)
    return [begin, end]
  },
  /**
   *
   * @param {Date} date
   * @return {Date[]}
   */
  getSeasonRange (date) {
    const month = date.getMonth()
    const beginMonth = Math.floor(month / 3) * 3
    const begin = new Date(date.getTime())
    begin.setMonth(beginMonth, 1)

    const end = new Date(date.getTime())
    // 设置为月底
    end.setMonth(begin.getMonth() + 3, 0)
    return [begin, end]
  },
  /**
   * 按照指定的值设置 Date 对象
   * @param {Date|String|Number} date
   * @param {Object} [option]
   * @param {Number} [option.year]
   * @param {Number} [option.month]
   * @param {Number} [option.day]
   * @param {Number} [option.hour]
   * @param {Number} [option.minute]
   * @param {Number} [option.second]
   * @param {Boolean} [option.copy=true]
   * @return {Date}
   */
  setDate (date, option) {
    const {year, month, date: day, hour, minute, second, copy} = {
      copy: true,
      ...option
    }
    const temp = copy ? new Date(date.getTime()) : date
    if (year !== undefined && year !== null) {
      temp.setFullYear(year)
    }
    if (month !== undefined && month !== null) {
      temp.setMonth(month, 1)
    }
    if (day !== undefined && day !== null) {
      temp.setDate(day)
    }
    if (hour !== undefined && hour !== null) {
      temp.setHours(hour, 0, 0)
    }
    if (minute !== undefined && minute !== null) {
      temp.setMinutes(minute, 0)
    }
    if (second !== undefined && second !== null) {
      temp.setSeconds(second)
    }
    return temp
  },
  /**
   * 将任意类型的日期格式转换成 Date 类型
   * @param {Date|String|Number} date
   * @param {String} [format] 当 date 是字符串时，通过此参数指定格式
   * @return {Date}
   */
  parse (date, format) {
    if (date instanceof Date) {
      return new Date(date.getTime())
    }
    if (date instanceof Number) {
      return new Date(date)
    }

    if (typeof date === 'string') {
      switch (date.length) {
        case 4: // 2018 -> 2018-01-01
          date = `${date}-01-01`
          break
        case 5: // 10:10 -> 1970-01-01 10:10:00
          if (format === formats.time) {
            date = `1970-01-01 ${date}:00`
          }
          break
        case 7: // 2018-10 -> 2018-10-01
          date = `${date}-01`
          break
        case 8: // 10:10:10 -> 1970-01-01 10:10:10
          if (format === formats.time) {
            date = `1970-01-01 ${date}`
          }
          break
        case 16: // 2018-10-10 10:10 -> 2018-10-10 10:10:00
          if (format === formats.datetime) {
            date = `${date}:00`
          }
          break
      }
    }

    return dateUtil.parse(date, format) || new Date(date)
  },
  /**
   * 将任意格式的日期格式化成指定的格式
   * @param {Date|String|Number} date
   * @param {String} format 输出格式
   * @param {String} [inputFormat] 当 date 是字符串时，通过此参数指定格式，不指定时使用 format 的值
   * @return {string}
   */
  format (date, format, inputFormat) {
    const value = this.parse(date, inputFormat || format)
    return dateUtil.format(value, format)
  },
  /**
   *
   * @param {Date|String|Number} date1
   * @param {Date|String|Number} date2
   * @param {String} format 日期格式
   * @return {boolean}
   */
  equals (date1, date2, format) {
    return this.format(date1, format) === this.format(date2, format)
  },
  pad (val, len, fill) {
    val = String(val)
    len = len || 2
    fill = fill || '0'
    while (val.length < len) {
      val = fill + val
    }
    return val
  }
}

export default util
