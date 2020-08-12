<template>
  <div id="app">
    <info/>
    <demo/>
  </div>
</template>

<script>
import test from './demos/test'
import Demo from './Demo'
import Info from './Info'

export default {
  name: 'App',
  components: {Info, Demo},
  mounted() {
    test.run()
  }
}
</script>
<style>
#app {
  width: 1080px;
  margin: 0 auto;
}
</style>
