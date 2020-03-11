<template>
  <div>
    <h3>清除值</h3>
    <div class="date-label">单个值</div>
    <date-picker type="date" :value="date" clearable/>
    <div class="date-value">{{date}}</div>

    <div class="date-label">单次弹框范围选择</div>
    <date-picker type="date" :value="rdate" range clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">分两次弹框范围选择</div>
    <date-picker type="date" :value="rdate" range split clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">日期时间选择</div>
    <date-picker type="datetime" :value="rdatetime" range split clearable/>
    <div class="date-value">{{rdatetime}}</div>

    <div class="date-label">日期时间选择</div>
    <date-picker type="datetime" :value="rdatetime" range clearable/>
    <div class="date-value">{{rdatetime}}</div>

    <div class="date-label">时间</div>
    <date-picker type="time" :value="time" clearable/>
    <div class="date-value">{{time}}</div>

    <div class="date-label">日期时间</div>
    <date-picker type="datetime" :value="datetime" clearable/>
    <div class="date-value">{{datetime}}</div>

    <div class="date-label">季度</div>
    <date-picker type="season" :value="rseason" clearable/>
    <div class="date-value">{{rseason}}</div>

    <div class="date-label">周</div>
    <date-picker type="week" :value="rweek" clearable/>
    <div class="date-value">{{rweek}}</div>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'ClearDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>

</style>
