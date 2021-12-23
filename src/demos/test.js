/* eslint-disable no-console */
import assert from 'assert'
import util from '@/assets/script/util'
import fixedDate from "@/assets/script/fixedDate";

class T {
  constructor(fn, obj) {
    this.fn = fn
    this.obj = obj || util
    this.args = []
  }

  with(...args) {
    this.args = args
    return this
  }

  expected(expected) {
    this.expected = expected
    return this
  }

  run() {
    console.debug('=============================')
    console.info('Test %s with option: %s', this.fn, JSON.stringify(this.args[1]))
    let value = this.obj[this.fn](...this.args)
    let expected
    if (typeof this.expected === 'function') {
      const temp = this.expected(value)
      value = temp.actual
      expected = temp.expected
    } else {
      expected = this.expected
    }
    try {
      assert.deepStrictEqual(value, expected)
      console.info('%cPassed%c %s',
        'background-color: green; color: white',
        'color: green;',
        JSON.stringify(value))
      return true
    } catch (e) {
      console.info('%cFailed%c\nExpected: %c%s\nActual: %c%s',
        'background-color: red; color: white',
        '',
        'font-weight: bold',
        JSON.stringify(expected),
        'color: orange',
        JSON.stringify(value))
      // if (!this.isDebugger) {
      //   this.isDebugger = true
      //   // eslint-disable-next-line
      //   debugger
      //   this.run()
      // }
      return false
    }
  }

  static use(fn, obj) {
    return new T(fn, obj)
  }
}

const tests = [
  T.use('getWeekOfYear').with(new Date('2020/01/04')).expected({
    year: 2020,
    week: 1
  }),
  T.use('getWeekOfYear').with(new Date('2020/01/05')).expected({
    year: 2020,
    week: 2
  }),
  T.use('getWeekOfYear').with(new Date('2020/02/01')).expected({
    year: 2020,
    week: 5
  }),
  T.use('getWeekOfYear').with(new Date('2020/02/02')).expected({
    year: 2020,
    week: 6
  }),

  T.use('getWeekOfMonth').with(new Date('2020/01/04')).expected({
    year: 2020,
    month: 0,
    week: 1
  }),
  T.use('getWeekOfMonth').with(new Date('2020/01/05')).expected({
    year: 2020,
    month: 0,
    week: 2
  }),
  T.use('getWeekOfMonth').with(new Date('2020/02/01')).expected({
    year: 2020,
    month: 1,
    week: 1
  }),
  T.use('getWeekOfMonth').with(new Date('2020/02/02')).expected({
    year: 2020,
    month: 1,
    week: 2
  }),

  T.use('getWeekOfMonth').with(new Date('2020/05/30'), {
    start: 6
  }).expected({
    year: 2020,
    month: 4,
    week: 6
  }),

  T.use('getWeekOfMonth').with([new Date('2020/05/30'), new Date('2020/06/05')], {
    start: 6
  }).expected({
    year: 2020,
    month: 5,
    week: 1
  }),

  T.use('setDate', fixedDate).with(new Date('2020/02/02 02:02:02').getTime()).expected(() => {
    const newDate = fixedDate.getDate()

    return {
      actual: {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate(),
        hour: newDate.getHours(),
        minute: newDate.getMinutes()
      },
      expected: {
        year: 2020,
        month: 1,
        date: 2,
        hour: 2,
        minute: 2
      }
    }
  })
]

function run() {
  console.clear()
  console.info('Test is running...')
  let pass = 0
  let fail = 0
  for (const test of tests) {
    if (test.run()) {
      pass++
    } else {
      fail++
    }
  }
  console.info('Test completed. %d in total, %c%d passed, %c%d failed',
    pass + fail, 'color: green', pass, fail ? 'color: red' : 'color: gray', fail)
}

export default {
  run
}
