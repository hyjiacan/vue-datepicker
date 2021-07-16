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
      return this.picker.viewValue
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
    },
    showLunar() {
      return this.picker.showLunar
    }
  },
  methods: {
    isYearDisabled(year) {
      const {minYear, maxYear} = this
      if (minYear === -1 && maxYear === -1) {
        return false
      }
      if (minYear !== -1 && maxYear !== -1) {
        return minYear > year || maxYear < year
      }
      if (minYear !== -1) {
        return minYear > year
      }
      if (maxYear !== -1) {
        return maxYear < year
      }
      return false
    },
    isMonthDisabled(year, month) {
      const {minYear, maxYear, minMonth, maxMonth} = this
      if (minMonth === -1 && maxMonth === -1) {
        return false
      }
      if (minMonth !== -1 && maxMonth !== -1) {
        return (minYear === year && minMonth !== -1 && minMonth > month) &&
          (maxYear === year && maxMonth !== -1 && maxMonth < month)
      }
      if (minMonth !== -1) {
        return minYear === year && minMonth > month
      }
      if (maxMonth !== -1) {
        return maxYear === year && maxMonth < month
      }
      return false
    },
    isDateDisabled(year, month, date) {
      const {minYear, maxYear, minMonth, maxMonth, minDate, maxDate} = this
      if (minDate === -1 && maxDate === -1) {
        return false
      }
      if (minDate !== -1 && maxDate !== -1) {
        return (minYear === year && minMonth === month && minDate !== -1 && minDate > date) &&
          (minYear === year && maxMonth === month && maxDate !== -1 && maxDate < date)
      }
      if (minDate !== -1) {
        return minYear === year && minMonth === month && minDate > date
      }
      if (maxDate !== -1) {
        return maxYear === year && maxMonth === month && maxDate < date
      }
      return false
    },
    isDisabled(year, month, date) {
      // TODO 何时限制临界值？ 是否包含在内
      if (this.isYearDisabled(year)) {
        return true
      }
      if (month !== undefined) {
        if (this.isMonthDisabled(year, month)) {
          return true
        }
      }
      if (date !== undefined) {
        if (this.isDateDisabled(year, month, date)) {
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
