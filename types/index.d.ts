import Vue from "vue";

/**
 * 周范围选项
 */
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

/**
 * 月范围选项
 */
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

/**
 * 季度范围选项
 */
export interface QuarterRangeOption {
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

export interface WeekOfOption {
  /**
   * 周的偏移值
   */
  start: Number;
}

/**
 * 日期范围选项
 */
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

/**
 * 日期偏移选项
 */
export interface DateOffset {
  /**
   * 年偏移量
   */
  year: number;
  /**
   * 月偏移量
   */
  month: number;
  /**
   * 天偏移量
   */
  date: number;
}

/**
 * 日历展示组件
 */
export class Picker extends Vue {

}

/**
 * 工具函数
 */
export interface Util {
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
   * @param {QuarterRangeOption} [option]
   * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getQuarterRange(date: Date, option?: QuarterRangeOption): Date[] | String[];

  /**
   * 获取传入日期处于一年中的第多少周
   * @param {Date|Date[]} date
   * @param {WeekOfOption} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, week: Number}}
   */
  getWeekOfYear(date: Date | Date[], option?: WeekOfOption): { year: Number, week: Number };

  /**
   * 获取传入日期处于一月中的第多少周
   * @param {Date|Date[]} date
   * @param {WeekOfOption} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, month: Number, week: Number}}
   */
  getWeekOfMonth(date: Date | Date[], option?: WeekOfOption): { year: Number, month: Number, week: Number };

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

  /**
   * 获取被修正过的日期对象
   * 其修正依赖 setDate 接口
   * @see setDate
   * @return {Date} 被修正过的日期对象
   */
  getDate(): Date;

  /**
   * 设置当前日期（用于修正当前的错误日期，比如使用服务器时间的情况）
   * @param timestamp 当前的时间戳，其什可以是 秒 或者 毫秒，传入 0 表示使用系统时间
   * @return {Date} 新的日期对象
   */
  setDate(timestamp: Number): Date;
}

declare class DatePicker extends Vue {
  /**
   * @deprecated 请使用 util 代替
   */
  static $util: Util;
  static util: Util;
  static Picker: Picker;

  static install(Vue): void;
}

export default DatePicker
