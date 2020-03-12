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
   * @param {number} [weekStart=0]
   * @param {number} [offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Array<Date>}
   */
  getWeekRange(date: Date, weekStart?: number, offset?: number, appendTime?: boolean): Date[];

  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {number} [offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Array<Date>}
   */
  getMonthRange(date: Date, offset?: number, appendTime?: boolean): Date[];

  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {number} [offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [appendTime=false] 是否附带时间串
   * @return {Date[]}
   */
  getSeasonRange(date: Date, offset?: number, appendTime?: boolean): Date[];
}
