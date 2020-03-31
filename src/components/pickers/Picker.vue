<template>
  <div class="date-picker--box">
    <time-panel @pick-date="onPickDate" @pick="onTimePicked" v-show="showTimePanel" v-if="renderTimePanel"/>
    <date-panel @pick-year="onPickYear" @pick-month="onPickMonth" @pick="onDatePicked" v-show="showDatePanel"
                v-if="renderDatePanel">
      <template v-slot:append>
        <time-panel @pick-date="onPickDate" @pick="onTimePicked" v-show="renderDateTimePanel"/>
      </template>
    </date-panel>
    <month-panel @pick-year="onPickYear" @pick="onMonthPicked" v-show="showMonthPanel"
                 v-if="renderDatePanel || renderMonthPanel"/>
    <year-panel v-show="currentType === types.YEAR" @pick="onYearPicked"/>
  </div>
</template>

<script>
import YearPanel from '../panels/YearPanel'
import MonthPanel from '../panels/MonthPanel'
import DatePanel from '../panels/DatePanel'
import util from '../../assets/script/util'
import types from '../../assets/script/types'
import TimePanel from '../panels/TimePanel'

export default {
  name: 'Picker',
  components: {TimePanel, YearPanel, MonthPanel, DatePanel},
  props: {
    value: {
      type: [Number, String, Date],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true
    },
    /**
     * 限制的最小值，其值应该是一个数值类型的时间戳
     * 当设置值为0时表示无限制
     */
    min: {
      type: Number,
      required: true
    },
    /**
     * 限制的最小值，其值应该是一个数值类型的时间戳
     * 当设置值为0时表示无限制
     */
    max: {
      type: Number,
      required: true
    },
    /**
     * 标记组件是否可见
     */
    visible: {
      type: Boolean,
      required: true
    },
    /**
     * 是否允许鼠标滚轮操作
     */
    mousewheel: {
      type: Boolean,
      default: true
    },
    weekStart: {
      type: Number,
      default: 0
    }
  },
  provide () {
    return {
      datePicker: this
    }
  },
  data () {
    return {
      currentType: '',
      viewValue: new Date(),
      types
    }
  },
  mounted () {
    this.setCurrentType()
    this.setViewValue(this.dateValue)
  },
  watch: {
    dateValue (v) {
      this.setViewValue(v)
    },
    visible (v) {
      if (v) {
        return
      }
      this.$nextTick(() => {
        // 重置
        this.setCurrentType()
        this.setViewValue(this.dateValue)
      })
    },
    type () {
      this.setCurrentType()
    }
  },
  methods: {
    setCurrentType () {
      this.currentType = this.type === this.types.DATETIME ? this.types.DATE : this.type
    },
    setViewValue (v) {
      this.viewValue = util.setDate(v)
    },
    onTimePicked ({year, month, date, hour, minute, second}) {
      this.changeValue(new Date(year, month, date, hour, minute, second))
    },
    onDatePicked (e) {
      const value = util.setDate(this.viewValue, e)
      this.changeValue(value)
      // if (this.type === this.types.DATE) {
      //   return
      // }
      // this.setViewValue(value)
      // 选择时间
      // this.currentType = this.types.TIME
    },
    onMonthPicked (e) {
      const value = util.setDate(this.viewValue, e)
      if (this.type === this.types.MONTH || this.type === this.types.SEASON) {
        this.changeValue(value)
        return
      }
      this.setViewValue(value)
      // 显示日期选择
      this.currentType = this.type
    },
    onYearPicked (e) {
      const value = util.setDate(this.viewValue, e)
      if (this.type === this.types.YEAR) {
        this.changeValue(value)
        return
      }
      this.setViewValue(value)
      // 显示月份选择
      this.currentType = this.types.MONTH
    },
    changeValue (value) {
      this.isVisible = false
      const oldValue = this.value ? util.format(this.value, this.format) : this.value
      const newValue = util.format(value, this.format)

      this.$emit('input', newValue)
      this.$emit('change', {
        type: this.type,
        value: newValue
      }, oldValue)
    },
    onPickYear () {
      this.currentType = this.types.YEAR
    },
    onPickMonth () {
      this.currentType = this.types.MONTH
    },
    onPickDate () {
      this.currentType = this.types.DATE
    }
  },
  computed: {
    /**
     * 将传入的日期处理成 Date 对象
     */
    dateValue () {
      // 为空时使用当前日期
      return this.value ? util.parse(this.value, this.format) : new Date()
    },
    renderTimePanel () {
      return this.type === this.types.TIME
    },
    renderDateTimePanel () {
      return this.type === this.types.DATETIME
    },
    renderDatePanel () {
      return this.type === this.types.DATE || this.type === this.types.DATETIME || this.type === this.types.WEEK
    },
    renderMonthPanel () {
      return this.type === this.types.MONTH || this.type === this.types.SEASON
    },
    showTimePanel () {
      return this.currentType === this.types.TIME
    },
    showDatePanel () {
      return this.currentType === this.types.DATE || this.currentType === this.types.DATETIME || this.currentType === this.types.WEEK
    },
    showMonthPanel () {
      return this.currentType === this.types.MONTH || this.currentType === this.types.SEASON
    },
    minValue () {
      return this.min ? new Date(this.min) : null
    },
    maxValue () {
      return this.max ? new Date(this.max) : null
    }
  },
  beforeDestroy () {
    this.setCurrentType()
    this.setViewValue(this.dateValue)
  }
}
</script>

<style scoped>

</style>
