<template>
  <base-panel :extra-class="classes" :view="data" @prev="onPrevYear" @next="onNextYear"
              :row-class-handler="getRowClass" @pick-cell="onPickCell" @pick-row="onPickRow">
    <template v-slot:panelTitle>
      <slot name="title"/>
    </template>
    <template v-slot:header>
      <span class="date-picker--panel-header-year" @click="$emit('pick-year')">{{viewValue.getFullYear()}}年</span>
    </template>
    <template #default="{data, row, col, html}">
      <slot :data="data" :row="row" :col="col" :html="html"></slot>
    </template>
  </base-panel>
</template>

<script>
import BasePanel from './BasePanel'
import mixin from '../mixins/panel'
import calendarCN from '@/assets/script/calendarCN'
import fixedDate from "@/assets/script/fixedDate";

export default {
  name: 'MonthPanel',
  components: {BasePanel},
  mixins: [mixin],
  computed: {
    data() {
      const data = []
      const d = fixedDate.getDate()
      const date = {
        year: d.getFullYear(),
        month: d.getMonth() + 1
      }
      const year = this.viewValue.getFullYear()
      const activeYear = this.active.getFullYear()
      const activeMonth = this.active.getMonth() + 1
      let month = 1
      for (let i = 0; i < 4; i++) {
        const row = []
        for (let j = 0; j < 3; j++) {
          const item = {
            type: 'month',
            year,
            month,
            text: `${month}月`,
            tip: `${year}年${month}月`,
            disabled: this.isDisabled(year, month - 1),
            highlight: this.isHighlight(year, month - 1)
          }
          if (this.type === this.types.QUARTER) {
            item.rowActive = year === activeYear && month === activeMonth
          } else {
            item.active = year === activeYear && month === activeMonth
          }

          item.current = item.year === date.year && item.month === date.month
          if (item.current) {
            item.tip = '本月'
          }

          // if (this.showLunar) {
          item.lunar = calendarCN.solarToLunar(item.year, item.month, 1)
          // }

          row.push(item)
          month++
        }
        data.push(row)
      }
      return data
    },
    classes() {
      return {
        'date-picker--panel-month': true,
        'date-picker--panel-quarter': this.isQuarter
      }
    },
    isQuarter() {
      return this.type === this.types.QUARTER
    }
  },
  methods: {
    onPrevYear() {
      this.viewValue = this.getPrevYearByViewDate()
    },
    onNextYear() {
      this.viewValue = this.getNextYearByViewDate()
    },
    onPickCell({year, month}) {
      if (this.isQuarter) {
        return ''
      }
      this.$emit('pick', {year, month: month - 1})
    },
    onPickRow({row}) {
      if (this.type !== this.types.QUARTER) {
        return ''
      }
      const {year, month} = row[0]
      this.$emit('pick', {year, month: month - 1})
    },
    getRowClass({row}) {
      if (this.type !== this.types.QUARTER) {
        return ''
      }
      return {
        'date-picker--table-row-active': !row.every(cell => !cell.rowActive),
        'date-picker--table-row-disabled': !row.every(cell => !cell.disabled)
      }
    }
  }
}
</script>
