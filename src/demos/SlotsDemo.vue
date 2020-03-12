<template>
  <div>
    <h3>Slots: shortcut</h3>

    <div class="date-label">单个</div>
    <date-picker type="date" v-model="date">
      <template v-slot:shortcut>
        <div class="b1">
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
        </div>
      </template>
    </date-picker>

    <div class="date-label">范围 - 左侧</div>
    <date-picker type="date" v-model="rdate" range>
      <template v-slot:shortcut>
        <div class="b1">
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
        </div>
      </template>
    </date-picker>

    <div class="date-label">范围 - 上方</div>
    <date-picker type="date" v-model="rdate" shortcuts-orientation="horizon" range>
      <template v-slot:shortcut>
        <div class="b2">
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
        </div>
      </template>
    </date-picker>

    <div class="date-label">范围 split</div>
    <date-picker type="date" v-model="rdate" shortcuts-orientation="horizon" range split>
      <template v-slot:shortcut>
        <div class="b2">
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
          <button>今天</button>
          <button>明天</button>
          <button>后天</button>
          <button>外天</button>
          <button>昨天</button>
          <button>前天</button>
          <button>大前天</button>
        </div>
      </template>
    </date-picker>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SlotsDemo',
  mixins: [mixin]
}
</script>

<style lang="less" scoped>
.b1 button {
  display: block;
}

.b1, .b2 {
  height: 100%;
  padding: 5px;
  overflow: auto;
}
</style>
