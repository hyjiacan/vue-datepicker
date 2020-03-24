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
   * @param {Object} [option]
   * @param {number} [option.start=0] 周起始量，0-6分别表示星期天到星期六
   * @param {number} [option.offset=0] 周偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getWeekRange(date: Date, option?: WeekRangeOption): Date[];

  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {Object} [option]
   * @param {number} [option.offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getMonthRange(date: Date, option?: MonthRangeOption): Date[];

  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {Object} [option]
   * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getSeasonRange(date: Date, option?: SeasonRangeOption): Date[];
}
