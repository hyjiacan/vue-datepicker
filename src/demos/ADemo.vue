<template>
  <div>
    <h3>
      <span>特色功能</span>
      <small>
        <code-block/>
      </small>
    </h3>
    <div class="date-label">时间修正</div>
    <div>
      <date-picker type="datetime" v-model="fixedTime" clearable/>
    </div>
    <div class="tips">
      <div>
        可以通过以下代码来修正日期
        <pre><code>
const t = new Date('2012-12-12').getTime();
DatePicker.util.setDate(t)
</code></pre>
      </div>
      <div>函数签名: <code>DatePicker.util.setDate(timestamp)</code></div>
      <div>此函数提供时间修正功能，支持在终端界面上使用服务器时间</div>
      <div>修改此值会影响所有的当前日期</div>
    </div>
    <div class="date-label">显示农历</div>
    <date-picker type="datetime" v-model="date" show-lunar show-festival/>
    <div class="date-label">日历标记</div>
    <picker class="calendar" v-model="date" :week-start="1" :mark-function="markFunction"/>
    <div class="tips">将时间选择到 <code>2012年</code>，可以点击看看 <b>月</b>和<b>年</b>，也有标记</div>
  </div>
</template>

<script>
import DatePicker from "@/components";
import CodeBlock from "@/CodeBlock";

export default {
  name: "ADemo",
  components: {CodeBlock},
  data() {
    return {
      date: '',
      fixedTime: '2012-12-12'
    }
  },
  created() {
    this.doFix()
  },
  methods: {
    markFunction(e) {
      if (e.type === 'date') {
        if (e.day === 6 || e.day === 0) {
          return '<span class="flag" title="周末标记">*</span>';
        }
      } else if (e.type === 'month') {
        if (e.month === 10) {
          return '<span class="flag" title="国庆标记">*</span>';
        }
      } else if (e.type === 'year') {
        if (e.year === 2012) {
          return '<span class="flag" title="世界末日标记">*</span>';
        }
      }
    },
    doFix() {
      if (!this.fixedTime) {
        DatePicker.util.setDate(0)
        return
      }
      const d = DatePicker.util.parse(this.fixedTime)
      DatePicker.util.setDate(d.getTime())
    }
  }
}
</script>

<style lang="less" scoped>
.flag {
  float: right;
  text-align: center;
  color: #0dc50d;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;


  &:hover {
    color: #ffffff;
    background-color: rgba(20, 189, 20, 0.85);
  }
}

.calendar {
  border: 1px solid #cccccc;
}

button {
  width: 60px;
  height: 32px;
  margin-left: 20px;
  border: 1px solid #8dc3ee;
  background-color: #ffffff;
  color: #2b85e4;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #2b85e4;
  }
}
</style>
