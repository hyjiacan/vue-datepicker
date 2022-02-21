<template>
  <div class="demo">
    <h3>
      <span>日期偏移示例</span>
      <small>
        <code-block/>
      </small>
    </h3>
    <div>
      <div class="date-label">使用对象</div>
      <p>当前日期: {{ date | format }}</p>
      <p>偏移后日期: {{ objOffset | format }}</p>
      <div>
        <p>
          <span>偏移对象: </span>
          <span class="bold">{{ JSON.stringify(formattedObj) }}</span>
        </p>
        <div class="offset-inputs">
          <div>
            <span>year=</span>
            <span><input type="number" v-model="obj.year" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
          <div>
            <span>month=</span>
            <span><input type="number" v-model="obj.month" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
          <div>
            <span>date=</span>
            <span><input type="number" v-model="obj.date" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
        </div>
      </div>
      <div class="date-label">使用字符串</div>
      <p>当前日期: {{ date | format }}</p>
      <p>偏移后日期: {{ strOffset | format }}</p>
      <div>
        <p>
          <span>偏移串: </span>
          <span class="bold">{{ formattedStr }}</span>
        </p>
        <div class="offset-inputs">
          <div>
            <span>y=</span>
            <span><input type="number" v-model="str.y" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
          <div>
            <span>m=</span>
            <span><input type="number" v-model="str.m" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
          <div>
            <span>d=</span>
            <span><input type="number" v-model="str.d" maxlength="3" @mouseenter="setFocus"/></span>
          </div>
        </div>
      </div>
      <div class="tips">可以试试清空输入框的值(留空)</div>
    </div>
  </div>
</template>

<script>
import util from '../assets/script/util'
import mixin from "@/demos/mixin";
import CodeBlock from "@/CodeBlock";

export default {
  name: 'OffsetDemo',
  components: {CodeBlock},
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

<style lang="less" scoped>
input {
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 20px;
  width: 40px;
  border: 1px solid #cccccc;
  color: #666666;
  border-radius: 2px;

  &:active, &:focus {
    outline: 1px solid #8dc3ee;
  }
}

.offset-inputs {
  display: flex;
  justify-content: space-between;
}

.bold {
  font-weight: bold;
}
</style>
