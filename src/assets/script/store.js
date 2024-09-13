const store = {
  get(date) {
    return localStorage.getItem(date) || ''
  },
  set(date, value) {
    if (value === null || value === undefined) {
      value = ''
    }
    localStorage.setItem(date, value.toString())
  }
}

export default store
