<template>
    <div class="wrapper">
        <div class="form">
            <title>Registration</title>
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
            <br />
            <base-input
                class="input"
                typeProp="password"
                placeholderProp="confirm password"
                sizeProp="30"
                v-model="confirmPassword"
            ></base-input>
            <submit-btn class="sub-btn" @click.native="register"
                >Submit</submit-btn
            >
        </div>
    </div>
</template>

<script>
import baseInput from '../components/uiComponencts/BaseInput';
import submitBtn from '../components/uiComponencts/SubmitBtn';
export default {
    name: 'Register',
    components: { baseInput, submitBtn },
    data: function() {
        return {
            username: String,
            password: String,
            confirmPassword: String,
        };
    },
    methods: {
        register() {
            if (this.password !== this.confirmPassword) {
                alert('password do not match');
                return;
            }
            this.$http
                .post('/register', {
                    username: this.username,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                })
                .then(() => {
                    this.$router.push('/login');
                })
                .catch(error => alert(error.response.data.msg));
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
}
.input {
    height: 50px;
}
</style>
