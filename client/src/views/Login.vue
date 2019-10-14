<template>
    <div class="wrapper">
        <div class="form">
            <title>LogIn</title>
            <base-input
                class="input"
                typeProp="text"
                placeholderProp="username"
                sizeProp="30"
                v-model="username"
            ></base-input>
            <br />
            <base-input
                class="input"
                typeProp="password"
                placeholderProp="password"
                sizeProp="30"
                v-model="password"
            ></base-input>
            <submit-btn class="sub-btn" @click.native="login()"
                >Submit</submit-btn
            >
        </div>
    </div>
</template>

<script>
import baseInput from '../components/uiComponencts/BaseInput';
import submitBtn from '../components/uiComponencts/SubmitBtn';

export default {
    name: 'Login',
    components: { baseInput, submitBtn },
    data: function() {
        return {
            username: String,
            password: String,
        };
    },
    methods: {
        login() {
            this.$store
                .dispatch('logIn', {
                    username: this.username,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push('/');
                });
        },
    },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
}
.form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-60px);
    padding: 20px;
}
.input {
    height: 50px;
}

@media only screen and (max-height: 600px) {
    .form {
        transform: translateY(0px);
    }
}
</style>
