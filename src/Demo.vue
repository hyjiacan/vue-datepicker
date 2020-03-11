<template>
    <div class="demo">
        <div class="demo-grid">
            <single-demo/>
            <merged-range-demo/>
        </div>
        <div class="demo-grid">
            <split-range-demo/>
            <size-demo/>
        </div>
    </div>
</template>

<script>
import SingleDemo from './demos/SingleDemo'
import MergedRangeDemo from './demos/MergedRangeDemo'
import SplitRangeDemo from './demos/SplitRangeDemo'
import SizeDemo from './demos/SizeDemo'

export default {
  name: 'Demo',
  components: {SizeDemo, SplitRangeDemo, MergedRangeDemo, SingleDemo}
}
</script>

<style lang="less">
.demo-grid {
    display: grid;
    grid-template-columns: 50% 50%;
}

.date-label {
    font-weight: bold;
    padding: 10px;
}

.date-value {
    vertical-align: middle;

    &:before {
        content: 'value:';
        margin-right: 5px;
    }
}
</style>
