import DatePicker from './pickers/date-picker'

import '../assets/icons/iconfont.css'
import '../assets/style/style.less'
import util from '../assets/script/util'

DatePicker.$util = {
  format: util.format.bind(util),
  parse: util.parse.bind(util),
  getWeekRange: util.getWeekRange.bind(util),
  getMonthRange: util.getMonthRange.bind(util),
  getSeasonRange: util.getSeasonRange.bind(util),
  getWeekOfYear: util.getWeekOfYear.bind(util)
}

export default DatePicker
