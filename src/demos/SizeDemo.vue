<template>
  <div>
    <h3>不同的尺寸</h3>
    <div class="demo-label">mini:</div>
    <div>
      <date-picker :value="getFixedDate()" size="mini"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="mini"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="mini" />
    </div>
    <div class="demo-label">small:</div>
    <div>
      <date-picker :value="getFixedDate()" size="small"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="small"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="small" />
    </div>
    <div class="demo-label">normal:</div>
    <div>
      <date-picker :value="getFixedDate()" size="normal"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="normal"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="normal" />
    </div>
    <div class="demo-label">large:</div>
    <div>
      <date-picker :value="getFixedDate()" size="large"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="large"/>
    </div>
    <div>
      <date-picker range :value="[getFixedDate(), getFixedDate()]" size="large" />
    </div>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SizeDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>
.date-picker {
  margin-bottom: 10px;
}
</style>
