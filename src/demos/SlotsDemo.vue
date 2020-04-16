<template>
  <div>
    <h3>Slots</h3>

    <h4>shortcut</h4>

    <div class="date-label">单个</div>
    <date-picker type="date" v-model="date" :shortcuts="shortcuts1"/>

    <div class="date-label">范围</div>
    <date-picker type="date" v-model="rdate" :shortcuts="shortcuts2" range/>

    <div class="date-label">单个 - 自定义</div>
    <date-picker type="date" v-model="date">
      <template v-slot:shortcut>
        <div class="b1">
          <button>这些按钮</button>
          <button>没有实际意义</button>
          <button>只是为了演示</button>
          <button>自定义按钮</button>
          <button>是这么写的</button>
        </div>
      </template>
    </date-picker>

    <div class="date-label">范围 - 自定义</div>
    <date-picker type="date" v-model="rdate" range>
      <template v-slot:shortcut>
        <div class="b1">
          <button>这些按钮</button>
          <button>没有实际意义</button>
          <button>只是为了演示</button>
          <button>自定义按钮</button>
          <button>是这么写的</button>
        </div>
      </template>
    </date-picker>

    <h4>value</h4>
    <div class="date-label">自定义值的显示 - 单个</div>
    <date-picker type="date" v-model="date">
      <template v-slot:value="{value, format, type, visible}">
        <ul class="custom-value">
          <li>visible: {{visible}}</li>
          <li>type: {{type}}</li>
          <li>format: {{format}}</li>
          <li>value: {{value}}</li>
        </ul>
      </template>
    </date-picker>

    <div class="date-label">自定义值的显示 - 范围</div>
    <date-picker type="date" v-model="rdate" range>
      <template v-slot:value="{value, format, type, visible}">
        <ul class="custom-value">
          <li>visible: {{visible}}</li>
          <li>type: {{type}}</li>
          <li>format: {{format}}</li>
          <li>value: {{value}}</li>
        </ul>
      </template>
    </date-picker>

    <div class="date-label">自定义提示文本 - 单个</div>
    <date-picker type="date" v-model="date">
      <template v-slot:title>
        <span>选择日期</span>
      </template>
    </date-picker>

    <div class="date-label">自定义提示文本 - 范围</div>
    <date-picker type="date" v-model="rdate" range>
      <template v-slot:title>
        <div>开始日期</div>
        <div>结束日期</div>
      </template>
    </date-picker>
  </div>
</template>

<script>
import mixin from './mixin'
import util from '../assets/script/util'

export default {
  name: 'SlotsDemo',
  mixins: [mixin],
  data() {
    const date = new Date()
    const today = date.getDate()
    return {
      date,
      shortcuts1: [{
        text: '昨天',
        value: util.setDate(date, {date: today - 1})
      }, {
        text: '今天',
        value: util.setDate(date)
      }, {
        text: '明天',
        value: util.setDate(date, {date: today + 1})
      }, {
        text: '下周今天',
        value: util.setDate(date, {date: today + 7})
      }, {
        text: '去年今天',
        value: util.setDate(date, {year: date.getFullYear() - 1})
      }, {
        text: '明年今天',
        value: util.setDate(date, {year: date.getFullYear() + 1})
      }],
      shortcuts2: [{
        text: '本周',
        value: util.getWeekRange(date)
      }, {
        text: '最近一周',
        value: [util.setDate(date, {date: today - 6}), date]
      }, {
        text: '最近半个月',
        value: [util.setDate(date, {date: today - 14}), date]
      }, {
        text: '最近1个月',
        value: [util.setDate(date, {month: date.getMonth() - 1, date: today}), date]
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.b1 {
  padding: 5px;
  width: 100px;

  button {
    margin-bottom: 5px;
  }
}

.custom-value {
  border: 1px solid #55a532;

  &:hover {
    border-color: #126ac4;
  }
}
</style>
