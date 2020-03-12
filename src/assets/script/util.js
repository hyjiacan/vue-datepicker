import dateUtil from './date'
import formats from './formats'

/**
 * 获取上个月剩下的天数(距离这个月一周内)
 * @param {Date} date
 * @param {Number} weekStart 星期开始量
 * @return {Array}
 */
function getPrevMonthDays (date, weekStart) {
  date = new Date(date.getTime())
  date.setDate(1)

  // 本月1号是星期几
  const weekDay = date.getDay()

  // 临界条件: 正好本月的第一天是【设置的一周的起始量】
  // 不需要数据
  if (weekDay === weekStart) {
    return []
  }

  // 上月需要计入的天数
  let lastDays

  if (weekStart === 0) {
    lastDays = weekDay
  } else if (weekDay === 0) {
    lastDays = 7 - weekStart
  } else if (weekDay < weekStart) {
    // 如果当前星期量小于起始量
    lastDays = (7 + weekDay - weekStart) % 7
  } else {
    // 当前的星期量大于起始量
    // 使用差值就行了
    lastDays = weekDay - weekStart
  }

  // 将时间跳转到上月的最后一天
  date.setDate(0)
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
  for (let i = 1; i <= lastDays; i++) {
    const value = day - lastDays + i
    date.setDate(value)
    days.push({
      overflow: true,
      value,
      year,
      month,
      day: date.getDay()
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
  // 将时间跳转到本月的最后一天
  date.setMonth(date.getMonth() + 1, 0)

  // 本月的最后一天是几号
  const day = date.getDate()
  // 年
  const year = date.getFullYear()
  // 月
  const month = date.getMonth() + 1
  // 天数集合
  const days = []

  for (let i = 1; i <= day; i++) {
    date.setDate(i)
    days.push({
      value: i,
      year,
      month,
      day: date.getDay()
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
    date.setDate(i)
    days.push({
      overflow: true,
      value: i,
      year,
      month,
      day: date.getDay()
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
   * @param weekStart
   */
  getWeekOfYear (year, month, date, formatted, weekStart) {
    const value = new Date(year, month, date)
    const [start, end] = this.getWeekRange(value, weekStart)

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
   * @param {Number} [weekStart=0]
   * @return {*[]}
   */
  makeDateView (date, weekStart) {
    date = date ? this.parse(date) : new Date()
    // 一共是7列5行
    const size = 7 * 5
    const prevMonthDays = getPrevMonthDays(date, weekStart || 0)
    const currentMonthDays = getCurrentMonthDays(date)
    const nextMonthDays = getNextMonthDays(date, size - prevMonthDays.length - currentMonthDays.length)
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  },
  /**
   * 给指定的起始日期设置时间范围 00:00:00 和 23:59:59
   * @param {Date} begin
   * @param {Date} end
   * @private
   */
  appendTime (begin, end) {
    begin.setHours(0, 0, 0)
    end.setHours(23, 59, 59)
  },
  /**
   * 根据一个日期，谋算出其所在周的起止日期
   * @param {Date} date
   * @param {number} [weekStart=0] 周起始量，0-6分别表示星期天到星期六
   * @param {number} [offset=0] 周偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Array<Date>}
   */
  getWeekRange (date, weekStart, offset, appendTime) {
    const weekDay = date.getDay()
    const begin = new Date(date.getTime())

    // 先找出星期天为第一天的日期
    begin.setDate(begin.getDate() - weekDay)

    // ----判断 weekStart 的位置 与传入日期的位置差----

    // 如果 weekStart 大于 传入日期，则直接使用 weekStart 对应的日期为起始

    // 否则，将开始日期 - 7（跳转到上一周）
    // 再移动 weekStart 的天数，就是正确的起始日期
    if (weekStart > weekDay) {
      begin.setDate(begin.getDate() - 7)
    }

    // ----判断 结束----

    if (weekStart) {
      // 再移动 weekStart 的天数，就是正确的起始日期
      begin.setDate(begin.getDate() + weekStart)
    }

    const end = new Date(date.getTime())
    end.setDate(begin.getDate() + 6)

    if (offset) {
      offset = Math.round(offset) * 7
      begin.setDate(begin.getDate() + offset)
      end.setDate(begin.getDate() + offset)
    }

    if (appendTime) {
      this.appendTime(begin, end)
    }

    return [begin, end]
  },
  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {number} [offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Array<Date>}
   */
  getMonthRange (date, offset, appendTime) {
    const begin = new Date(date.getTime())
    const end = new Date(date.getTime())

    begin.setMonth(begin.getMonth() + Math.round(offset), 1)
    end.setMonth(end.getMonth() + Math.round(offset) + 1, 0)

    if (appendTime) {
      this.appendTime(begin, end)
    }

    return [begin, end]
  },
  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {number} [offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Date[]}
   */
  getSeasonRange (date, offset, appendTime) {
    const month = date.getMonth()
    const beginMonth = Math.floor(month / 3) * 3
    const begin = new Date(date.getTime())
    begin.setMonth(beginMonth, 1)

    const end = new Date(date.getTime())
    // 设置为月底
    end.setMonth(begin.getMonth() + 3, 0)

    if (offset) {
      offset = Math.round(offset) * 3
      begin.setMonth(begin.getMonth() + offset, 1)
      end.setMonth(end.getMonth() + offset + 1, 0)
    }

    if (appendTime) {
      this.appendTime(begin, end)
    }

    return [begin, end]
  },
  /**
   * 按照指定的值设置 Date 对象
   * @param {Date|String|Number} date
   * @param {Object} [option]
   * @param {Number} [option.year]
   * @param {Number} [option.month]
   * @param {Number} [option.date]
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
    if (!date1 && !date2) {
      return true
    }
    if (!date1 || !date2) {
      return false
    }
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
