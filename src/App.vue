<template>
    <div id="app">
        <info/>
        <demo/>
    </div>
</template>

<script>
import Demo from './Demo'
import Info from './Info'

export default {
  name: 'App',
  components: {Info, Demo}
}
</script>
<style>
#app {
    width: 1080px;
    margin: 0 auto;
}
</style>
