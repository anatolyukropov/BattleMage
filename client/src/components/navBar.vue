<template>
    <div class="nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/Profile" v-if="isLoggedIn"
            >Profile</router-link
        >
        <router-link v-if="!isLoggedIn" class="nav__link" to="/register"
            >Register</router-link
        >
        <button v-if="!isLoggedIn" class="nav__link" @click="login">
            Login
        </button>
        <button v-if="isLoggedIn" class="nav__link" @click="logout">
            Logout
        </button>
    </div>
</template>

<script>
export default {
    name: 'navBar',
    data: function() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') || false,
        };
    },
    methods: {
        async login() {
            try {
                await this.$http.post('/login', {
                    username: 'test',
                    password: '123',
                });
                localStorage.setItem('isLoggedIn', true);
                this.isLoggedIn = true;
            } catch (e) {
                alert(e.response.data.msg);
            }
        },
        logout() {
            this.$http.delete('/logOut');
            localStorage.setItem('isLoggedIn', false);
            this.isLoggedIn = false;
        },
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.nav {
    min-height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-end;
    background-color: #ff6d00;
}
.nav__link {
    color: white;
    display: block;
    text-decoration: none;
    line-height: 60px !important;
    padding: 0 20px;
    outline: 0;
    border: none;
    background-color: transparent;
    font: 400 18px Arial;
}
.nav__link:hover {
    background-color: #e65100;
}
.router-link-exact-active {
    background-color: #bf360c;
}
</style>
