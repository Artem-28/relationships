import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as vuedraggable from "vuedraggable";
import drag from "v-drag"

Vue.use(drag);
Vue.config.productionTip = false
Vue.use(vuedraggable)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
