<template>
    <div class="chat">
        <div class="message-wrapper">

        </div>
        <div class="input-wrapper">
            <textarea
                ref="input"
                @keydown.enter="sendMessage"
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
        }
    },
    mounted() {
        autosize(this.$refs.input)
    },
    methods: {
        sendMessage() {
            this.$socket.send(this.msg);
            this.msg = ''
        },
    },
}
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
    overflow-y: auto;
}
.chat__input {
    padding-top: 10px;
    text-align: center;
    outline: 0;
    min-height: 36px;
    width: 80%;
    resize: none;
    max-height: 200px;
    overflow-y: auto;
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
</style>
