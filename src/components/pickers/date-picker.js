import props from '../mixins/picker-props'
import range from '../mixins/picker-range'
import renderer from '../mixins/picker-renderer'
import types from '../../assets/script/types'
import formats from '../../assets/script/formats'
import util from '../../assets/script/util'
import placeholders from '../../assets/script/placeholders'

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
      default: 'normal'
    },
    /**
     * 是否允许鼠标滚轮操作
     */
    mousewheel: {
      type: Boolean,
      default: true
    },
    visible: Boolean,
    readonly: Boolean,
    editable: Boolean,
    clearable: Boolean,
    shortcuts: {
      type: Array,
      default: () => []
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [String, Array]
    }
  },
  data() {
    return {
      types,
      singleValue: util.format(new Date(), formats.date),
      isVisible: false
    }
  },
  mounted() {
    this.validate()
    this.updateValue(this.value)
    this.isVisible = this.visible
  },
  watch: {
    visible(v) {
      if (v === this.isVisible) {
        return
      }
      this.isVisible = v
      this.$nextTick(() => {
        if (v) {
          this.$el.focus()
        } else {
          this.$el.blur()
        }
      })
    },
    isVisible(v) {
      // 在关闭时触发更新
      if (!v && this.isRange) {
        this.commitChanges()
      }
      if (v !== this.visible) {
        this.$emit('update:visible', v)
      }
      this.$nextTick(() => {
        if (v) {
          this.$el.focus()
        } else {
          this.$el.blur()
        }
      })
    },
    singleValue() {
      this.commitChanges()
    },
    value(v) {
      if (this.isRange) {
        if (util.equals(this.beginValue, v[0], this.finalFormat) && util.equals(this.endValue, v[1], this.finalFormat)) {
          return
        }
        this.updateRangeValue(v)
      } else if (!util.equals(this.formattedValue, v, this.finalFormat)) {
        this.updateSingleValue(v)
      }
    },
    type() {
      this.updateValue(this.value)
    }
  },
  methods: {
    validate() {
      if (this.weekStart < 0 || this.weekStart > 6) {
        throw Error('week-start can only valued between 0 and 6')
      }
    },
    updateValue(value) {
      if (this.isRange) {
        this.updateRangeValue(value)
      } else {
        this.updateSingleValue(value)
      }
    },
    updateSingleValue(value) {
      this.singleValue = value ? util.format(value, this.finalFormat) : value
    },
    commitChanges() {
      const oldValue = this.isRange ? this.value.map(v => v ? util.format(v, this.finalFormat) : v) : (this.value ? util.format(this.value, this.finalFormat) : this.value)
      const newValue = this.isRange ? this.formattedRangeValue : this.formattedValue

      if (this.isRange) {
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
    },
    clearSingleValue() {
      this.singleValue = ''
    }
  },
  computed: {
    /**
     * 在不指定 format 时，使用默认值
     * @return {String}
     */
    finalFormat() {
      return this.format || formats[this.type]
    },
    formattedValue() {
      return this.singleValue ? util.format(this.singleValue, this.finalFormat) : this.singleValue
    },
    allowEdit() {
      return this.editable && !this.readonly
    },
    singleLimit() {
      return [this.minValue, this.maxValue]
    },
    minValue() {
      return this.min ? util.parse(this.min, this.finalFormat).getTime() : 0
    },
    maxValue() {
      return this.max ? util.parse(this.max, this.finalFormat).getTime() : 0
    },
    isClearVisible() {
      return this.clearable && this.isEmpty
    },
    isEmpty() {
      return this.isRange ? this.value.every(v => !v) : !this.value
    },
    isIconVisible() {
      return !this.hideIcon
    },
    placeholderText() {
      if (this.placeholder) {
        return this.placeholder
      }
      return placeholders[this.type]
    },
    singleTitle() {
      return this.$slots.title
    }
  }
}
