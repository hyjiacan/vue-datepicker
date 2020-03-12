<template>
  <div class="date-picker--shortcuts">
    <slot>
      <button class="date-picker--shortcuts-button" v-for="(item, index) in data" :key="index" @click="$emit('change', item)">{{item.text}}</button>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Shortcuts',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
