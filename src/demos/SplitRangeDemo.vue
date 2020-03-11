<template>
    <div>
        <h4>选择日期范围(分两次弹框选择)</h4>
        <div class="date-label">年</div>
        <date-picker range :week-start="weekStart" v-model="ryear" type="year" split/>
        <div class="date-value">{{ryear}}</div>
        <div class="date-label">年-月</div>
        <date-picker range :week-start="weekStart" v-model="rmonth" type="month" split/>
        <div class="date-value">{{rmonth}}</div>
        <div class="date-label">年-月-日</div>
        <date-picker range :week-start="weekStart" v-model="rdate" type="date" split/>
        <div class="date-value">{{rdate}}</div>
        <div class="date-label">时间</div>
        <date-picker range :week-start="weekStart" v-model="rtime" type="time" split
                     min="09:00" max="20:30"/>
        <div>(min="09:00" max="20:30")</div>
        <div class="date-value">{{rtime}}</div>
        <div class="date-label">年-月-日 时间</div>
        <date-picker range :week-start="weekStart" v-model="rdatetime" type="datetime" split
                     min="2020-05-10 09:00"
                     max="2020-10-20 20:30"/>
        <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
        <div class="date-value">{{rdatetime}}</div>
    </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SplitRangeDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>

</style>
