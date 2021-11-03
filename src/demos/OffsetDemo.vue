<template>
  <div class="demo">
    <h3>日期偏移示例</h3>
    <div>
      <h4>使用对象</h4>
      <p>当前日期: {{date | format}}</p>
      <p>偏移后日期: {{objOffset | format}}</p>
      <div>
        <p>
          <span>偏移对象:</span>
          <span class="bold">{{formattedObj}}</span>
        </p>
        <div>
          <span>年</span>
          <span><input type="number" v-model="obj.year" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
        <div>
          <span>月</span>
          <span><input type="number" v-model="obj.month" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
        <div>
          <span>日</span>
          <span><input type="number" v-model="obj.date" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
      </div>
      <h4>使用字符串</h4>
      <p>当前日期: {{date | format}}</p>
      <p>偏移后日期: {{strOffset | format}}</p>
      <div>
        <div>
          <span>偏移串:</span>
          <span class="bold">{{formattedStr}}</span>
        </div>
        <div>
          <span>y</span>
          <span><input type="number" v-model="str.y" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
        <div>
          <span>m</span>
          <span><input type="number" v-model="str.m" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
        <div>
          <span>d</span>
          <span><input type="number" v-model="str.d" maxlength="3" @mouseenter="setFocus"/></span>
        </div>
      </div>
      <p class="tip">可以试试清空输入框的值</p>
    </div>
  </div>
</template>

<script>
import util from '../assets/script/util'
import mixin from "@/demos/mixin";

export default {
  name: 'OffsetDemo',
  mixins: [mixin],
  filters: {
    format(val) {
      return util.format(val, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      date: this.getFixedDate(),
      obj: {
        year: 0,
        month: 0,
        date: 0
      },
      str: {
        y: 0,
        m: 0,
        d: 0
      }
    }
  },
  methods: {
    setFocus({target}) {
      target.focus()
    }
  },
  computed: {
    formattedStr() {
      return ['y', 'm', 'd'].filter(flag => this.str[flag] !== '').map(flag => `${this.str[flag]}${flag}`).join('')
    },
    formattedObj() {
      const temp = {}
      for (const name in this.obj) {
        if (this.obj[name] !== '') {
          temp[name] = this.obj[name]
        }
      }

      return temp
    },
    objOffset() {
      return util.offsetDate(this.date, this.formattedObj)
    },
    strOffset() {
      return util.offsetDate(this.date, this.formattedStr)
    }
  }
}
</script>

<style scoped>
input {
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 20px;
}

.tip {
  color: #404040;
  border-left: 2px solid #666666;
  padding: 10px;
  background-color: #f0f6ef;
}

.bold {
  font-weight: bold;
}
</style>
