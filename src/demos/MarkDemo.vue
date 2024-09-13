<script>
import CodeBlock from '@/CodeBlock'
import store from '@/assets/script/store'

export default {
  name: 'MarkDemo',
  components: {CodeBlock},
  data() {
    return {
      date: '',
      notes: {}
    }
  },
  methods: {
    markFunction(e) {
      if (e.type === 'date') {
        if (e.day === 6 || e.day === 0) {
          return '<span class="flag" title="周末标记">*</span>'
        }
      } else if (e.type === 'month') {
        if (e.month === 10) {
          return '<span class="flag" title="国庆标记">*</span>'
        }
      } else if (e.type === 'year') {
        if (e.year === 2012) {
          return '<span class="flag" title="世界末日标记">*</span>'
        }
      }
    },
    getDateString(type, data) {
      const temp = [`${data.year}年`]
      if (type !== 'year') {
        temp.push(`${data.month}月`)
      }
      if (type === 'date') {
        temp.push(`${data.date}日`)
      }
      return temp.join('')
    },
    getNote(date) {
      return this.notes[date] || store.get(date)
    },
    setNote(date) {
      const msg = prompt('设置备注', store.get(date))
      store.set(date, msg)
      this.$set(this.notes, date, msg)
    }
  }
}
</script>

<template>
  <div class="mark-demo">
    <h3>
      <span>标记支持</span>
      <small>
        <code-block/>
      </small>
    </h3>
    <div>
      <div class="date-label">函数标记</div>
      <picker class="calendar" v-model="date" :week-start="1" :mark-function="markFunction"
              :mousewheel="false"></picker>
      <div class="tips">将时间选择到 <code>2012年</code>，可以点击看看 <b>月</b>和<b>年</b>，也有标记</div>
    </div>
    <div>
      <div class="date-label">自定义标记</div>
      <picker class="calendar" v-model="date" :week-start="1" :mark-function="markFunction" :mousewheel="false">
        <template #default="{type, data}">
          <div class="my-cell">
            <div style="font-size: large;font-family: fantasy;letter-spacing: 1px">
              <span>{{ getDateString(type, data) }}</span>
            </div>
            <div style="font-weight: lighter;">
              <span>{{ data.lunar.GanZhiYear }}{{ data.lunar.zodiac }}年</span>
              <span v-show="type!=='year'">{{ data.lunar.lunarMonthName }}</span>
              <span v-show="type!=='year'" v-if="data.lunar.lunarLeapMonth === data.lunar.month">(闰)</span>
              <span v-show="type==='date'">{{ data.lunar.lunarDayName }}</span>
            </div>
            <div v-show="type==='date'">
              <span class="festival" v-if="data.lunar.term">{{ data.lunar.term }}</span>
              <span class="festival" v-if="data.lunar.solarFestival">{{ data.lunar.solarFestival }}</span>
            </div>
            <div class="note">
              <span>{{ getNote(getDateString(type, data)) }}</span>
            </div>
            <a class="note-btn" href="javascript:" style="font-size: 12px"
               @click="setNote(getDateString(type, data))">备注</a>
          </div>
        </template>
      </picker>
    </div>
  </div>
</template>

<style lang="less">
.calendar {
  border: 1px solid #cccccc;

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

  td.date-picker--table-cell {
    border: 1px solid;
    width: calc(100% / 7);
  }

  .note-btn {
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .my-cell {
    text-align: left;
    width: 100%;
    min-height: 80px;
    height: 100%;
    line-height: 2;
    font-size: 12px;
    padding: 2px;

    &:hover {
      .note-btn {
        display: inline;
      }
    }

    .festival {
      background-color: #f5fff5;
      color: #044e04;
      margin-right: 5px;
      padding: 2px 3px;
      border-radius: 3px;
      display: inline-block;
      line-height: 1.5;
    }

    .note {
      margin-top: 10px;
      min-height: 30px;
      line-height: 1.5;
    }
  }
}
</style>
