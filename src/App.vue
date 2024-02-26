<template>
  <div id="app">
    <info/>
    <demo/>
    <hr>
  </div>
</template>

<script>
// import test from './demos/test'
import Demo from './Demo'
import Info from './Info'

export default {
  name: 'App',
  components: {Info, Demo},
  mounted() {
    // test.run()
  }
}
</script>
<style lang="less">
@title: #17233d;
@header: #515a6e;
@text: #515a6e;
@small: #808695;

#app {
  width: 1080px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  height: 70px;
}

#title {
  color: @title;
  font-size: 32px;
  padding: 10px 0;
}

small {
  font-weight: normal;
  color: @small;
  font-size: small;
  margin-left: 20px;
}

h1, h2, h3, h4, h5, h6 {
  color: @header;
  font-weight: normal;
}

h2 {
  border-bottom: 1px solid #e8eaec;
  padding: 10px 0;
}

h3 {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

h3, h4 {
  border-left: 2px solid #8dc3ee;
  padding-left: 5px;
}

a, code {
  color: #2b85e4;
  font-size: 14px;
}

code {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  border-radius: 2px;
  padding: 10px;

  &.block {
    display: block;
    background-color: #f8f8f9;
    margin: 10px 0;
  }
}

.select {
  user-select: all;
}

p {
  padding: 5px 10px;
  font-size: 14px;
}

li {
  padding: 5px;
}
</style>
