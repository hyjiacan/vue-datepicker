<template>
  <div>
    <div style="padding: 20px 0;">
      <button v-for="t in types" :key="t" @click="currentType = t"
              :class="{active: currentType === t}">{{t}}
      </button>
    </div>
    <div>
      <date-picker v-model="date" :type="currentType"/>
      <code>`v-model` 不是数组，所以不支持 `week` 和 `season`</code>
      <p>{{date}}</p>
    </div>
    <div>
      <date-picker v-model="dateRange" :type="currentType" range/>
      <p>{{dateRange}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicTypeDemo',
  data () {
    return {
      types: [
        'date',
        'week',
        'month',
        'season',
        'year',
        'time',
        'datetime'
      ],
      currentType: 'date',
      date: new Date(),
      dateRange: [new Date(), new Date()]
    }
  }
}
</script>

<style lang="less" scoped>
button {
  width: 64px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #888888;
}

button.active {
  color: #ffffff;
  background-color: #137DE2;
}
</style>
