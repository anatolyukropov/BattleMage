import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
import webSocket from './modules/webSocket';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        webSocket,
    },
});
