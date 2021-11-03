<template>
  <div class="info">
    <h1>
      VUE-DatePicker
      <small>Date picker for Vue.js</small>
    </h1>
    <p>
      npm i @hyjiacan/vue-datepicker
    </p>
    或
    <p>
      yarn add @hyjiacan/vue-datepicker
    </p>
    <ul>
      <li>
        <span>Github:</span>
        <a href="https://github.com/hyjiacan/vue-datepicker">https://github.com/hyjiacan/vue-datepicker</a>
      </li>
      <li>
        <span>Demo:</span>
        <a href="https://github.com/hyjiacan/vue-datepicker/blob/master/src/Demo.vue">https://github.com/hyjiacan/vue-datepicker/blob/master/src/Demo.vue</a>
      </li>
    </ul>
    <blockquote>
      可以通过 <code>const t = new Date('2012-12-12').getTime();DatePicker.$util.set(t)</code> 来修正日期
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'Info',
  mounted() {
  }
}
</script>

<style scoped>
p {
  padding: 5px 10px;
  background-color: #EEEEEE;
}

small {
  font-weight: normal;
  color: #555555;
}

li {
  padding: 5px;
}
</style>
