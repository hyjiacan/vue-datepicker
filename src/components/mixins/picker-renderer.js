import RangeLayout from '../pickers/RangeLayout'
import Picker from '../pickers/Picker'
import PopperWrapper from '../comps/PopperWrapper'
import ClearButton from '../comps/ClearButton'

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
      if (this.clearable) {
        if (this.split && [this.types.SEASON, this.types.WEEK].indexOf(this.type) === -1) {
          // 分离选择
          slots.begin = () => [begin, this.renderClearButton(this.clearBeginValue)]
          slots.end = () => [end, this.renderClearButton(this.clearEndValue)]
        } else {
          // 合并选择
          slots.begin = () => begin
          slots.end = () => end
          slots.append = () => this.renderClearButton(this.clearRangeValue)
        }
      } else {
        slots.begin = () => begin
        slots.end = () => end
      }
      return this.h(RangeLayout, {
        props: {
          showClear: this.clearable
        },
        scopedSlots: slots,
        on: {
          clear: this.clearValue
        }
      })
    },
    renderClearButton (handler) {
      return this.h(ClearButton, {
        on: {
          clear: handler
        }
      })
    },
    renderInput (valueName) {
      return this.h('input', {
        attrs: {
          type: 'text',
          value: this[valueName],
          readonly: !this.allowEdit
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
          default: () => Array.isArray(content) ? content : [content],
          reference: () => {
            return [trigger]
          }
        }
      })
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
          clearable: this.clearable,
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
    renderWithSplit () {
      return this.renderLayout(
        this.renderPopper(
          this.renderPicker('beginValue', 'beginVisible', 'rangeBeginLimit'),
          this.renderInput('formattedBeginValue'),
          'beginVisible'
        ),
        this.renderPopper(
          this.renderPicker('endValue', 'endVisible', 'rangeEndLimit'),
          this.renderInput('formattedEndValue'),
          'endVisible'
        )
      )
    },
    renderWithoutSplit () {
      const content = [
        this.renderPicker('beginValue', 'isVisible', 'rangeBeginLimit', true),
        this.renderPicker('endValue', 'isVisible', 'rangeEndLimit', true)
      ]
      return this.renderPopper(
        content,
        this.renderLayout(
          this.renderInput('formattedBeginValue'),
          this.renderInput('formattedEndValue')
        ),
        'isVisible'
      )
    },
    // 针对季度与周单独渲染
    renderSpecialPicker () {
      return this.renderPopper(
        this.renderPicker('beginValue', 'isVisible', 'singleLimit'),
        this.renderLayout(
          this.renderInput('formattedBeginValue'),
          this.renderInput('formattedEndValue')
        ),
        'isVisible'
      )
    },
    // 渲染单个日期选择
    renderSinglePicker () {
      const content = [this.renderInput('formattedValue')]
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
    // 判断需要渲染哪成单个日期选择还是按范围选择
    renderComponent () {
      if (!this.isRange) {
        return this.renderSinglePicker()
      }

      if (this.type === this.types.WEEK || this.type === this.types.SEASON) {
        return this.renderSpecialPicker()
      }

      if (this.split) {
        return this.renderWithSplit()
      }

      return this.renderWithoutSplit()
    }
  },
  render (createElement, context) {
    this.h = createElement
    this.c = context

    const classes = [
      'date-picker',
      `date-picker--${this.type}`,
      `date-picker--${this.size}`
    ]

    if (this.isRange) {
      classes.push('date-picker--range')
    }

    if (this.split && [this.types.SEASON, this.types.WEEK].indexOf(this.type) === -1) {
      classes.push('date-picker--split')
    }

    if (this.clearable) {
      classes.push('date-picker--clearable')
    }

    return createElement('div', {
      attrs: {
        'class': classes.join(' ')
      }
    }, [this.renderComponent()])
  }
}
