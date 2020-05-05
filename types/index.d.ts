export interface WeekRangeOption {
  /**
   * 周起始量，0-6分别表示星期天到星期六
   */
  start: Number;
  /**
   * 周偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface MonthRangeOption {
  /**
   * 月偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface SeasonRangeOption {
  /**
   * 季度偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface WeekOfYearOption {
  /**
   * 周的偏移值
   */
  start: Number;
  /**
   * 是否格式化
   */
  format: boolean;
  /**
   * 遇到跨年的情况时，周应该放置在前一年(prev)还是当年(留空)或者下一年(next)
   */
  boundary: string;
}

export interface DateRangeOption {
  /**
   * 是否格式化
   */
  format: boolean;
  /**
   * 是否附带时间串
   */
  time: Boolean;
}

export interface DateOffset {
  year: number;
  month: number;
  date: number;
}

export interface $util {
  /**
   * 将任意格式的日期格式化成指定的格式
   * @param {Date|String|Number} date
   * @param {String} format 输出格式
   * @param {String} [inputFormat] 当 date 是字符串时，通过此参数指定格式，不指定时使用 format 的值
   * @return {string}
   */
  format(date: [Date, String, Number], format: String, inputFormat?: string): string;

  /**
   * 将任意类型的日期格式转换成 Date 类型
   * @param {Date|String|Number} date
   * @param {String} [format] 当 date 是字符串时，通过此参数指定格式
   * @return {Date}
   */
  parse(date: [Date, String, Number], format?: string): Date;

  /**
   * 根据一个日期，谋算出其所在周的起止日期
   * @param {Date} date
   * @param {WeekRangeOption} [option]
   * @param {number} [option.start=0] 周起始量，0-6分别表示星期天到星期六
   * @param {number} [option.offset=0] 周偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getWeekRange(date: Date, option?: WeekRangeOption): Date[] | String[];

  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {MonthRangeOption} [option]
   * @param {number} [option.offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getMonthRange(date: Date, option?: MonthRangeOption): Date[] | String[];

  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {SeasonRangeOption} [option]
   * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getSeasonRange(date: Date, option?: SeasonRangeOption): Date[] | String[];

  /**
   * 获取传入日期处于一年中的第多少周
   * @param {Date} date
   * @param {WeekOfYearOption} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @param {boolean} [option.format=false] 是否格式化，设置为 true 时会格式化为 xxxx年 第xx周
   * @param {string} [option.boundary=null] 遇到跨年的情况时，周应该放置在前一年(prev)还是当年(留空)或者下一年(next)
   * @return {string|number}
   */
  getWeekOfYear(date: Date, option?: WeekOfYearOption): string | number;

  /**
   * 根据一个日期以及偏移参数获取日期范围
   * @param {Date} date
   * @param {DateOffset|string} [beginOffset] 开始日期的偏移量
   * @param {DateOffset|string} [endOffset] 结束日期的偏移量
   * @param {DateRangeOption} [option]
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @param {boolean} [option.time=false] 是否附带时间串
   * @return {Date[]|String[]}
   */
  getDateRange(date: Date, beginOffset?: DateOffset | string, endOffset?: DateOffset | string, option?: DateRangeOption): Date[] | string[];

  /**
   * 按指定规则对日期进行偏移
   * @param {Date} date
   * @param {DateOffset|string} offset 日期的偏移量
   * @return {Date} 偏移后的日期对象（新对象)
   */
  offsetDate(date: Date, offset: DateOffset | string): Date;
}
