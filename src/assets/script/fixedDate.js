/**
 * 修正日期支持类，用于修正客户端与服务器时间不一致的问题
 */
class FixedDate {
  constructor() {
    const now = new Date()
    this.timestamp = now.getTime()
    this.updateTime = now
  }

  /**
   * 指定当前时间戳
   * @param {Number} timestamp 单位为秒或毫秒，传入 0 表示使用系统时间
   * @return {Date} 新的日期对象
   */
  setDate(timestamp) {
    if (this.timestamp === 0) {
      this.timestamp = new Date().getTime()
    }
    if (!timestamp) {
      throw new Error(`Invalid timestamp of date: ${timestamp}`)
    }
    if (timestamp.toString().length < 13) {
      this.timestamp = timestamp * 1000
    } else {
      this.timestamp = timestamp
    }
    this.updateTime = new Date()
    return this.getDate()
  }

  /**
   * 获取当前的时间
   * @returns {Date}
   */
  getDate() {
    const now = new Date()
    // 将设置的时间戳
    // 与差值 （当前时间与时间戳更新时间的差值）相加
    // 加上后得到新的时间戳，那么就是修正的当前时间
    const fixedTimestamp = this.timestamp + (now.getTime() - this.updateTime.getTime())
    return new Date(fixedTimestamp)
  }
}

const fixedDate = new FixedDate()

/*
 Example:
 // 设置时间，以作为当前的时间
 fixedDate.setDate(1635479224587)
 // 获取时间，返回值为被修正后的时间
*/

export default fixedDate
