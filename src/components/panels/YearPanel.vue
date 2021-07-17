<template>
  <base-panel extra-class="date-picker--panel-year" :view="data"
              @prev="onPrevDecades" @next="onNextDecades" @pick-cell="onPick">
    <template v-slot:panelTitle>
      <slot name="title"/>
    </template>
    <template v-slot:header>
      <span>{{startYear}}年 - {{stopYear}}年</span>
    </template>
  </base-panel>
</template>

<script>
import calendarCN from '../../assets/script/calendarCN'
import BasePanel from './BasePanel'
import mixin from '../mixins/panel'
import util from '../../assets/script/util'

export default {
  name: 'YearPanel',
  components: {BasePanel},
  mixins: [mixin],
  data() {
    return {
      // 向前偏移10年
      offset: 10,
      startYear: 0
    }
  },
  mounted() {
    this.updateStartYear(this.viewValue)
  },
  watch: {
    viewValue(v) {
      this.updateStartYear(v)
    }
  },
  computed: {
    stopYear() {
      let len = this.data.length
      let temp = this.data[len - 1]
      return temp[temp.length - 1].year
    },
    data() {
      const data = []
      const date = {
        year: new Date().getFullYear()
      }
      const activeYear = this.active.getFullYear()
      let year = this.startYear
      // 当前的20年
      let years = this.offset * 2
      for (let i = 0; i < 5; i++) {
        const row = []
        for (let j = 0; j < 4; j++) {
          if (years === 0) {
            break
          }
          const isCurrent = year === date.year
          const item = {
            type: 'year',
            active: year === activeYear,
            current: isCurrent,
            tip: isCurrent ? '今年' : '',
            year: year,
            value: year,
            text: year,
            disabled: this.isDisabled(year),
            highlight: this.isHighlight(year)
          }
          if (this.showLunar) {
            // 设置6每年的7月，此时得到的甲子肯定是当年的，不会因为年首产生错误
            item.lunar = calendarCN.solarToLunar(year, 6)
          }
          row.push(item)

          year++
          years--
        }
        data.push(row)
      }
      return data
    }
  },
  methods: {
    updateStartYear(v) {
      const year = v.getFullYear()
      if (this.startYear <= year && year < this.stopYear) {
        return
      }
      const temp = parseInt(Math.floor(year / 10).toString() + '0') - this.offset
      if (temp < this.MIN_YEAR) {
        this.startYear = this.MIN_YEAR
      } else if (temp > this.MAX_YEAR) {
        this.startYear = this.MAX_YEAR - this.offset - 9
      } else {
        this.startYear = temp
      }
    },
    onPrevDecades() {
      this.viewValue = util.setDate(this.viewValue, {year: this.startYear - this.offset})
    },
    onNextDecades() {
      this.viewValue = util.setDate(this.viewValue, {year: this.stopYear + 1 + this.offset})
    },
    onPick({year}) {
      this.$emit('pick', {year})
    }
  }
}
</script>
