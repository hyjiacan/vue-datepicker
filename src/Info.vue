<template>
  <div class="info">
    <header>
      <div id="title">
        <span>Vue-DatePicker</span>
        <small>Vue2 的日期选择组件</small>
      </div>
      <div class="toolbar">
        <a href='https://gitee.com/wangankeji/vue-datepicker'>
          <img src='https://gitee.com/wangankeji/vue-datepicker/widgets/widget_3.svg?color=17233d'
               alt='Fork me on Gitee'/>
        </a>
      </div>
    </header>
    <h2>特性</h2>
    <ul>
      <li>
        <span>日期修正，强制界面上的操作使用指定时间（通常使用服务器时间）</span>
        <code>DatePicker.util.setDate()</code>
      </li>
      <li>
        <span>支持农历和节日展示 <code>lunar</code></span>
      </li>
      <li>支持日期单元格标记 <code>mark-function</code></li>
      <li>通过 <code>DatePicker.util</code> 提供了一个工具集合</li>
      <li>支持按周 <code>week</code> 和季度 <code>quarter</code> 选择日期范围</li>
    </ul>
    <h2>安装</h2>
    <code class="block">npm i @wangankeji/vue-datepicker</code>
    <span>或</span>
    <code class="block">yarn add @wangankeji/vue-datepicker</code>

    <div class="tips">
      <span>包名称为:</span>
      <code class="select">@wangankeji/vue-datepicker</code>
    </div>

    <h2>源码</h2>
    <ul>
      <li>
        <span>仓库: </span>
        <a href="https://gitee.com/wangankeji/vue-datepicker">https://gitee.com/wangankeji/vue-datepicker</a>
      </li>
      <li>
        <span>示例: </span>
        <a href="https://gitee.com/wangankeji/vue-datepicker/blob/master/src/Demo.vue">https://gitee.com/wangankeji/vue-datepicker/blob/master/src/Demo.vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Info',
  mounted() {
  }
}
</script>
