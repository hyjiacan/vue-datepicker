import DatePicker from './pickers/date-picker'
import Picker from "@/components/pickers/Picker";

import '../assets/icons/iconfont.css'
import '../assets/style/style.less'
import util from '../assets/script/util'
import fixedDate from "@/assets/script/fixedDate";

const DateUtil = DatePicker.$util = {
  format: util.format.bind(util),
  parse: util.parse.bind(util),
  getWeekRange: util.getWeekRange.bind(util),
  getMonthRange: util.getMonthRange.bind(util),
  getQuarterRange: util.getQuarterRange.bind(util),
  getWeekOfYear: util.getWeekOfYear.bind(util),
  getWeekOfMonth: util.getWeekOfMonth.bind(util),
  getDateRange: util.getDateRange.bind(util),
  offsetDate: util.offsetDate.bind(util),
  getDate: fixedDate.getDate.bind(fixedDate),
  setDate: fixedDate.setDate.bind(fixedDate)
}

export default DatePicker

export {
  DateUtil,
  Picker
}
