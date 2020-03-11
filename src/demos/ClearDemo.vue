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
