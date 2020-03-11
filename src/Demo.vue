<template>
  <div class="demo">
    <div class="demo-grid">
      <single-demo/>
      <size-demo/>
    </div>
    <div class="demo-grid">
      <merged-range-demo/>
      <split-range-demo/>
    </div>
    <div class="demo-grid">
      <clear-demo/>
    </div>
  </div>
</template>

<script>
import SingleDemo from './demos/SingleDemo'
import MergedRangeDemo from './demos/MergedRangeDemo'
import SplitRangeDemo from './demos/SplitRangeDemo'
import SizeDemo from './demos/SizeDemo'
import ClearDemo from './demos/ClearDemo'

export default {
  name: 'Demo',
  components: {ClearDemo, SizeDemo, SplitRangeDemo, MergedRangeDemo, SingleDemo}
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

.tips {
  color: #555555;
  background-color: #eaeaea;
  padding: 2px 5px;
}

div.tips {
  margin: 5px 0 0 0;
  border-left: 3px solid #333333;
  padding: 10px 5px;
}
</style>
