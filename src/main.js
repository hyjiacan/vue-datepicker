import Vue from 'vue'
import App from './App.vue'

import DatePicker, {Picker} from './components/index'

Vue.component(DatePicker.name, DatePicker)
Vue.component(Picker.name, Picker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
