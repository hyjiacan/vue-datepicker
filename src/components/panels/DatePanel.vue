<template>
  <base-panel :view="view" @prev="onPrevYear" @next="onNextYear" :extra-class="classes"
              :row-class-handler="getRowClass" @pick-cell="onPickCell" @pick-row="onPickRow">
    <template v-slot:header>
      <div class="date-picker-panel__header-container">
        <div @click="onPrevMonth" class="datepicker-iconfont datepicker--icon-left"></div>
        <div>
          <span class="date-picker-panel__header-year" @click="$emit('pick-year')">{{viewValue.getFullYear()}}年</span>
          <span class="date-picker-panel__header-month"
                @click="$emit('pick-month')">{{viewValue.getMonth() + 1}}月</span>
        </div>
        <div @click="onNextMonth" class="datepicker-iconfont datepicker--icon-right"></div>
      </div>
    </template>
    <template v-slot:title>
      <tr>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
      </tr>
    </template>
    <template v-slot:append>
      <slot name="append"/>
    </template>
  </base-panel>
</template>

<script>
import BasePanel from './BasePanel'
import mixin from '../mixins/panel'
import util from '../../assets/script/util'

export default {
  name: 'DatePanel',
  components: {BasePanel},
  mixins: [mixin],
  props: {
    week: Boolean
  },
  computed: {
    view () {
      const data = util.makeDateView(this.viewValue)
      const active = {
        year: this.active.getFullYear(),
        month: this.active.getMonth() + 1,
        date: this.active.getDate()
      }
      const view = []
      // 6行
      for (let i = 0; i < 6; i++) {
        const row = []
        // 7列
        for (let j = 0; j < 7; j++) {
          const item = data.shift()
          if (!item) {
            continue
          }
          if (this.isWeek) {
            item.rowActive = item.year === active.year && item.month === active.month && item.value === active.date
            // let result = util.getWeekOfYear(item.year, item.month - 1, item.value, true)
            // item.week = result[0]
            // item.rowTip = result[1]
          } else {
            item.active = item.year === active.year && item.month === active.month && item.value === active.date
            item.tip = `${item.year}年${item.month}月${item.value}日`
          }

          item.disabled = this.isDisabled(item.year, item.month - 1, item.value)
          row.push(item)
        }
        view.push(row)
      }
      return view
    },
    classes () {
      return {
        'date-picker-week': this.isWeek
      }
    },
    isWeek () {
      return this.type === this.types.WEEK
    }
  },
  methods: {
    /**
     * 判断激活日期是否在当前月
     */
    locateActiveDay (value) {
      if (value.getFullYear() === this.active.getFullYear() && value.getMonth() === this.active.getMonth()) {
        return util.setDate(this.active)
      }

      return value
    },
    onPrevMonth () {
      this.viewValue = this.locateActiveDay(util.setDate(this.viewValue, {month: this.viewValue.getMonth() - 1}))
    },
    onNextMonth () {
      this.viewValue = this.locateActiveDay(util.setDate(this.viewValue, {month: this.viewValue.getMonth() + 1}))
    },
    onPrevYear (e) {
      if (e && e.wheel) {
        this.onPrevMonth()
        return
      }
      this.viewValue = util.setDate(this.viewValue, {year: this.viewValue.getFullYear() - 1})
    },
    onNextYear (e) {
      if (e && e.wheel) {
        this.onNextMonth()
        return
      }
      this.viewValue = util.setDate(this.viewValue, {year: this.viewValue.getFullYear() + 1})
    },
    onPickCell ({year, month, value}) {
      if (this.isWeek) {
        return
      }
      this.$emit('pick', {
        year, month: month - 1, date: value
      })
    },
    onPickRow ({row}) {
      if (this.type !== this.types.WEEK) {
        return
      }
      const {year, month, value} = row[0]
      this.$emit('pick', {
        year, month: month - 1, date: value
      })
    },
    getRowClass ({row}) {
      if (this.type !== this.types.WEEK) {
        return ''
      }
      return {
        'date-picker__row-active': !row.every(cell => !cell.rowActive),
        'date-picker__row-disabled': !row.every(cell => !cell.disabled)
      }
    }
  }
}
</script>
