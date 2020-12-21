<template>
  <div class="date-picker--panel-time-wheel" @wheel="onWheel">
    <div class="date-picker--panel-time-wheel-prev-button datepicker-iconfont datepicker--icon-top"
         @mousedown="onButtonDown('prev')" @mouseup="onButtonUp('prev')"></div>
    <div class="date-picker--panel-time-wheel-prev">
      <span :class="getCellClass(getPrevValue(prevValue))">{{getPrevValue(prevValue)}}</span>
      <span :class="getCellClass(prevValue)" @click="goPrev">{{prevValue}}</span>
    </div>
    <div class="date-picker--panel-time-wheel-value">
      <span :class="getCellClass(viewValue)">{{viewValue}}</span>
    </div>
    <div class="date-picker--panel-time-wheel-next">
      <span :class="getCellClass(nextValue)" @click="goNext">{{nextValue}}</span>
      <span :class="getCellClass(getNextValue(nextValue))">{{getNextValue(nextValue)}}</span>
    </div>
    <div class="date-picker--panel-time-wheel-next-button datepicker-iconfont datepicker--icon-bottom"
         @mousedown="onButtonDown('prev')" @mouseup="onButtonUp('prev')"></div>
  </div>
</template>

<script>
export default {
  name: 'TimeWheel',
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      viewValue: 0,
      buttonDownHandle: -1
    }
  },
  inject: {
    picker: 'datePicker'
  },
  mounted () {
    this.viewValue = this.value
  },
  watch: {
    value (v) {
      this.viewValue = v
    }
  },
  computed: {
    prevValue () {
      return this.getPrevValue(this.viewValue)
    },
    nextValue () {
      return this.getNextValue(this.viewValue)
    },
    max () {
      return this.data.max
    }
  },
  methods: {
    isDisabled (val) {
      return !this.data[val]
    },
    getCellClass (val) {
      return {
        'date-picker--panel-value-disabled': this.isDisabled(val)
      }
    },
    getPrevValue (v) {
      let newValue = v - 1
      if (newValue < 0) {
        return this.max
      }

      return newValue
    },
    getNextValue (v) {
      let newValue = v + 1
      if (newValue > this.max) {
        return 0
      }

      return newValue
    },
    async onWheel (e) {
      if (!this.picker.mousewheel) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const deltaY = e.deltaY

      await this.$nextTick()

      if (deltaY < 0) {
        // 向上
        this.goPrev()
      } else if (deltaY > 0) {
        // 向下
        this.goNext()
      }
    },
    goPrev () {
      this.viewValue = this.prevValue
      if (this.isDisabled(this.viewValue)) {
        this.$emit('update:disabled', true)
        return
      }
      this.$emit('update:value', this.viewValue)
      this.$emit('update:disabled', false)
    },
    goNext () {
      this.viewValue = this.nextValue
      if (this.isDisabled(this.viewValue)) {
        this.$emit('update:disabled', true)
        return
      }
      this.$emit('update:value', this.viewValue)
      this.$emit('update:disabled', false)
    },
    onButtonDown (button) {
      clearInterval(this.buttonDownHandle)
      this.clickButton(button)
      this.buttonDownHandle = setInterval(() => {
        this.clickButton(button)
      }, 160)
    },
    onButtonUp () {
      clearInterval(this.buttonDownHandle)
    },
    clickButton (button) {
      this.$nextTick(() => {
        if (button === 'prev') {
          this.goPrev()
        } else if (button === 'next') {
          this.goNext()
        } else {
          clearInterval(this.buttonDownHandle)
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.buttonDownHandle)
  }
}
</script>

<style scoped>

</style>
