import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// настраиваем стандартный vue hhtp модуль для запросов апи
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.withCredentials = true
Vue.prototype.$http.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_API_DEV
        : process.env.VUE_APP_API_PROD

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
