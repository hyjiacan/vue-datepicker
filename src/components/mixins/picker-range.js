import util from '../../assets/script/util'
import formats from '../../assets/script/formats'

export default {
  props: {
    /**
     * 用于设置一周的第一天量。0：星期天，1：星期一
     */
    weekStart: {
      type: Number,
      default: 0
    },
    // 是否将起止日期输入框分开显示
    split: Boolean,
    range: Boolean
  },
  data () {
    return {
      beginValue: util.format(new Date(), formats.date),
      endValue: util.format(new Date(), formats.date),
      beginVisible: false,
      endVisible: false
    }
  },
  watch: {
    beginValue (v) {
      v = util.parse(v, this.finalFormat)
      let temp
      let commit = false
      switch (this.type) {
        case this.types.WEEK:
          temp = util.getWeekRange(v, this.weekStart)
          if (util.format(temp[1], this.finalFormat) !== this.endValue) {
            this.endValue = util.format(temp[1], this.finalFormat)
          }
          commit = true
          break
        case this.types.SEASON:
          temp = util.getSeasonRange(v)
          if (util.format(temp[1], this.finalFormat) !== this.endValue) {
            this.endValue = util.format(temp[1], this.finalFormat)
          }
          commit = true
          break
        case this.types.MONTH:
          if (v.getDate() !== 1) {
            this.beginValue = util.setDate(v, {date: 1})
          }
          break
      }
      if (this.split || commit) {
        this.commitChanges()
      }
    },
    endValue (v) {
      v = util.parse(v, this.finalFormat)
      switch (this.type) {
        // case this.types.SEASON:
        case this.types.MONTH:
          // eslint-disable-next-line no-case-declarations
          const temp = util.setDate(v, {date: 0, month: v.getMonth() + 1})
          if (v.getDate() !== temp.getDate()) {
            this.endValue = temp
          }
          break
      }
      if (this.split) {
        this.commitChanges()
      }
    }
  },
  methods: {
    updateRangeValue (value) {
      let beginValue = util.parse(value[0], this.finalFormat)

      let endValue

      switch (this.type) {
        case this.types.WEEK:
          [beginValue, endValue] = util.getWeekRange(beginValue, this.weekStart)
          break
        case this.types.SEASON:
          [beginValue, endValue] = util.getSeasonRange(beginValue)
          break
        default:
          beginValue = this.value[0]
          endValue = this.value[1]
          break
      }

      this.beginValue = util.format(beginValue, this.finalFormat)
      this.endValue = util.format(endValue, this.finalFormat)
    },
    clearRangeValue () {
    },
    clearBeginValue () {
    },
    clearEndValue () {
    }
  },
  computed: {
    isRange () {
      return this.range || [this.types.SEASON, this.types.WEEK].indexOf(this.type) !== -1
    },
    formattedRangeValue () {
      return [util.format(this.beginValue, this.finalFormat), util.format(this.endValue, this.finalFormat)]
    },
    formattedBeginValue () {
      return this.formattedRangeValue[0]
    },
    formattedEndValue () {
      return this.formattedRangeValue[1]
    },
    rangeBeginLimit () {
      const v = util.parse(this.endValue, this.finalFormat).getTime()
      return [
        this.minValue,
        !this.maxValue || v < this.maxValue ? v : this.maxValue
      ]
    },
    rangeEndLimit () {
      const v = util.parse(this.beginValue, this.finalFormat).getTime()
      return [
        !this.minValue || v > this.minValue ? v : this.minValue,
        this.maxValue
      ]
    }
  }
}
