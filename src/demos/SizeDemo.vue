<template>
  <div>
    <h3>不同的尺寸</h3>
    <div class="demo-label">mini:</div>
    <div>
      <date-picker :value="new Date()" size="mini"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="mini"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="mini" />
    </div>
    <div class="demo-label">small:</div>
    <div>
      <date-picker :value="new Date()" size="small"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="small"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="small" />
    </div>
    <div class="demo-label">normal:</div>
    <div>
      <date-picker :value="new Date()" size="normal"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="normal"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="normal" />
    </div>
    <div class="demo-label">large:</div>
    <div>
      <date-picker :value="new Date()" size="large"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="large"/>
    </div>
    <div>
      <date-picker range :value="[new Date(), new Date()]" size="large" />
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
/deep/ .date-picker--container {
  margin-bottom: 10px;
}
</style>
