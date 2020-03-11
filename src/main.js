import Vue from 'vue'
import App from './App.vue'

import DatePicker from './components/index'

Vue.component(DatePicker.name, DatePicker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
