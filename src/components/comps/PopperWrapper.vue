<template>
  <popper trigger="clickToOpen" :forceShow="visible"
          @show="onShow" @hide="onHide" @documentClick="onHide">
    <div class="popper date-picker-popover">
      <slot/>
    </div>
    <div class="date-picker popper-reference" :class="extraClass || ''" slot="reference">
      <slot name="reference"/>
    </div>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs'
// import Popper from 'vue-popperjs/src/index'
import 'vue-popperjs/dist/vue-popper.min.css'
// 经测试，popper 在使用 render 调用时不能使用，所以在此处作一个包装
export default {
  name: 'PopperWrapper',
  components: {Popper},
  props: {
    visible: Boolean,
    extraClass: String
  },
  computed: {
    option () {
      return {}
    }
  },
  methods: {
    onShow () {
      this.$emit('toggle', true)
    },
    onHide () {
      this.$emit('toggle', false)
    }
  }
}
</script>

<style scoped>

</style>
