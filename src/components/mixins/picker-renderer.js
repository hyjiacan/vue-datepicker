import RangeLayout from '../pickers/RangeLayout'
import Picker from '../pickers/Picker'
import Popper from '../comps/Popper'
import ClearButton from '../comps/ClearButton'
import Shortcuts from '../comps/Shortcuts'

export default {
  components: {RangeLayout, Picker, Popper},
  data() {
    return {
      h: null,
      c: null,
      hideTimerHandle: -1
    }
  },
  computed: {
    valueSlot() {
      return this.$slots.value || this.$scopedSlots.value
    }
  },
  methods: {
    renderValueSlot() {
      if (!this.valueSlot) {
        return null
      }
      return this.$slots.value || this.$scopedSlots.value({
        type: this.type,
        format: this.finalFormat,
        value: this.value,
        visible: this.isVisible
      })
    },
    renderLayout(begin, end) {
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
    renderClearButton(handler) {
      return this.h(ClearButton, {
        on: {
          clear: () => {
            this._eventSrc = 'clear'
            this.isVisible = false
            handler()
          }
        }
      })
    },
    /**
     * 渲染 input 输入框
     * @param {string} valueName
     * @param {string} [placeholder]
     * @return {*|void}
     */
    renderInput(valueName, placeholder) {
      return this.h('span', {
        attrs: {
          class: 'date-picker--value-wrapper'
        }
      }, [this.h('input', {
        attrs: {
          type: 'text',
          value: this[valueName],
          readonly: !this.allowEdit,
          disabled: 'disabled',
          placeholder,
          tabindex: -1
        },
        on: {
          input: e => {
            this[valueName] = e.target.value
          }
        }
      })])
    },
    /**
     *
     * @param {Object}content
     * @param {Object}trigger
     * @return {*}
     */
    renderPopper(content, trigger) {
      const h = this.h

      const slots = Array.isArray(content) ? content : [content]

      if (this.$slots.shortcut || this.shortcuts.length) {
        slots.unshift(this.renderShortcuts(this.$slots.shortcut))
      }

      return h(Popper, {
        props: {
          visible: this.isVisible,
          popperClass: this.popperClass,
          valueClass: this.valueClass,
          toBody: this.toBody,
          options: this.popperOptions
        },
        ref: 'popper',
        on: {
          blur: this.onBlur
        },
        scopedSlots: {
          default: () => slots,
          reference: () => {
            return [trigger]
          },
          footer: () => this.$slots.footer
        }
      })
    },
    renderShortcuts(content) {
      const options = {
        props: {
          data: this.shortcuts
        },
        on: {
          change: ({value}) => {
            this._eventSrc = 'shortcut'
            this.updateValue(value)
          }
        }
      }

      if (content && content.length) {
        return this.h(Shortcuts, options, Array.isArray(content) ? content : [content])
      }

      return this.h(Shortcuts, options)
    },
    /**
     *
     * @param valueName
     * @param visibleName
     * @param limitName
     * @param {null|HTMLElement} titleSlot
     * @param {boolean} [doNotAutoClose=false]
     * @returns {*|void}
     */
    renderPicker(valueName, visibleName, limitName, titleSlot, doNotAutoClose) {
      const props = {
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
        weekStart: this.weekStart,
        showLunar: this.showLunar,
        showFestival: this.showFestival,
        markFunction: this.markFunction
      }
      if (this.highlightRange && this.isRange) {
        props.highlightRange = [this.beginValue, this.endValue]
      }
      const option = {
        props,
        on: {
          input: (value) => {
            this._eventSrc = 'picker'
            this[valueName] = value
          },
          change: () => {
            if (doNotAutoClose || this.type === this.types.DATETIME || this.type === this.types.TIME) {
              return
            }
            this[visibleName] = false
          }
        }
      }

      if (titleSlot) {
        option.scopedSlots = {
          title: () => titleSlot
        }
      }

      return this.h(Picker, option)
    },
    renderRange() {
      const content = [
        this.renderPicker('beginValue', 'isVisible', 'rangeBeginLimit', this.rangeBeginTitle, true),
        this.renderPicker('endValue', 'isVisible', 'rangeEndLimit', this.rangeEndTitle, true)
      ]
      return this.renderPopper(
        content,
        this.renderValueSlot() || this.renderLayout(
          this.renderInput('formattedBeginValue', this.placeholderBeginText),
          this.renderInput('formattedEndValue', this.placeholderEndText)
        )
      )
    },
    // 针对季度与周单独渲染
    renderSpecialPicker() {
      return this.renderPopper(
        this.renderPicker('beginValue', 'isVisible', 'singleLimit', this.singleTitle),
        this.renderValueSlot() || this.renderLayout(
          this.renderInput('formattedBeginValue', this.placeholderText),
          this.renderInput('formattedEndValue')
        )
      )
    },
    // 渲染单个日期选择
    renderSinglePicker() {
      const content = []
      if (!this.valueSlot) {
        content.push(this.renderInput('formattedValue', this.placeholderText))
        if (this.isIconVisible) {
          content.unshift(this.renderIcon())
        }
        if (this.clearable) {
          content.push(this.renderClearButton(this.clearSingleValue))
        }
      }
      return this.renderPopper(
        this.renderPicker('singleValue', 'isVisible', 'singleLimit', this.singleTitle),
        this.renderValueSlot() || this.h('div',
          {
            attrs: {
              'class': 'date-picker--container'
            }
          },
          content)
      )
    },
    renderIcon() {
      return this.h('span', {
        attrs: {
          'class': 'date-picker--icon datepicker-iconfont'
        }
      })
    },
    // 判断需要渲染哪成单个日期选择还是按范围选择
    renderComponent() {
      if (!this.isRange) {
        return this.renderSinglePicker()
      }

      if (this.type === this.types.WEEK || this.type === this.types.QUARTER) {
        return this.renderSpecialPicker()
      }

      return this.renderRange()
    }
  },
  render(createElement, context) {
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
        'date-picker--show-lunar': this.showLunar,
        'date-picker--empty': this.isEmpty,
        'date-picker--custom-render': this.valueSlot
      },
      attrs: {
        tabindex: '0',
        'datepicker-id': this.id
      },
      on: {
        focus: this.onFocus,
        blur: this.onBlur
      }
    }, content)
  }
}
