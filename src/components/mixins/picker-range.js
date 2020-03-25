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
      if (!v) {
        this.commitChanges()
        return
      }
      v = util.parse(v, this.finalFormat)
      let temp
      let commit = false
      switch (this.type) {
        case this.types.WEEK:
          temp = util.getWeekRange(v, {start: this.weekStart})
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
      if (commit) {
        this.commitChanges()
      }
    },
    endValue (v) {
      if (!v) {
        this.commitChanges()
        return
      }
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
    }
  },
  methods: {
    updateRangeValue (value) {
      if (!value[0]) {
        this.beginValue = ''
        this.endValue = value[1] ? util.format(value[1], this.finalFormat) : value[1]
        return
      }
      let beginValue = util.parse(value[0], this.finalFormat)

      let endValue

      switch (this.type) {
        case this.types.WEEK:
          [beginValue, endValue] = util.getWeekRange(beginValue, {start: this.weekStart})
          break
        case this.types.SEASON:
          [beginValue, endValue] = util.getSeasonRange(beginValue)
          break
        default:
          beginValue = value[0]
          endValue = value[1]
          break
      }

      this.beginValue = util.format(beginValue, this.finalFormat)
      this.endValue = endValue ? util.format(endValue, this.finalFormat) : endValue
    },
    clearRangeValue () {
      this.beginValue = ''
      this.endValue = ''
    },
    clearBeginValue () {
      this.beginValue = ''
    },
    clearEndValue () {
      this.endValue = ''
    }
  },
  computed: {
    isRange () {
      return this.range || [this.types.SEASON, this.types.WEEK].indexOf(this.type) !== -1
    },
    formattedRangeValue () {
      return [
        this.beginValue ? util.format(this.beginValue, this.finalFormat) : this.beginValue,
        this.endValue ? util.format(this.endValue, this.finalFormat) : this.endValue
      ]
    },
    formattedBeginValue () {
      // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
      return this.formattedRangeValue[0]
    },
    formattedEndValue () {
      // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
      return this.formattedRangeValue[1]
    },
    rangeBeginLimit () {
      // 设置为0表示不限制
      const v = this.endValue ? util.parse(this.endValue, this.finalFormat).getTime() : 0
      return [
        this.minValue,
        !this.maxValue || v < this.maxValue ? v : this.maxValue
      ]
    },
    rangeEndLimit () {
      const v = this.beginValue ? util.parse(this.beginValue, this.finalFormat).getTime() : 0
      return [
        !this.minValue || v > this.minValue ? v : this.minValue,
        this.maxValue
      ]
    }
  }
}
