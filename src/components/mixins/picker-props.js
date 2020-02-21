export default {
  props: {
    type: {
      type: String,
      default: 'date'
    },
    format: String,
    min: [Number, String, Date],
    max: [Number, String, Date]
  }
}
