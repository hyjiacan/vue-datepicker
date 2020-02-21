<template>
  <div class="code-block" :class="{'code-block-collapsed': isCollapsed}" v-loading="loading">
    <div class="code-block-content" v-show="!isCollapsed" v-html="codeBlock"></div>
  </div>
</template>

<script>
export default {
  name: 'CodeBlock',
  props: {
    file: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      content: '',
      isCollapsed: false,
      url: ''
    }
  },
  async mounted() {
    this.hljs.configure({})
    this.isCollapsed = !!this.file
    if (this.$slots.default) {
      this.content = this.$slots.default[0].text
      this.doHighlight()
    }
    if (!this.isCollapsed) {
      this.loadFile()
    }
  },
  watch: {
    isCollapsed(v) {
      if (v) {
        return
      }
      this.loadFile()
    }
  },
  methods: {
    doHighlight() {
      this.$nextTick(() => {
        this.hljs.highlightBlock(this.$el.querySelector('pre'))
      })
    }
  },
  computed: {
    codeBlock() {
      if (!this.content) {
        return ''
      }
      return `<pre>${this.content.replace(/</g, '&lt;')}</pre>`
    }
  },
  beforeDestroy() {
    this.content = ''
    this.loading = false
    this.isCollapsed = false
  }
}
</script>

<style lang="less" scoped>
pre {
  margin: 0;
  display: block;
}

code {
  margin: 0;
}

.code-block-collapsed {
  pre {
    display: none;
  }
}

.code-block {
  padding: 10px 0;
  clear: both;
}

.code-block-content {
  max-height: 400px;
  overflow: auto;
  box-sizing: border-box;

  /deep/ pre {
    padding: 10px;
    margin: 0;
  }
}

.code-block-toolbar {
  padding: 5px 0;

  a {
    margin-left: 15px;
  }
}
</style>
