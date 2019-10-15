import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import elevation from './directives/elevation'
import http from './api/axiosConfig'; //импортируем настроенный axios
require('./webSocket/wsStart'); //запускаем настроенный webSocket

Vue.directive('elevation', elevation);

Vue.config.productionTip = false;
// настраиваем стандартный vue hhtp модуль для запросов апи
/*Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.withCredentials = true;
Vue.prototype.$http.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_API_DEV
        : process.env.VUE_APP_API_PROD;
*/
Vue.prototype.$http = http;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
