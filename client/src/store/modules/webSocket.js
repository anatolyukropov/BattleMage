import Vue from 'vue';

export default {
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget;
            state.socket.isConnected = true;
        },
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false;
        },
        SOCKET_ONERROR(state, event) {
            console.error('SOCKET_ONERROR', state, event);
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, message) {
            state.socket.message = message;
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info('SOCKET_RECONNECT', state, count);
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        sendMessage: (context, message) => {
            Vue.prototype.$socket.send(message);
        },
    },
};
