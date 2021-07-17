<template>
  <div>
    <span>显示农历: </span>
    <date-picker type="date" v-model="date" show-lunar/>
  </div>
</template>

<script>
export default {
  name: "ADemo",
  data() {
    return {
      date: ''
    }
  }
}
</script>

<style scoped>

</style>
