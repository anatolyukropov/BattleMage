import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ws from 'vue-native-websocket';

Vue.use(ws, 'ws://localhost:4000', {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    format: 'json',
});

Vue.config.productionTip = false;
console.log(process.env.VUE_APP_API_DEV)
// настраиваем стандартный vue hhtp модуль для запросов апи
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.withCredentials = true;
Vue.prototype.$http.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_API_DEV
        : process.env.VUE_APP_API_PROD;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
