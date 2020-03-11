<template>
    <div>
        <h4>选择指定日期</h4>
        <div class="date-label">年</div>
        <date-picker :week-start="weekStart" v-model="year" type="year" min="2016" max="2022"
                     :mousewheel="false" :visible="true"/>
        <div>(min="2016" max="2022")</div>
        <div class="date-value">{{year}}</div>
        <div class="date-label">年-月</div>
        <date-picker :week-start="weekStart" v-model="month" type="month" min="2016-05"
                     max="2022-10"/>
        <div>(min="2016-05" max="2022-10")</div>
        <div class="date-value">{{month}}</div>
        <div class="date-label">年-月-日</div>
        <date-picker :week-start="weekStart" v-model="date" type="date" min="2016-05-10"
                     max="2022-10-20"/>
        <div>(min="2016-05-10" max="2022-10-20")</div>
        <div class="date-value">{{date}}</div>
        <div class="date-label">时间</div>
        <date-picker :week-start="weekStart" v-model="time" type="time" min="09:00"
                     max="20:30"/>
        <div>(min="09:00" max="20:30")</div>
        <div class="date-value">{{time}}</div>
        <div class="date-label">年-月-日 时间</div>
        <date-picker :week-start="weekStart" v-model="datetime" type="datetime"
                     min="2020-05-10 09:00"
                     max="2020-10-20 20:30"/>
        <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
        <div class="date-value">{{datetime}}</div>
    </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SingleDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>

</style>
