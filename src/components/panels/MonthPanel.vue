<template>
  <base-panel :extra-class="classes" :view="data" @prev="onPrevYear" @next="onNextYear"
              :row-class-handler="getRowClass" @pick-cell="onPickCell" @pick-row="onPickRow">
    <template v-slot:header>
      <span class="date-picker--panel-header-year" @click="$emit('pick-year')">{{viewValue.getFullYear()}}年</span>
    </template>
  </base-panel>
</template>

<script>
import BasePanel from './BasePanel'
import mixin from '../mixins/panel'
import util from '../../assets/script/util'

export default {
  name: 'MonthPanel',
  components: {BasePanel},
  mixins: [mixin],
  computed: {
    data () {
      const data = []
      const year = this.viewValue.getFullYear()
      const activeYear = this.active.getFullYear()
      const activeMonth = this.active.getMonth() + 1
      let month = 1
      for (let i = 0; i < 4; i++) {
        const row = []
        for (let j = 0; j < 3; j++) {
          const item = {
            year,
            value: month,
            text: `${month}月`,
            tip: `${year}年${month}月`,
            disabled: this.isDisabled(year, month - 1)
          }
          if (this.type === this.types.SEASON) {
            item.rowActive = year === activeYear && month === activeMonth
          } else {
            item.active = year === activeYear && month === activeMonth
          }
          row.push(item)
          month++
        }
        data.push(row)
      }
      return data
    },
    classes () {
      return {
        'date-picker--month': true,
        'date-picker--season': this.isSeason
      }
    },
    isSeason () {
      return this.type === this.types.SEASON
    }
  },
  methods: {
    onPrevYear () {
      this.viewValue = util.setDate(this.viewValue, {year: this.viewValue.getFullYear() - 1})
    },
    onNextYear () {
      this.viewValue = util.setDate(this.viewValue, {year: this.viewValue.getFullYear() + 1})
    },
    onPickCell ({year, value}) {
      if (this.isSeason) {
        return ''
      }
      this.$emit('pick', {year, month: value - 1})
    },
    onPickRow ({row}) {
      if (this.type !== this.types.SEASON) {
        return ''
      }
      const {year, value} = row[0]
      this.$emit('pick', {year, month: value - 1})
    },
    getRowClass ({row}) {
      if (this.type !== this.types.SEASON) {
        return ''
      }
      return {
        'date-picker--row-active': !row.every(cell => !cell.rowActive),
        'date-picker--row-disabled': !row.every(cell => !cell.disabled)
      }
    }
  }
}
</script>
