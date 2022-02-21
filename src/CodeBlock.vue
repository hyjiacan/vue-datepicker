<template>
  <span class="code-block">
      <a :href="url" :target="sampleName" v-if="url">查看示例源码</a>
  </span>
</template>

<script>
import Vue from "vue";

export default {
  name: 'CodeBlock',
  props: {
    component: Vue
  },
  computed: {
    url() {
      const prefix = `${this.$git.host}/${this.$git.user}/${this.$git.repo}`
      return `${prefix}/tree/master/src/demos/${this.sampleName}.vue#tree-content-holder`
    },
    sampleName() {
      return this.$parent.$options.name
    }
  }
}
</script>

<style lang="less" scoped>
</style>
