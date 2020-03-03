import props from '../mixins/picker-props'
import range from '../mixins/picker-range'
import renderer from '../mixins/picker-renderer'
import types from '../../assets/script/types'
import formats from '../../assets/script/formats'
import util from '../../assets/script/util'

export default {
  name: 'DatePicker',
  mixins: [props, range, renderer],
  props: {
    value: {
      type: [Array, String, Number, Date],
      required: true
    },
    size: {
      type: String,
      default: 'small'
    },
    /**
     * 是否允许鼠标滚轮操作
     */
    mousewheel: {
      type: Boolean,
      default: true
    },
    /**
     * 用于设置一周的第一天量。0：星期天，1：星期一
     */
    weekStart: {
      type: Number,
      default: 0
    },
    // 仅在 range/!split 时有效
    toolbar: Boolean,
    visible: Boolean,
    readonly: Boolean,
    editable: Boolean,
    clearable: Boolean
  },
  data () {
    return {
      types,
      singleValue: util.format(new Date(), formats.date),
      isVisible: false
    }
  },
  mounted () {
    this.validate()
    this.updateValue(this.value)
    this.isVisible = this.visible
  },
  watch: {
    visible (v) {
      if (v === this.isVisible) {
        return
      }
      this.isVisible = v
    },
    isVisible (v) {
      // 在关闭时触发更新
      if (!v && this.range && !this.split) {
        this.commitChanges()
      }
      if (v !== this.visible) {
        this.$emit('update:visible', v)
      }
    },
    singleValue () {
      this.commitChanges()
    },
    value (v) {
      if (this.range) {
        if (util.equals(this.beginValue, v[0], this.finalFormat) && util.equals(this.endValue, v[1], this.finalFormat)) {
          return
        }
        this.updateRangeValue(v)
      } else if (!util.equals(this.formattedValue, v, this.finalFormat)) {
        this.updateSingleValue(v)
      }
    }
  },
  methods: {
    validate () {
      if (this.weekStart < 0 || this.weekStart > 6) {
        throw Error('week-start can only valued between 0 and 6')
      }
    },
    updateValue (value) {
      if (this.range) {
        this.updateRangeValue(value)
      } else {
        this.updateSingleValue(value)
      }
    },
    updateSingleValue (value) {
      this.singleValue = util.format(value, this.finalFormat)
    },
    clearValue () {
      // TODO 实现清除值
      console.warn('clearable: Not implementation yet')
    },
    commitChanges () {
      const oldValue = this.range ? this.value.map(v => util.format(v, this.finalFormat)) : util.format(this.value, this.finalFormat)
      const newValue = this.range ? this.formattedRangeValue : this.formattedValue

      if (this.range) {
        if (oldValue[0] === newValue[0] && oldValue[1] === newValue[1]) {
          return
        }
      } else if (oldValue === newValue) {
        return
      }

      this.$emit('input', newValue)
      this.$emit('change', {
        type: this.type,
        value: newValue
      }, oldValue)
    }
  },
  computed: {
    /**
     * 在不指定 format 时，使用默认值
     * @return {String}
     */
    finalFormat () {
      return this.format || formats[this.type]
    },
    formattedValue () {
      return util.format(this.singleValue, this.finalFormat)
    },
    allowEdit () {
      return this.editable && !this.readonly
    },
    singleLimit () {
      return [this.minValue, this.maxValue]
    },
    minValue () {
      return this.min ? util.parse(this.min, this.finalFormat).getTime() : 0
    },
    maxValue () {
      return this.max ? util.parse(this.max, this.finalFormat).getTime() : 0
    }
  }
}
