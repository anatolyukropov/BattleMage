<template>
    <div class="chat">
        <div class="message-container">
            <div class="message-wrapper">
                <p
                    class="message"
                    v-for="(message, index) of messageAll"
                    :key="index"
                >
                    <span class="message-from">{{ message.from }} </span>
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
            />
        </div>
    </div>
</template>

<script>
const autosize = require('autosize');

export default {
    name: 'HelloWorld',
    data: function() {
        return {
            msg: '',
            messageAll: [],
        };
    },
    mounted() {
        autosize(this.$refs.input);
        this.$options.sockets.onmessage = data => this.messageRecive(data);
    },
    methods: {
        messageSend() {
            this.$socket.send(this.msg);
            this.messageAll.push({ from: 'me: ', text: this.msg });
            this.msg = '';
        },
        messageRecive: function(data) {
            this.messageAll.push(JSON.parse(data.data));
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.chat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 30%;
}
.input-wrapper {
    background-color: #eeeeee;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    min-height: 90px;
    max-height: 150px;
}
.chat__input {
    padding-top: 10px;
    text-align: center;
    outline: 0;
    min-height: 36px;
    width: 80%;
    resize: none;
    max-height: 100px;
    overflow-y: hidden;
    overflow-x: hidden;
    border-radius: 6px;
    line-height: 1em;
    margin: 15px 0;
    word-wrap: break-word;
    box-sizing: border-box;
    white-space: normal;
    font-size: 20px;
    opacity: 1;
}
.chat__input:focus::placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
}
.message-wrapper {
    width: 100%;
}

.message-container {
    height: 100%;
    overflow-y: scroll;
}
.message {
    position: relative;
    margin: 0 30px;
    padding: 10px 0;
    line-height: 16px;
}
.message-from {
    color: darkblue;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
}
.message-text {
    font-size: 20px;
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
