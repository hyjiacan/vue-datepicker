export default {
  props: {
    type: {
      type: String,
      default: 'date'
    },
    format: String,
    min: [Number, String, Date],
    max: [Number, String, Date],
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
    },
    toBody: {
      type: Boolean,
      default: true
    },
    popperClass: {
      type: String,
      default: ''
    },
    valueClass: {
      type: String,
      default: ''
    },
    // see https://popper.js.org/docs/v2/constructors/#options
    popperOptions: {
      type: Object,
      default: () => ({})
    },
    // 是否展示农历信息
    showLunar: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    showFestival: {
      type: Boolean,
      default: false
    },
    // 判断一个日期是否需要被标记，如果需要，
    // 则返回 string (表示 html)
    markFunction: {
      type: Function
    }
  }
}
