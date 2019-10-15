<template>
    <div class="chat">
        <div class="message-container">
            <div class="message-wrapper">
                <p
                    class="message"
                    v-for="(message, index) of messageAll"
                    :key="index"
                >
                    <span class="message-from" @click="messageTO"
                        >{{ message.from }}
                    </span>
                    <span class="message-text">{{ message.text }}</span>
                </p>
            </div>
        </div>
        <div class="input-wrapper">
            <textarea
                ref="input"
                @keydown.enter.prevent="messageSend"
                class="chat__input"
                type="text"
                v-model="msg"
                name="text"
                placeholder="введите сообщение"
                v-elevation="1"
            />
        </div>
    </div>
</template>

<script>
const autosize = require('autosize');
import { mapState } from 'vuex';

export default {
    name: 'HelloWorld',
    data: function() {
        return {
            msg: '',
            messageAll: [],
        };
    },
    async mounted() {
        autosize(this.$refs.input);
        this.$options.sockets.onmessage = data => this.messageRecive(data);
    },
    computed: {
        ...mapState({
            user: state => state.Auth.user.userName,
            wsStatus: state => state.webSocket.socket.isConnected,
        }),
    },
    methods: {
        messageTO(e) {
            this.msg =
                'to ' +
                e.target.innerHTML.substring(0, e.target.innerHTML.length - 1) +
                ':';
        },
        messageSend() {
            if (this.wsStatus && this.msg.length >= 1) {
                this.$socket.send(this.msg);
                this.messageAll.push({
                    from: this.user+':' || 'Вы',
                    text: this.msg,
                });
                this.msg = '';
            }
        },
        messageRecive: function(data) {
            this.messageAll.push(JSON.parse(data.data));
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
    border-radius: 4px;
    margin: 10px 100px 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 30%;
    background-color: #ffffff;
}
.input-wrapper {
    background-color: #fafbfc;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    min-height: 62px;
    max-height: 150px;
    padding-left: 26px;
    padding-right: 0px;
    border-top: 0;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
}
.chat__input {
    padding: 9px 0 10px 0;
    text-align: center;
    outline: 0;
    max-height: 36px;
    width: 80%;
    resize: none;
    overflow-y: hidden;
    overflow-x: hidden;
    border-radius: 6px;
    line-height: 1em;
    margin: 15px 0;
    word-wrap: break-word;
    box-sizing: border-box;
    white-space: normal;
    font-size: 13px;
    opacity: 1;
}
.chat__input:focus::placeholder {
    opacity: 0;
    font-size: 9px;
    font-family: 'Raleway';
    transition: opacity 0.3s ease;
    padding-bottom: 10px;
}
.message-wrapper {
    width: 100%;
}

.message-container {
    height: 100%;
    overflow-y: auto;
}
.message {
    position: relative;
    margin: 10px 30px;
    padding: 10px 0;
    line-height: 13px;
    font-size: 13px;
    font-weight: 400;
    font-family: 'Raleway', sans-serif;
    color: #000;
}
.message-from {
    color: #42648b;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    font-size: 15px;
    width: 100%;
}
.message-text {
    font-size: 14px;
    font-weight: 500;
    word-wrap: break-word;
}
/*.message:after {*/
/*content: ' ';*/
/*display: block;*/
/*height: 1px;*/
/*position: absolute;*/
/*bottom: 0;*/
/*left: 0;*/
/*min-width: 100%;*/
/*background-color: #FFB300;*/
/*}*/
</style>
