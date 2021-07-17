/* eslint-disable no-console */
import assert from 'assert'
import util from '@/assets/script/util'

class T {
  constructor(fn) {
    this.fn = fn
  }

  with(date, option) {
    this.date = date
    this.option = option
    return this
  }

  expected(expected) {
    this.expected = expected
    return this
  }

  run() {
    console.debug('=============================')
    console.info('Test util.%s with option: %s', this.fn, JSON.stringify(this.option))
    const value = util[this.fn](this.date, this.option)
    try {
      assert.deepStrictEqual(value, this.expected)
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
        JSON.stringify(this.expected),
        'color: orange',
        JSON.stringify(value))
      if (!this.isDebugger) {
        this.isDebugger = true
        // eslint-disable-next-line
        debugger
        this.run()
      }
      return false
    }
  }

  static use(fn) {
    return new T(fn)
  }
}

const tests = [
  T.use('getWeekOfYear').with(new Date('2020-01-04')).expected({
    year: 2020,
    week: 1
  }),
  T.use('getWeekOfYear').with(new Date('2020-01-05')).expected({
    year: 2020,
    week: 2
  }),
  T.use('getWeekOfYear').with(new Date('2020-02-01')).expected({
    year: 2020,
    week: 5
  }),
  T.use('getWeekOfYear').with(new Date('2020-02-02')).expected({
    year: 2020,
    week: 6
  }),

  T.use('getWeekOfMonth').with(new Date('2020-01-04')).expected({
    year: 2020,
    month: 0,
    week: 1
  }),
  T.use('getWeekOfMonth').with(new Date('2020-01-05')).expected({
    year: 2020,
    month: 0,
    week: 2
  }),
  T.use('getWeekOfMonth').with(new Date('2020-02-01')).expected({
    year: 2020,
    month: 1,
    week: 1
  }),
  T.use('getWeekOfMonth').with(new Date('2020-02-02')).expected({
    year: 2020,
    month: 1,
    week: 2
  }),

  T.use('getWeekOfMonth').with(new Date('2020-05-30'), {
    start: 6
  }).expected({
    year: 2020,
    month: 4,
    week: 6
  }),

  T.use('getWeekOfMonth').with([new Date('2020-05-30'), new Date('2020-06-05')], {
    start: 6
  }).expected({
    year: 2020,
    month: 5,
    week: 1
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
