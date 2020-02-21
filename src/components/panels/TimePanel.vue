<template>
  <div class="date-picker-panel date-picker-time">
    <div class="date-picker-panel__body">
      <table class="date-picker-time__body">
        <thead class="date-picker-time__title">
        <tr>
          <td><span>{{this.time.hour | pad}}</span></td>
          <td style="width: 16px"><span>:</span></td>
          <td><span>{{this.time.minute | pad}}</span></td>
          <td style="width: 16px"><span>:</span></td>
          <td><span>{{this.time.second | pad}}</span></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <time-wheel class="date-picker-time__h" :value.sync="time.hour" :disabled.sync="disabled.hour"
                        :data="hours"/>
          </td>
          <td></td>
          <td>
            <time-wheel class="date-picker-time__m" :value.sync="time.minute" :disabled.sync="disabled.minute"
                        :data="minutes"/>
          </td>
          <td></td>
          <td>
            <time-wheel class="date-picker-time__s" :value.sync="time.second" :data="seconds"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins/panel'
import TimeWheel from '../comps/TimeWheel'
import util from '../../assets/script/util'

export default {
  name: 'TimePanel',
  components: {TimeWheel},
  mixins: [mixin],
  data () {
    return {
      time: {
        hour: -1,
        minute: -1,
        second: -1
      },
      disabled: {
        hour: false,
        minute: false
      },
      initialized: false
    }
  },
  filters: {
    pad: util.pad
  },
  mounted () {
    this.updateTime()
  },
  watch: {
    time: {
      deep: true,
      handler (v) {
        if (v.hour === -1 || v.minute === -1 || v.second === -1) {
          return
        }
        if (v.hour === this.viewValue.getHours() &&
          v.minute === this.viewValue.getMinutes() &&
          v.second === this.viewValue.getSeconds()) {
          return
        }
        if (!this.initialized) {
          this.initialized = true
          return
        }

        this.viewValue = util.setDate(this.viewValue, v)
        this.onPick()
      }
    },
    viewValue: {
      deep: true,
      handler (v) {
        this.updateTime(v)
      }
    },
    'picker.visible' (v) {
      if (!v) {
        this.updateTime()
      }
    }
  },
  computed: {
    minValue () {
      return this.picker.minValue ? this.picker.minValue.getTime() : -1
    },
    maxValue () {
      return this.picker.maxValue ? this.picker.maxValue.getTime() : -1
    },
    hours () {
      const max = 23
      const data = {
        max
      }

      for (let i = 0; i <= max; i++) {
        data[i] = this.validate({hour: i, minute: 0, second: 0})
      }

      return data
    },
    minutes () {
      const max = 59
      const data = {
        max
      }

      for (let i = 0; i <= max; i++) {
        data[i] = this.disabled.hour ? false : this.validate({
          hour: this.time.hour,
          minute: i,
          second: 0
        })
      }

      return data
    },
    seconds () {
      const max = 59
      const data = {
        max
      }

      for (let i = 0; i <= max; i++) {
        data[i] = (this.disabled.hour || this.disabled.minute) ? false : this.validate({
          hour: this.time.hour,
          minute: this.time.minute,
          second: i
        })
      }

      return data
    }
  },
  methods: {
    updateTime (value) {
      value = value || this.viewValue
      if (this.time.hour === value.getHours() &&
        this.time.minute === value.getMinutes() &&
        this.time.second === value.getSeconds()) {
        return
      }
      this.time.hour = value.getHours()
      this.time.minute = value.getMinutes()
      this.time.second = value.getSeconds()
    },
    onPick () {
      this.$emit('pick', {
        year: this.viewValue.getFullYear(),
        month: this.viewValue.getMonth(),
        date: this.viewValue.getDate(),
        hour: this.time.hour,
        minute: this.time.minute,
        second: this.time.second
      })
    },
    /**
     * 验证项是否可用
     * @param {Number} [newTime.hour]
     * @param {Number} [newTime.minute]
     * @param {Number} [newTime.second]
     * @return {boolean}
     */
    validate (newTime) {
      const value = util.setDate(this.viewValue, {
        ...this.time,
        ...newTime
      }).getTime()
      return (this.minValue === -1 || this.minValue <= value) && (this.maxValue === -1 || value <= this.maxValue)
    }
  },
  beforeDestroy () {
    this.updateTime()
  }
}
</script>
