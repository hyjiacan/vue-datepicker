<template>
  <div>
    <h3>清除值</h3>
    <div class="date-label">日期</div>
    <date-picker type="date" v-model="date" size="mini" hide-icon clearable/>
    <div class="date-value">{{date}}</div>

    <div class="date-label">日期</div>
    <date-picker type="date" v-model="date" clearable/>
    <div class="date-value">{{date}}</div>

    <div class="date-label">时间</div>
    <date-picker type="time" v-model="time" hide-icon clearable/>
    <div class="date-value">{{time}}</div>

    <div class="date-label">日期时间</div>
    <date-picker type="datetime" v-model="datetime" clearable/>
    <div class="date-value">{{datetime}}</div>

    <div class="date-label">日期时间</div>
    <date-picker type="datetime" v-model="datetime" hide-icon clearable/>
    <div class="date-value">{{datetime}}</div>

    <div class="date-label">日期选择</div>
    <date-picker type="date" v-model="rdate" range clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">日期选择</div>
    <date-picker type="date" v-model="rdate" hide-icon range clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">日期选择</div>
    <date-picker type="date" v-model="rdate" range clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">日期选择</div>
    <date-picker type="date" v-model="rdate" hide-icon range clearable/>
    <div class="date-value">{{rdate}}</div>

    <div class="date-label">日期时间选择</div>
    <date-picker type="datetime" v-model="rdatetime" range clearable/>
    <div class="date-value">{{rdatetime}}</div>

    <div class="date-label">日期时间选择</div>
    <date-picker type="datetime" v-model="rdatetime" hide-icon range clearable/>
    <div class="date-value">{{rdatetime}}</div>

    <div class="date-label">季度</div>
    <date-picker type="season" v-model="rseason" clearable/>
    <div class="date-value">{{rseason}}</div>

    <div class="date-label">周</div>
    <date-picker type="week" v-model="rweek" hide-icon clearable/>
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
