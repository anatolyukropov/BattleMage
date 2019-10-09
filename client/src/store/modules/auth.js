import axios from 'axios';

export default {
    state: {
        user: {},
    },
    mutations: {
        auth_success(state, { user }) {
            state.user = user;
            localStorage.setItem('isLoggedIn', token);
        }
    },
    actions: {

    },
    getters: {
        isLoggedIn: state => !!state.token,
        authState: state => state.status,
        USER: state => state.user,
    },
};
