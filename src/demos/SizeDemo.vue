<template>
    <div>
        <h3>不同的尺寸</h3>
        <ul>
            <li>
                <span>mini:</span>
                <date-picker range :value="[new Date(), new Date()]" size="mini"/>
            </li>
            <li>
                <span>small:</span>
                <date-picker range :value="[new Date(), new Date()]" size="small"/>
            </li>
            <li>
                <span>normal:</span>
                <date-picker range :value="[new Date(), new Date()]" size="normal"/>
            </li>
            <li>
                <span>large:</span>
                <date-picker range :value="[new Date(), new Date()]" size="large"/>
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
}
</style>
