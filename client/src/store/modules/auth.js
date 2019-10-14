import axios from 'axios';
import API from '../../api';

export default {
    state: {
        isLoggedIn: false,
        user: {
            userName: '',
        },
    },
    mutations: {
        auth(state, { isLoggedIn }) {
            state.isLoggedIn = JSON.parse(isLoggedIn);
            localStorage.setItem('isLoggedIn', isLoggedIn);
        },
        setUser(state, user) {
            state.user.userName = user;
            localStorage.setItem('userName', user);
        },
    },
    actions: {
        /*logIn: function({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/login`, { username, password })
                    .then(function(response) {
                        if (response.data.success) {
                            //устанавливаем токен в Локальное хранилище
                            commit('auth', { isLoggedIn: true });
                            commit('setUser', response.data.username);
                        }
                        resolve(response);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },*/
        /*logOut: function({ commit }) {
            axios.delete('/logOut');
            commit('auth', { isLoggedIn: false });
            commit('setUser', '');
            return;
        },*/
        logIn: ({ commit }, data) => {
            return new Promise(async resolve => {
                let response = await API.auth.logIn(data);
                if (response.success) {
                    //устанавливаем токен в Локальное хранилище
                    commit('auth', { isLoggedIn: true });
                    commit('setUser', response.username);
                }
                resolve(response);
            });
        },
        logOut: ({ commit }) => {
            API.auth.logOut();
            commit('auth', { isLoggedIn: false });
            commit('setUser', '');
            return;
        },
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
    },
};
