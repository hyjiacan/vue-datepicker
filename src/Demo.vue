<template>
  <div class="demo">
    <h2>
      <span>示例</span>
      <a href="https://codepen.io/hyjiacan/pen/WNOMYdo" style="margin-left: 20px;" target="_blank"> 在线示例 (CodePen)</a>
    </h2>

    <div class="demo-grid">
      <a-demo/>
      <offset-demo/>
    </div>
    <div class="demo-grid">
      <single-demo/>
      <range-demo/>
    </div>
    <div class="demo-grid">
      <size-demo/>
      <dynamic-type-demo/>
    </div>
    <div class="demo-grid">
      <slots-demo/>
      <clear-demo/>
    </div>
  </div>
</template>

<script>
import SingleDemo from './demos/SingleDemo'
import RangeDemo from './demos/RangeDemo'
import SizeDemo from './demos/SizeDemo'
import ClearDemo from './demos/ClearDemo'
import SlotsDemo from './demos/SlotsDemo'
import DynamicTypeDemo from './demos/DynamicTypeDemo'
import OffsetDemo from './demos/OffsetDemo'
import ADemo from "./demos/ADemo";

export default {
  name: 'Demo',
  // eslint-disable-next-line vue/no-unused-components
  components: {ADemo, OffsetDemo, DynamicTypeDemo, SlotsDemo, ClearDemo, SizeDemo, RangeDemo, SingleDemo},
  data() {
    return {
      date: ''
    }
  },
  beforeCreate() {
  }
}
</script>

<style lang="less">
.demo {
  padding-bottom: 160px;
}

.demo-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;

  > div {
    width: 400px;
  }
}

.date-label {
  padding: 10px 0;
  margin-top: 20px;
  font-weight: bold;
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
  border-left: 3px solid #899fb5;
  padding: 10px 5px;
}
</style>
