import ws from 'vue-native-websocket';
import Vue from 'vue';
import store from '../store';

export default Vue.use(ws, 'ws://10.98.16.42:4000', {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
    format: 'json',
    store: store,
});
