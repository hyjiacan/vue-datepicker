import types from '../../assets/script/types'

export default {
  inject: {
    picker: 'datePicker'
  },
  data () {
    return {
      types
    }
  },
  computed: {
    viewValue: {
      get () {
        return this.picker.viewValue
      },
      set (value) {
        this.picker.setViewValue(value)
      }
    },
    active () {
      return this.picker.dateValue
    },
    type () {
      return this.picker.type
    },
    minYear () {
      return this.picker.minValue ? this.picker.minValue.getFullYear() : -1
    },
    maxYear () {
      return this.picker.maxValue ? this.picker.maxValue.getFullYear() : -1
    },
    minMonth () {
      return this.picker.minValue ? this.picker.minValue.getMonth() : -1
    },
    maxMonth () {
      return this.picker.maxValue ? this.picker.maxValue.getMonth() : -1
    },
    minDate () {
      return this.picker.minValue ? this.picker.minValue.getDate() : -1
    },
    maxDate () {
      return this.picker.maxValue ? this.picker.maxValue.getDate() : -1
    }
  },
  methods: {
    isDisabled (year, month, date) {
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
    }
  }
}
