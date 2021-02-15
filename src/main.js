import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from "axios"
import VueAxios from "vue-axios"
import router from './router'

axios.defaults.headers.common["x-rapidapi-key"] = process.env.VUE_APP_API_KEY
axios.defaults.headers.common["x-rapidapi-host"] = process.env.VUE_APP_API_HOST
axios.defaults.headers.common["useQueryString"] = true
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.config.productionTip = false

export const eventBus = new Vue();

Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

