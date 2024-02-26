<template>
  <div>
    <h3>
      <span>动态设置 type</span>
      <small>
        <code-block/>
      </small>
    </h3>
    <div style="display: flex; padding: 20px 0;">
      <button v-for="t in types" :key="t" @click="currentType = t"
              :class="{active: currentType === t}">{{t}}
      </button>
    </div>
    <div v-if="currentType !== 'week' && currentType !== 'quarter'">
      <date-picker v-model="date" :type="currentType"/>
      <p>{{date}}</p>
    </div>
    <div>
      <date-picker v-model="dateRange" :type="currentType" range/>
      <p>{{dateRange}}</p>
    </div>
  </div>
</template>

<script>
import mixin from "@/demos/mixin";
import CodeBlock from "@/CodeBlock";

export default {
  name: 'DynamicTypeDemo',
  components: {CodeBlock},
  mixins: [mixin],
  data () {
    return {
      types: [
        'date',
        'week',
        'month',
        'quarter',
        'year',
        'time',
        'datetime'
      ],
      currentType: 'date',
      date: this.getFixedDate(),
      dateRange: [this.getFixedDate(), this.getFixedDate()]
    }
  }
}
</script>

<style lang="less" scoped>
button {
  width: 64px;
  height: 32px;
  border: 1px solid #888888;
}

button.active {
  color: #ffffff;
  background-color: #137DE2;
}
</style>
