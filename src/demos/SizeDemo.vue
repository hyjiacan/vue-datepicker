<template>
  <div>
    <h3>不同的尺寸</h3>
    <ul>
      <li>
        <div>mini:</div>
        <div>
          <date-picker :value="new Date()" size="mini"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="mini"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="mini" split/>
        </div>
      </li>
      <li>
        <div>small:</div>
        <div>
          <date-picker :value="new Date()" size="small"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="small"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="small" split/>
        </div>
      </li>
      <li>
        <div>normal:</div>
        <div>
          <date-picker :value="new Date()" size="normal"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="normal"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="normal" split/>
        </div>
      </li>
      <li>
        <div>large:</div>
        <div>
          <date-picker :value="new Date()" size="large"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="large"/>
        </div>
        <div>
          <date-picker range :value="[new Date(), new Date()]" size="large" split/>
        </div>
      </li>
    </ul>
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
li {
  margin: 10px 0;

  > div {
    margin-bottom: 10px;
  }
}
</style>
