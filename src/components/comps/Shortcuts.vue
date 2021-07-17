<template>
  <div class="date-picker--shortcuts">
    <slot>
      <span class="date-picker--shortcuts-button" v-for="(item, index) in data" :key="index" @click="onClick(item)">
        {{ item.text }}
      </span>
    </slot>
  </div>
</template>

<script>
import util from '../../assets/script/util'

export default {
  name: 'Shortcuts',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClick(item) {
      let value = item.value
      if (typeof value !== 'function') {
        this.$emit('change', {value})
        return
      }
      // 处理函数
      value = value(util)

      if (value instanceof Promise) {
        value.then(val => {
          this.$emit('change', {value: val})
        })
      } else {
        this.$emit('change', {value})
        }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
