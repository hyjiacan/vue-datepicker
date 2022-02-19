<template>
  <div class="date-picker--panel" :class="extraClass || ''">
    <div class="date-picker--panel-title">
      <slot name="panelTitle"/>
    </div>
    <div class="date-picker--panel-header">
      <div class="date-picker--panel-header-prev">
        <span class="datepicker-iconfont datepicker--icon-left-d"
              @click="$emit('prev')"></span>
      </div>
      <div class="date-picker--panel-header-content">
        <slot name="header"/>
      </div>
      <div class="date-picker--panel-header-next">
        <span class="datepicker-iconfont datepicker--icon-right-d"
              @click="$emit('next')"></span>
      </div>
    </div>
    <div class="date-picker--panel-body">
      <div class="date-picker--table" @wheel="onWheel">
        <div class="date-picker--table-header">
          <slot name="title"/>
        </div>
        <div class="date-picker--table-body">
          <div v-for="(row, rowIndex) in view" :key="rowIndex" class="date-picker--table-row" :title="getRowTip(row)"
               :class="getRowClass(row, rowIndex)" @click="onRowClick(row, rowIndex)">
            <div class="date-picker--table-cell" v-for="(cell, cellIndex) in row" :key="cellIndex"
                 @click="onCellClick(cell)"
                 :title="getCellTitle(cell)" :class="{'date-picker--panel-value-highlight': cell.highlight}">
              <span class="date-picker--panel-value" :class="getCellClass(cell)" v-html="renderCell(cell)"></span>
            </div>
          </div>
        </div>
      </div>
      <slot name="append"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BasePanel',
  props: {
    view: {
      type: Array,
      required: true
    },
    extraClass: [String, Object, Array],
    rowClassHandler: Function
  },
  inject: {
    picker: 'datePicker'
  },
  methods: {
    getCellClass(cell) {
      return {
        'date-picker--panel-value-active': cell.active,
        'date-picker--panel-value-current': cell.current,
        'date-picker--panel-value-overflow': cell.overflow,
        'date-picker--panel-value-disabled': cell.disabled
      }
    },
    onRowClick(row, index) {
      if (!row.every(cell => !cell.disabled)) {
        return
      }
      this.$emit('pick-row', {row, index})
    },
    onCellClick(cell) {
      if (cell.disabled) {
        return
      }
      this.$emit('pick-cell', cell)
    },
    onWheel(e) {
      if (!this.picker.mousewheel) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const deltaY = e.deltaY

      if (deltaY < 0) {
        // 向上
        this.$emit('prev', {wheel: true})
      } else if (deltaY > 0) {
        // 向下
        this.$emit('next', {wheel: true})
      }
    },
    getRowClass(row, index) {
      if (!this.rowClassHandler) {
        return ''
      }
      return this.rowClassHandler({row, index})
    },
    getRowTip(row) {
      return row[0].rowTip || ''
    },
    getCellTitle(cell) {
      let title = cell.tip
      const lunar = cell.lunar

      if (this.picker.showFestival && lunar.solarFestival) {
        title += ' ' + lunar.solarFestival
      }

      if (!this.picker.showLunar) {
        return title
      }

      let lunarTitle

      switch (cell.type) {
        case 'year':
          lunarTitle = ` ${lunar.lunarYear}(${lunar.GanZhiYear})年`
          break
        case 'month':
          lunarTitle = ` ${lunar.lunarYear}(${lunar.GanZhiYear})年${lunar.lunarMonthName}`
          break
        case 'date':
          // 对日的提示信息进行换行
          title += '\n'
          lunarTitle = `${lunar.lunarYear}(${lunar.GanZhiYear})年${lunar.lunarMonthName}${lunar.lunarDayName}`
          if (this.picker.showFestival && lunar.lunarFestival) {
            lunarTitle += ' ' + lunar.lunarFestival
          }
          break
      }

      if (lunarTitle) {
        title += '农历' + lunarTitle
      }

      return title
    },
    renderCell(cell) {

      const lunar = cell.lunar

      let cls = 'date-picker--panel-value--solar'
      if (this.picker.showFestival && cell.type === 'date') {
        // 是否存在公历节日
        if (lunar.solarFestival) {
          cls += ' is-festival'
        }
      }
      const result = [
        `<span class="${cls}">${cell.text}</span>`
      ]

      if (this.picker.showLunar) {
        let content
        let isFestival = false
        switch (cell.type) {
          case 'year':
            content = lunar.GanZhiYear
            break
          case 'month':
            content = lunar.lunarMonthName
            break
          case 'date':
            isFestival = this.picker.showFestival && !!lunar.lunarFestival
            if (isFestival) {
              content = lunar.lunarFestival
            } else {
              content = lunar.lunarDay === 1 ? lunar.lunarMonthName : lunar.lunarDayName
            }
            break
        }
        result.push(`<span class="date-picker--panel-value--lunar${isFestival ? ' is-festival' : ''}">${content}</span>`)
      }

      if (this.picker.markFunction) {
        const markResult = this.picker.markFunction(cell)
        if (typeof markResult === 'string') {
          result.push(`<span class="date-picker--panel-value--marker">${markResult}</span>`)
        }
      }

      return result.join('')
    }
  }
}
</script>
