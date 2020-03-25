import RangeLayout from '../pickers/RangeLayout'
import Picker from '../pickers/Picker'
import PopperWrapper from '../comps/PopperWrapper'
import ClearButton from '../comps/ClearButton'
import Shortcuts from '../comps/Shortcuts'

export default {
  components: {RangeLayout, Picker, PopperWrapper},
  data () {
    return {
      h: null,
      c: null
    }
  },
  methods: {
    renderLayout (begin, end) {
      const slots = {}
      let prependContent
      let appendContent

      if (this.clearable) {
        appendContent = this.renderClearButton(this.clearRangeValue)
      }
      if (this.isIconVisible) {
        prependContent = this.renderIcon()
      }

      slots.begin = () => [begin]
      slots.end = () => [end]
      if (prependContent) {
        slots.prepend = () => prependContent
      }
      if (appendContent) {
        slots.append = () => appendContent
      }

      return this.h(RangeLayout, {
        props: {
          showClear: this.isClearVisible
        },
        scopedSlots: slots
      })
    },
    renderClearButton (handler) {
      return this.h(ClearButton, {
        on: {
          clear: handler
        }
      })
    },
    /**
     * 渲染 input 输入框
     * @param {string} valueName
     * @param {string} [placeholder]
     * @return {*|void}
     */
    renderInput (valueName, placeholder) {
      return this.h('input', {
        attrs: {
          type: 'text',
          value: this[valueName],
          readonly: !this.allowEdit,
          placeholder
        },
        on: {
          input: e => {
            this[valueName] = e.target.value
          }
        }
      })
    },
    /**
     *
     * @param {Object}content
     * @param {Object}trigger
     * @param {String}visibleName
     * @return {*}
     */
    renderPopper (content, trigger, visibleName) {
      const h = this.h

      const slots = Array.isArray(content) ? content : [content]

      if (this.$slots.shortcut || this.shortcuts.length) {
        slots.unshift(this.renderShortcuts(this.$slots.shortcut))
      }

      return h(PopperWrapper, {
        props: {
          visible: this[visibleName]
        },
        on: {
          toggle: visible => {
            this[visibleName] = visible
          }
        },
        scopedSlots: {
          default: () => slots,
          reference: () => {
            return [trigger]
          }
        }
      })
    },
    renderShortcuts (content) {
      content = content || []

      return this.h(Shortcuts, {
        props: {
          data: this.shortcuts
        },
        on: {
          change: ({value}) => {
            this.updateValue(value)
          }
        }
      }, Array.isArray(content) ? content : [content])
    },
    renderPicker (valueName, visibleName, limitName, doNotAutoClose) {
      const h = this.h
      return h(Picker, {
        props: {
          format: this.finalFormat,
          value: this[valueName],
          editable: this.editable,
          type: this.type,
          readonly: this.readonly,
          size: this.size,
          min: this[limitName][0],
          max: this[limitName][1],
          visible: this[visibleName],
          mousewheel: this.mousewheel,
          weekStart: this.weekStart
        },
        on: {
          input: (value) => {
            this[valueName] = value
          },
          change: () => {
            if (doNotAutoClose || this.type === this.types.DATETIME || this.type === this.types.TIME) {
              return
            }
            this[visibleName] = false
          }
        }
      })
    },
    renderRange () {
      const content = [
        this.renderPicker('beginValue', 'isVisible', 'rangeBeginLimit', true),
        this.renderPicker('endValue', 'isVisible', 'rangeEndLimit', true)
      ]
      return this.renderPopper(
        content,
        this.renderLayout(
          this.renderInput('formattedBeginValue', this.placeholderBeginText),
          this.renderInput('formattedEndValue', this.placeholderEndText)
        ),
        'isVisible'
      )
    },
    // 针对季度与周单独渲染
    renderSpecialPicker () {
      return this.renderPopper(
        this.renderPicker('beginValue', 'isVisible', 'singleLimit'),
        this.renderLayout(
          this.renderInput('formattedBeginValue', this.placeholderText),
          this.renderInput('formattedEndValue')
        ),
        'isVisible'
      )
    },
    // 渲染单个日期选择
    renderSinglePicker () {
      const content = [this.renderInput('formattedValue', this.placeholderText)]
      if (this.isIconVisible) {
        content.unshift(this.renderIcon())
      }
      if (this.clearable) {
        content.push(this.renderClearButton(this.clearSingleValue))
      }
      return this.renderPopper(
        this.renderPicker('singleValue', 'isVisible', 'singleLimit'),
        this.h('div',
          {
            attrs: {
              'class': 'date-picker--container'
            }
          },
          content),
        'isVisible'
      )
    },
    renderIcon () {
      return this.h('span', {
        attrs: {
          'class': 'date-picker--icon datepicker-iconfont'
        }
      })
    },
    // 判断需要渲染哪成单个日期选择还是按范围选择
    renderComponent () {
      if (!this.isRange) {
        return this.renderSinglePicker()
      }

      if (this.type === this.types.WEEK || this.type === this.types.SEASON) {
        return this.renderSpecialPicker()
      }

      return this.renderRange()
    }
  },
  render (createElement, context) {
    this.h = createElement
    this.c = context

    const content = [this.renderComponent()]

    return createElement('div', {
      'class': {
        'date-picker': true,
        [`date-picker--${this.type}`]: true,
        [`date-picker--${this.size}`]: true,
        'date-picker--range': this.isRange,
        'date-picker--clearable': this.clearable,
        'date-picker--show-icon': this.isIconVisible,
        'date-picker--empty': this.isEmpty
      }
    }, content)
  }
}
