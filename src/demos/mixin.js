import DatePicker from '@/components/index'

export default {
  data() {
    return {
      weekStart: 6,
      year: '2020',
      month: '2020-01',
      date: '',
      time: '12:15',
      datetime: '2020-01-01 12:15',
      ryear: ['2020', '2022'],
      rquarter: ['2020-01-12'],
      rmonth: ['2020-01-12', '2022-10-12'],
      rweek: ['2020-01-01'],
      rdate: ['2020-01-01', '2022-10-01'],
      rtime: ['12:15', '20:30'],
      rdatetime: ['2020-01-01 12:15', '2022-10-01 20:30']
    }
  },
  methods: {
    getFixedDate() {
      return DatePicker.util.getDate()
    }
  }
}
