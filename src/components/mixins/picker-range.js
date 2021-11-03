import util from '../../assets/script/util'
import formats from '../../assets/script/formats'
import placeholders from '../../assets/script/placeholders'
import fixedDate from "@/assets/script/fixedDate";

export default {
  props: {
    /**
     * 用于设置一周的第一天量。0：星期天，1：星期一
     */
    weekStart: {
      type: Number,
      default: 0
    },
    range: Boolean,
    /**
     * 是否高亮选中日期范围背景
     */
    highlightRange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beginValue: util.format(fixedDate.getDate(), formats.date),
      endValue: util.format(fixedDate.getDate(), formats.date)
    }
  },
  watch: {
    beginValue(v) {
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
        case this.types.QUARTER:
          temp = util.getQuarterRange(v)
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

      this.$nextTick(() => {
        // 当结束值没有变化时，在此处执行提交
        if (commit || this.endValue === util.format(this.value[1], this.finalFormat)) {
          this.commitChanges()
        }
      })
    },
    endValue(v) {
      if (!v) {
        this.commitChanges()
        return
      }
      const value = util.parse(v, this.finalFormat)
      switch (this.type) {
        // case this.types.QUARTER:
        case this.types.MONTH:
          // eslint-disable-next-line no-case-declarations
          const temp = util.setDate(value, {date: 0, month: value.getMonth() + 1})
          if (value.getDate() !== temp.getDate()) {
            this.endValue = temp
          }
          break
      }

      if (v !== util.format(this.value[1], this.finalFormat)) {
        this.commitChanges()
      }
    }
  },
  methods: {
    updateRangeValue(value) {
      let beginValue = value[0] ? util.parse(value[0], this.finalFormat) : value[0]
      let endValue = value[1] ? util.parse(value[1], this.finalFormat) : value[1]

      if (!beginValue) {
        this.beginValue = ''
        this.endValue = endValue
        return
      }

      let temp

      switch (this.type) {
        case this.types.WEEK:
          [beginValue, endValue] = util.getWeekRange(beginValue, {start: this.weekStart})
          break
        case this.types.QUARTER:
          [beginValue, endValue] = util.getQuarterRange(beginValue)
          break
        case this.types.MONTH:
          temp = util.getMonthRange(beginValue)
          beginValue = temp[0]
          endValue = endValue ? util.getMonthRange(endValue)[1] : temp[1]
          break
        default:
          beginValue = value[0]
          endValue = value[1]
          break
      }

      this.beginValue = util.format(beginValue, this.finalFormat)
      this.endValue = endValue ? util.format(endValue, this.finalFormat) : endValue
    },
    clearRangeValue() {
      this.beginValue = ''
      this.endValue = ''
    },
    clearBeginValue() {
      this.beginValue = ''
    },
    clearEndValue() {
      this.endValue = ''
    }
  },
  computed: {
    isRange() {
      return this.range || [this.types.QUARTER, this.types.WEEK].indexOf(this.type) !== -1
    },
    formattedRangeValue() {
      return [
        this.beginValue ? util.format(this.beginValue, this.finalFormat) : this.beginValue,
        this.endValue ? util.format(this.endValue, this.finalFormat) : this.endValue
      ]
    },
    formattedBeginValue() {
      // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
      return this.formattedRangeValue[0]
    },
    formattedEndValue() {
      // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
      return this.formattedRangeValue[1]
    },
    rangeBeginLimit() {
      // 设置为0表示不限制
      const v = this.endValue ? util.parse(this.endValue, this.finalFormat).getTime() : 0
      return [
        this.minValue,
        !this.maxValue || v < this.maxValue ? v : this.maxValue
      ]
    },
    rangeEndLimit() {
      const v = this.beginValue ? util.parse(this.beginValue, this.finalFormat).getTime() : 0
      return [
        !this.minValue || v > this.minValue ? v : this.minValue,
        this.maxValue
      ]
    },
    placeholderBeginText() {
      if (this.placeholder) {
        return this.placeholder[0]
      }
      return placeholders[`${this.type}Range`][0]
    },
    placeholderEndText() {
      if (this.placeholder) {
        return this.placeholder[1]
      }
      return placeholders[`${this.type}Range`][1]
    },
    rangeBeginTitle() {
      return this.$slots.title ? this.$slots.title[0] : null
    },
    rangeEndTitle() {
      return this.$slots.title ? this.$slots.title[1] : null
    }
  }
}
