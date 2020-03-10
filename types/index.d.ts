export const $util: {
    /**
     * 将任意格式的日期格式化成指定的格式
     * @param {Date|String|Number} date
     * @param {String} format 输出格式
     * @param {String} [inputFormat] 当 date 是字符串时，通过此参数指定格式，不指定时使用 format 的值
     * @return {string}
     */
    format(date, format, inputFormat?: string): string;

    /**
     * 将任意类型的日期格式转换成 Date 类型
     * @param {Date|String|Number} date
     * @param {String} [format] 当 date 是字符串时，通过此参数指定格式
     * @return {Date}
     */
    parse(date, format): Date;

    /**
     * 根据一个日期，谋算出其所在周的起止日期
     * @param {Date|String|Number} date
     * @param {number} [weekStart=0]
     * @return {Array<Date>}
     */
    getWeekRange(date, weekStart?: number): Date[];

    /**
     * 偏移周范围
     * @param {Date[]} weekRange 周范围，这是一个包含两个元素的数组
     * @param {number} offset 周偏移量，可以是任意整数
     * @return {Date[]}
     */
    offsetWeekRange(weekRange: Date[], offset): Date[];
};
