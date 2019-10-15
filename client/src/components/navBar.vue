<template>
    <div class="nav">
        <router-link class="nav__link" to="/">Главная</router-link>
        <router-link class="nav__link" to="/Profile" v-if="isLoggedIn"
            >Профиль</router-link
        >
        <router-link v-if="!isLoggedIn" class="nav__link" to="/register"
            >Регистрация</router-link
        >
        <router-link v-if="!isLoggedIn" class="nav__link" to="/login">
            Вход
        </router-link>
        <button v-if="isLoggedIn" class="nav__link" @click="logOut">
            Выход
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
    min-height: 41px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-end;
    background-color: #4a76a8;
}
.nav__link {
    color: white;
    display: block;
    line-height: 41px !important;
    text-decoration: none;
    padding: 0 20px;
    outline: 0;
    border: none;
    background-color: transparent;
    font: 400 18px Arial;
}
.nav__link:hover {
    background-color: #01579b;
}
.router-link-exact-active {
    background-color: #01579b;
}
.nav__link:focus {
    background-color: #01579b;
}
</style>
