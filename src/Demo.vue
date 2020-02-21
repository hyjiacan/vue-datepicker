<template>
    <div class="demo">
        <div class="demo-grid">
            <div>
                <h4>选择指定日期</h4>
                <div class="date-label">年</div>
                <date-picker v-model="year" type="year" @change="onChange" min="2016" max="2022" :mousewheel="false"/>
                <div>(min="2016" max="2022")</div>
                <div class="date-value">{{year}}</div>
                <div class="date-label">年-月</div>
                <date-picker v-model="month" type="month" @change="onChange" min="2016-05" max="2022-10"/>
                <div>(min="2016-05" max="2022-10")</div>
                <div class="date-value">{{month}}</div>
                <div class="date-label">年-月-日</div>
                <date-picker v-model="date" type="date" @change="onChange" min="2016-05-10" max="2022-10-20"/>
                <div>(min="2016-05-10" max="2022-10-20")</div>
                <div class="date-value">{{date}}</div>
                <div class="date-label">时间</div>
                <date-picker v-model="time" type="time" @change="onChange" min="09:00" max="20:30"/>
                <div>(min="09:00" max="20:30")</div>
                <div class="date-value">{{time}}</div>
                <div class="date-label">年-月-日 时间</div>
                <date-picker v-model="datetime" type="datetime" @change="onChange" min="2020-05-10 09:00"
                             max="2020-10-20 20:30"/>
                <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
                <div class="date-value">{{datetime}}</div>
                <div class="date-label">年-季度</div>
                <date-picker range v-model="rseason" type="season" @change="onChange"/>
                <div class="date-value">{{rseason}}</div>
                <div class="date-label">年-周</div>
                <date-picker range v-model="rweek" type="week" @change="onChange"/>
                <div class="date-value">{{rweek}}</div>
            </div>

            <div>
                <h4>选择日期范围(一次弹框选择[<i>默认</i>])</h4>
                <div class="date-label">年</div>
                <date-picker range v-model="ryear" type="year" @change="onChange"/>
                <div class="date-value">{{ryear}}</div>
                <div class="date-label">年-月</div>
                <date-picker range v-model="rmonth" type="month" @change="onChange"/>
                <div class="date-value">{{rmonth}}</div>
                <div class="date-label">年-月-日</div>
                <date-picker range v-model="rdate" type="date" @change="onChange"/>
                <div class="date-value">{{rdate}}</div>
                <div class="date-label">时间</div>
                <date-picker range v-model="rtime" type="time" @change="onChange" min="09:00" max="20:30"/>
                <div>(min="09:00" max="20:30")</div>
                <div class="date-value">{{rtime}}</div>
                <div class="date-label">年-月-日 时间</div>
                <date-picker range v-model="rdatetime" type="datetime" @change="onChange" min="2020-05-10 09:00"
                             max="2020-10-20 20:30"/>
                <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
                <div class="date-value">{{rdatetime}}</div>
            </div>

            <div>
                <h4>选择日期范围(分两次弹框选择)</h4>
                <div class="date-label">年</div>
                <date-picker range v-model="ryear" type="year" @change="onChange" split/>
                <div class="date-value">{{ryear}}</div>
                <div class="date-label">年-月</div>
                <date-picker range v-model="rmonth" type="month" @change="onChange" split/>
                <div class="date-value">{{rmonth}}</div>
                <div class="date-label">年-月-日</div>
                <date-picker range v-model="rdate" type="date" @change="onChange" split/>
                <div class="date-value">{{rdate}}</div>
                <div class="date-label">时间</div>
                <date-picker range v-model="rtime" type="time" @change="onChange" split min="09:00" max="20:30"/>
                <div>(min="09:00" max="20:30")</div>
                <div class="date-value">{{rtime}}</div>
                <div class="date-label">年-月-日 时间</div>
                <date-picker range v-model="rdatetime" type="datetime" @change="onChange" split min="2020-05-10 09:00"
                             max="2020-10-20 20:30"/>
                <div>(min="2020-05-10 09:00" max="2020-10-20 20:30")</div>
                <div class="date-value">{{rdatetime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from './components'

export default {
  name: 'Demo',
  components: {DatePicker},
  data () {
    return {
      year: '2020',
      month: '2020-01',
      date: '2020-01-01',
      time: '12:15',
      datetime: '2020-01-01 12:15',
      ryear: ['2020', '2022'],
      rseason: ['2020-01-12'],
      rmonth: ['2020-01-12', '2022-10-12'],
      rweek: ['2020-01-01'],
      rdate: ['2020-01-01', '2022-10-01'],
      rtime: ['12:15', '20:30'],
      rdatetime: ['2020-01-01 12:15', '2022-10-01 20:30']
    }
  },
  watch: {
    rweek (v) {
      console.info('rweek', v)
    },
    rseason (v) {
      console.info('rseason', v)
    }
  },
  methods: {
    onChange ({type, value}, oldValue) {
      console.info(type, value, oldValue)
    }
  }
}
</script>

<style lang="less" scoped>
.demo-grid {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
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

/*.left {*/
/*  float: left;*/
/*  width: 400px;*/
/*}*/

/*.right {*/
/*  float: left;*/
/*  width: 400px;*/
/*}*/
</style>
