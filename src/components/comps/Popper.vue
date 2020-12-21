<template>
  <div class="date-picker--popper">
    <div class="date-picker--popper-reference" ref="reference">
      <slot name="reference"/>
    </div>
    <div class="date-picker--popper-dialog" @focus="$emit('focus')" @blur="$emit('blur')"
         :class="popperClass" tabindex="0" ref="body" v-if="popperVisible">
      <div class="date-picker--popper-body">
        <slot/>
      </div>
      <div class="date-picker--popper-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import {createPopper} from '@popperjs/core'

export default {
  name: 'Popper',
  props: {
    visible: Boolean,
    popperClass: String,
    toBody: Boolean,
    options: Object
  },
  data() {
    return {
      popperVisible: false,
      popperInstance: null
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
            offset: [9, 9]
          }
        })
      }
      return options
    }
  },
  methods: {
    async createPopper() {
      this.popperVisible = true
      await this.$nextTick()
      const body = this.$refs.body
      if (this.toBody) {
        document.body.appendChild(body)
      }
      this.popperInstance = createPopper(this.$refs.reference, body, this.computedOptions)
    },
    async destroyPopper() {
      await this.$nextTick()
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
      if (this.toBody && this.$refs.body) {
        document.body.removeChild(this.$refs.body)
      }
      this.popperVisible = false
    }
  }
}
</script>

<style scoped>

</style>
