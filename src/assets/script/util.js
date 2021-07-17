import dateUtil from './date'

/**
 * 获取上个月剩下的天数(距离这个月一周内)
 * @param {Date} date
 * @param {Number} weekStart 星期开始量
 * @return {Array}
 */
function getPrevMonthDays(date, weekStart) {
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
      date: value,
      value: date,
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
function getCurrentMonthDays(date) {
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
      date: i,
      value: date,
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
function getNextMonthDays(date, remain) {
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
      date: i,
      value: date,
      year,
      month,
      day: date.getDay()
    })
  }

  return days
}

/**
 * 解析日期偏移串
 * @param {Object|string} offset
 * @return {{year: number, month: number, date: number}}
 */
function resolveDateOffset(offset) {
  if (!offset) {
    return {
      year: 0,
      month: 0,
      date: 0
    }
  }
  // 值是偏移对象
  if (typeof offset === 'object') {
    return offset
  }
  // 不是字符串，数据无效
  if (typeof offset !== 'string') {
    throw Error(`[datepicker] Invalid offset type: ${typeof offset}`)
  }
  // 值是偏移串
  const matches = /^((?<year>-?(\d+)?)y)?((?<month>-?(\d+)?)m)?((?<date>-?(\d+)?)d)?$/i.exec(offset)
  if (!matches) {
    throw Error(`[datepicker] Invalid offset value: ${offset}`)
  }

  return {
    year: parseInt(matches.groups.year) || 0,
    month: parseInt(matches.groups.month) || 0,
    date: parseInt(matches.groups.date) || 0
  }
}

const util = {
  /**
   * 获取当前日期是一年中的第几天
   * @param date
   * @param includeCurrentMonth
   * @return {number}
   */
  getDayOfYear(date, includeCurrentMonth) {
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
   * @param {Date|Date[]} date
   * @param {object} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, week: Number}}
   */
  getWeekOfYear(date, option) {
    option = {
      start: 0,
      ...option
    }
    const [start] = Array.isArray(date) ? date.map(d => this.parse(d)) :
      this.getWeekRange(date, {start: option.start})

    // 当传入的是日期范围时，date + 3 ，表示一周中间的那一天
    // 得到周所在的日期
    const weekDate = Array.isArray(date) ? this.offsetDate(start, {date: 3}) : date

    // 当年的第一天是星期几
    const weekDayOfFirstDay = this.setDate(weekDate, {month: 0, date: 1}).getDay()

    // 周日期所在年的第一天的星期数 + 周日期所在其年的天数 - 起始日期 / 7
    // 得到周数
    const offset = weekDayOfFirstDay > option.start ? option.start : option.start - 7
    const days = weekDayOfFirstDay + this.getDayOfYear(weekDate) - offset
    return {
      year: weekDate.getFullYear(),
      week: Math.ceil(Math.abs(days) / 7)
    }
  },
  /**
   * 获取传入日期处于一月中的第多少周
   * @param {Date|Date[]} date
   * @param {object} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, month: Number, week: Number}}
   */
  getWeekOfMonth(date, option) {
    option = {
      start: 0,
      ...option
    }
    const [start] = Array.isArray(date) ? date.map(d => this.parse(d)) :
      this.getWeekRange(date, {start: option.start})

    // 当传入的是日期范围时，date + 3 ，表示一周中间的那一天
    // 得到周所在的日期
    const weekDate = Array.isArray(date) ? this.offsetDate(start, {date: 3}) : date

    // 当月的第一天是星期几
    const weekDayOfFirstDay = this.setDate(weekDate, {date: 1}).getDay()

    // 周日期所在月的第一天的星期数 + 周日期所在其月的天数 - 起始日期 / 7
    // 得到周数
    const offset = weekDayOfFirstDay > option.start ? option.start : option.start - 7
    const days = weekDayOfFirstDay + weekDate.getDate() - offset
    return {
      year: weekDate.getFullYear(),
      month: weekDate.getMonth(),
      week: Math.ceil(Math.abs(days) / 7)
    }
  },
  /**
   * 根据传入日期生成日期所在月的日历视图
   * @param {Date|String|Number} date
   * @param {Number} [weekStart=0]
   * @return {*[]}
   */
  makeDateView(date, weekStart) {
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
  appendTime(begin, end) {
    begin.setHours(0, 0, 0)
    end.setHours(23, 59, 59)
  },
  /**
   * 按指定规则对日期进行偏移
   * @param {Date} date
   * @param {Object|string} offset 日期的偏移量
   * @return {Date} 偏移后的日期对象（新对象)
   */
  offsetDate(date, offset) {
    offset = resolveDateOffset(offset)

    const newValue = {
      year: date.getFullYear() + (parseInt(offset.year) || 0),
      month: date.getMonth() + (parseInt(offset.month) || 0),
      date: 1
    }

    const newDate = new Date(newValue.year, newValue.month, newValue.date)

    const newLastDate = date.getDate() + (parseInt(offset.date) || 0)
    if (offset.date) {
      newDate.setDate(newLastDate)
      return newDate
    }

    // 当未指定日期偏移时
    // 使用原日期的 date
    // 此处的逻辑是为了防止日期大于本月的最后一天
    const lastDate = this.getLastDayOfMonth(newDate)
    if (newLastDate <= lastDate) {
      newDate.setDate(newLastDate)
      return newDate
    }

    newDate.setDate(lastDate)
    return newDate
  },
  /**
   * 获取指定月份的最后一天是几号
   * @param {Date} date
   * @param {number} [month] 不指定时，使用当前日期的月份
   * @return {number}
   */
  getLastDayOfMonth(date, month) {
    month = arguments.length > 1 ? month : date.getMonth()
    // 获取当月最后一天
    const temp = this.setDate(date, {
      month: month + 1,
      date: 0
    })
    return temp.getDate()
  },
  /**
   * 根据一个日期以及偏移参数获取日期范围
   * @param {Date} date
   * @param {Object|string} [beginOffset] 开始日期的偏移量
   * @param {Object|string} [endOffset] 结束日期的偏移量
   * @param {object} [option]
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @param {boolean} [option.time=false] 是否附带时间串
   * @return {Date[]|String[]}
   */
  getDateRange(date, beginOffset, endOffset, option) {
    const {time, format} = option || {}

    const begin = this.offsetDate(date, beginOffset)
    const end = this.offsetDate(date, endOffset)

    if (time) {
      this.appendTime(begin, end)
    }

    const range = [begin, end]
    return format ? range.map(d => this.format(d, format)) : range
  },
  /**
   * 根据一个日期，谋算出其所在周的起止日期
   * @param {Date} date
   * @param {Object} [option]
   * @param {number} [option.start=0] 周起始量，0-6分别表示星期天到星期六
   * @param {number} [option.offset=0] 周偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getWeekRange(date, option) {
    const {start, offset, time, format} = {
      start: 0,
      offset: 0,
      ...option
    }
    const weekDay = date.getDay()
    const begin = new Date(date.getTime())

    // 先找出星期天为第一天的日期
    begin.setDate(begin.getDate() - weekDay)

    // ----判断 start 的位置 与传入日期的位置差----

    // 如果 start 大于 传入日期，则直接使用 start 对应的日期为起始

    // 否则，将开始日期 - 7（跳转到上一周）
    // 再移动 start 的天数，就是正确的起始日期
    if (start > weekDay) {
      begin.setDate(begin.getDate() - 7)
    }

    // ----判断 结束----

    if (start) {
      // 再移动 start 的天数，就是正确的起始日期
      begin.setDate(begin.getDate() + start)
    }

    const end = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate() + 6)

    if (offset) {
      begin.setDate(begin.getDate() + Math.round(offset) * 7)
      end.setFullYear(begin.getFullYear(), begin.getMonth(), begin.getDate() + 6)
    }

    if (time) {
      this.appendTime(begin, end)
    }

    const range = [begin, end]
    return format ? range.map(d => this.format(d, format)) : range
  },
  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {Object} [option]
   * @param {number} [option.offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getMonthRange(date, option) {
    const {offset, time, format} = {
      offset: 0,
      ...option
    }
    const begin = new Date(date.getTime())
    const end = new Date(date.getTime())

    begin.setMonth(begin.getMonth() + Math.round(offset), 1)
    end.setMonth(end.getMonth() + Math.round(offset) + 1, 0)

    if (time) {
      this.appendTime(begin, end)
    }

    const range = [begin, end]
    return format ? range.map(d => this.format(d, format)) : range
  },
  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {Object} [option]
   * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getQuarterRange(date, option) {
    const {offset, time, format} = {
      offset: 0,
      ...option
    }
    const month = date.getMonth()
    const beginMonth = Math.floor(month / 3) * 3
    const begin = new Date(date.getTime())
    begin.setMonth(beginMonth, 1)

    const end = new Date(date.getTime())
    // 设置为月底
    end.setMonth(begin.getMonth() + 3, 0)

    if (offset) {
      begin.setMonth(begin.getMonth() + Math.round(offset) * 3, 1)
      end.setFullYear(begin.getFullYear(), end.getMonth() + Math.round(offset) * 3 + 1, 0)
    }

    if (time) {
      this.appendTime(begin, end)
    }

    const range = [begin, end]
    return format ? range.map(d => this.format(d, format)) : range
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
  setDate(date, option) {
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
  parse(date, format) {
    if (date instanceof Date) {
      return new Date(date.getTime())
    }
    if (date instanceof Number) {
      return new Date(date)
    }

    if (typeof date === 'string') {
      let today = this.format(new Date(), 'yyyy-MM-dd')
      if (/^\d{4}$/.test(date)) {
        // 2018 -> 2018-01-01
        date = `${date}-01-01`
        if (!format) {
          format = 'yyyy-MM-dd'
        }
      } else if (/^\d{2}:\d{2}$/.test(date)) {
        // 10:10 -> 20xx-01-01 10:10:00
        date = `${today} ${date}:00`
        if (!format) {
          format = 'yyyy-MM-dd HH:mm:ss'
        }
      } else if (/^\d{4}-\d{2}$/.test(date)) {
        // 2018-10 -> 2018-10-01
        date = `${date}-01`
        if (!format) {
          format = 'yyyy-MM-dd'
        }
      } else if (/^\d{2}:\d{2}:\d{2}$/.test(date)) {
        // 10:10:10 -> 20xx-01-01 10:10:10
        date = `${today} ${date}`
        if (!format) {
          format = 'yyyy-MM-dd HH:mm:ss'
        }
      } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(date)) {
        // 2018-10-10 10:10 -> 2018-10-10 10:10:00
        date = `${date}:00`
        if (!format) {
          format = 'yyyy-MM-dd HH:mm:ss'
        }
      } else if (!format) {
        format = 'yyyy-MM-dd'
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
  format(date, format, inputFormat) {
    if (!date) {
      return ''
    }
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
  equals(date1, date2, format) {
    if (!date1 && !date2) {
      return true
    }
    if (!date1 || !date2) {
      return false
    }
    return this.format(date1, format) === this.format(date2, format)
  },
  pad(val, len, fill) {
    val = String(val)
    len = len || 2
    fill = fill || '0'
    while (val.length < len) {
      val = fill + val
    }
    return val
  },
  /**
   *
   * @param {HTMLElement} element
   * @param {HTMLElement} test
   */
  isParent(element, test) {
    if (!element || !test) {
      return false
    }
    if (element === test) {
      return true
    }
    if (element === document.body) {
      return false
    }
    const parentElement = element.parentElement
    if (parentElement === test) {
      return true
    }
    if (parentElement === document.body) {
      return false
    }
    return this.isParent(parentElement, test)
  }
}

export default util
