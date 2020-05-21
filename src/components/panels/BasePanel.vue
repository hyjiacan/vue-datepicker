<template>
  <div class="date-picker--panel" :class="extraClass || ''">
    <div class="date-picker--panel-title">
      <slot name="panelTitle"/>
    </div>
    <div class="date-picker--panel-header">
      <div class="date-picker--panel-header-prev datepicker-iconfont datepicker--icon-left-d"
           @click="$emit('prev')"></div>
      <div class="date-picker--panel-header-content">
        <slot name="header"/>
      </div>
      <div class="date-picker--panel-header-next datepicker-iconfont datepicker--icon-right-d"
           @click="$emit('next')"></div>
    </div>
    <div class="date-picker--panel-body">
      <table @wheel="onWheel">
        <thead>
        <slot name="title"/>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in view" :key="rowIndex" class="date-picker--row" :title="getRowTip(row)"
            :class="getRowClass(row, rowIndex)" @click="onRowClick(row, rowIndex)">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" :title="cell.tip" @click="onCellClick(cell)">
            <span class="date-picker--panel-value" :class="getCellClass(cell)">{{cell.text || cell.value}}</span>
          </td>
        </tr>
        </tbody>
      </table>
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
    }
  }
}
</script>
