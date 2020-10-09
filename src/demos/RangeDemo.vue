<template>
    <div>
        <h4>选择日期范围(一次弹框选择[<i>默认</i>])</h4>
        <div class="date-label">年 (高亮选中范围)</div>
        <date-picker range :week-start="weekStart" v-model="ryear" type="year" readonly highlight-range/>
        <div class="date-value">{{ryear}}</div>
      <div class="date-label">年-月 (<del>不高亮选中范围</del>)</div>
        <date-picker range :week-start="weekStart" v-model="rmonth" type="month"/>
        <div class="date-value">{{rmonth}}</div>
        <div class="date-label">年-月-日 (高亮选中范围)</div>
        <date-picker range :week-start="weekStart" v-model="rdate" type="date" highlight-range/>
        <div class="date-value">{{rdate}}</div>
        <div class="date-label">时间</div>
        <date-picker range :week-start="weekStart" v-model="rtime" type="time" min="09:00"
                     max="20:30"/>
        <div>(min="09:00" max="20:30")</div>
        <div class="date-value">{{rtime}}</div>
        <div class="date-label">年-月-日 时间</div>
        <date-picker range :week-start="weekStart" v-model="rdatetime" type="datetime"
                     min="2020-05-10 09:00"
                     max="2020-10-20 20:30"/>
        <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
        <div class="date-value">{{rdatetime}}</div>
      <div class="date-label">年-季度</div>
      <date-picker range :week-start="weekStart" v-model="rquarter" type="quarter" />
      <div class="date-value">{{rquarter}}</div>
      <div class="date-label">年-周</div>
      <date-picker range :week-start="weekStart" v-model="rweek" type="week" />
      <div class="date-value">{{rweek}}</div>
    </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'MergedRangeDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>

</style>
