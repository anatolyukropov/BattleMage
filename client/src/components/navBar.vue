<template>
    <div class="nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/Profile" v-if="isLoggedIn"
            >Profile</router-link
        >
        <router-link v-if="!isLoggedIn" class="nav__link" to="/register"
            >Register</router-link
        >
        <router-link v-if="!isLoggedIn" class="nav__link" to="/login">
            Login
        </router-link>
        <button v-if="isLoggedIn" class="nav__link" @click="logOut">
            Logout
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'navBar',
    data: function() {
        return {};
    },
    // смешиваем результат mapState с внешним объектом
    computed: {
        ...mapState({
            isLoggedIn: state => state.Auth.isLoggedIn,
        }),
    },
    methods: {
        ...mapActions(['logOut']),
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
    background-color: #0277BD;
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
    background-color: #01579B;
}
.router-link-exact-active {
    background-color: #01579B;
}
.nav__link:focus {
    background-color: #01579B
}
</style>
