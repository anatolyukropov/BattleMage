<template>
    <div class="nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/Profile">Profile</router-link>
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
            isLoggedIn: false,
        };
    },
    methods: {
        async login() {
            let rez = await this.$http.post('/login');
            if (rez.data.status === 'OK') this.isLoggedIn = true;
        },
        logout() {
            this.$http.delete('/logout');
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
    font-size: 18px;
    line-height: 3em;
    padding: 0 20px;
    outline: 0;
    border: none;
    background-color: transparent;
}
.nav__link:hover {
    background-color: #e65100;
}
.router-link-exact-active {
    background-color: #bf360c;
}
</style>
