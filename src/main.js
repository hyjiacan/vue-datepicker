import Vue from 'vue'
import App from './App.vue'

import DatePicker from './components/index'

Vue.use(DatePicker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
