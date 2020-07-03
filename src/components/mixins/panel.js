import types from '../../assets/script/types'
import {MAX_YEAR, MIN_YEAR} from '../../assets/script/option'
import util from '../../assets/script/util'

export default {
  inject: {
    picker: 'datePicker'
  },
  data() {
    return {
      types,
      MIN_YEAR,
      MAX_YEAR
    }
  },
  computed: {
    viewValue: {
      get() {
        return this.picker.viewValue
      },
      set(value) {
        this.picker.setViewValue(value)
      }
    },
    active() {
      return this.picker.dateValue
    },
    type() {
      return this.picker.type
    },
    minYear() {
      return this.picker.minValue ? this.picker.minValue.getFullYear() : -1
    },
    maxYear() {
      return this.picker.maxValue ? this.picker.maxValue.getFullYear() : -1
    },
    minMonth() {
      return this.picker.minValue ? this.picker.minValue.getMonth() : -1
    },
    maxMonth() {
      return this.picker.maxValue ? this.picker.maxValue.getMonth() : -1
    },
    minDate() {
      return this.picker.minValue ? this.picker.minValue.getDate() : -1
    },
    maxDate() {
      return this.picker.maxValue ? this.picker.maxValue.getDate() : -1
    },
    highlightRange() {
      return this.picker.highlightValueRange
    }
  },
  methods: {
    isDisabled(year, month, date) {
      // TODO 何时限制临界值？ 是否包含在内
      if ((this.minYear !== -1 && this.minYear > year) || (this.maxYear !== -1 && this.maxYear < year)) {
        return true
      }
      if (month !== undefined) {
        if ((this.minYear === year && this.minMonth !== -1 && this.minMonth > month) ||
          (this.maxYear === year && this.maxMonth !== -1 && this.maxMonth < month)) {
          return true
        }
      }
      if (date !== undefined) {
        if ((this.minYear === year && this.minMonth === month && this.minDate !== -1 && this.minDate > date) ||
          (this.minYear === year && this.maxMonth === month && this.maxDate !== -1 && this.maxDate < date)) {
          return true
        }
      }
      return false
    },
    isHighlight(year, month, date) {
      if (!this.highlightRange) {
        return false
      }

      const from = this.highlightRange[0]
      const to = this.highlightRange[1]
      if (from.year > year || to.year < year) {
        return false
      }
      if (month !== undefined) {
        if ((from.year === year && from.month > month) || (to.year === year && to.month < month)) {
          return false
        }
      }
      if (date !== undefined) {
        if ((from.year === year && from.month === month && from.date > date) ||
          (to.year === year && to.month === month && to.date < date)) {
          return false
        }
      }
      return true
    },
    getPrevYearByViewDate() {
      const temp = this.viewValue.getFullYear() - 1
      return util.setDate(this.viewValue, {year: temp < this.MIN_YEAR ? this.MIN_YEAR : temp})
    },
    getNextYearByViewDate() {
      const temp = this.viewValue.getFullYear() + 1
      return util.setDate(this.viewValue, {year: temp > this.MAX_YEAR ? this.MAX_YEAR : temp})
    }
  }
}
