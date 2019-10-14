import Notifications from 'vue-notification';
import Vue from 'vue';

Vue.use(Notifications);
Vue.notify({ duration: 4000 });

export default {
    error: error => {
        Vue.notify({ type: 'error', title: 'Ошибка', text: error });
    },
    success: message => {
        Vue.notify({ type: 'success', title: 'Успешно', text: message });
    },
};
