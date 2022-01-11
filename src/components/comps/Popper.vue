<template>
  <div class="date-picker--popper">
    <div class="date-picker--popper-reference" :class="valueClass" ref="reference">
      <slot name="reference"/>
    </div>
    <div class="date-picker--popper-dialog"
         @focus.stop="$emit('focus', $event)" @blur="$emit('blur', $event)"
         :class="popperClass" tabindex="0" ref="body" v-if="popperVisible">
      <div class="date-picker--popper-body">
        <slot/>
      </div>
      <div class="date-picker--popper-footer" :style="footerStyle">
        <slot name="footer"/>
      </div>
      <div class="date-picker--popper-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
// PATCH: Array.find
// Popper JS 中使用了 find 方法
if (!Array.prototype.find) {
  // eslint-disable-next-line
  Array.prototype.find = function (indicator) {
    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      if (indicator(item)) {
        return item
      }
    }
    return null
  }
}
export default {
  name: 'Popper',
  props: {
    visible: Boolean,
    popperClass: String,
    valueClass: String,
    toBody: Boolean,
    options: Object
  },
  data() {
    return {
      popperVisible: false,
      popperInstance: null,
      dialogElement: null,
      footerStyle: {}
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.createPopper()
      } else {
        this.destroyPopper()
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.createPopper()
    }
  },
  beforeDestroy() {
    this.destroyPopper()
  },
  computed: {
    computedOptions() {
      const options = this.options
      if (!options.modifiers) {
        options.modifiers = []
      }
      if (!options.modifiers.some(mod => mod.name === 'offset')) {
        options.modifiers.push({
          name: 'offset',
          options: {
            // 这个 9 是空出箭头所占用的空间
            // 9: 箭头大小 8 + 1
            // 1: 间隔
            offset: [0, 9]
          }
        })
      }
      return options
    }
  },
  methods: {
    async loadPopperJS() {
      const isBrowser = typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]'

      if (isBrowser && window.Popper) {
        return window.Popper
      }
      return import(/* webpackChunkName: "popperjs" */ '@popperjs/core')
    },
    async createPopper() {
      this.popperVisible = true
      await this.$nextTick()
      const body = this.dialogElement = this.$refs.body
      if (this.toBody) {
        document.body.appendChild(body)
      }
      const {createPopper} = await this.loadPopperJS()
      this.popperInstance = createPopper(this.$refs.reference, body, this.computedOptions)
      await this.$nextTick()
      body.focus()

      this.footerStyle = {
        display: 'block',
        width: this.$refs.body.getClientRects()[0].width + 'px'
      }
    },
    async destroyPopper() {
      await this.$nextTick()
      if (this.toBody && this.dialogElement) {
        document.body.removeChild(this.dialogElement)
        this.dialogElement = null
      }
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
      this.popperVisible = false

      this.footerStyle = {}
    }
  }
}
</script>

<style scoped>

</style>
