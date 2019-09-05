<template>
    <div class="nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/Profile">Profile</router-link>
        <router-link class="nav__link" to="/Login">Login</router-link>
        <router-link class="nav__link" to="/Logout">Logout</router-link>
    </div>
</template>

<script>
export default {
    name: 'navBar',
}
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
    background-color: #FF6D00;
}
.nav__link {
    color: white;
    display: block;
    text-decoration: none;
    font-size: 18px;
    line-height: 3em;
    padding: 0 20px;
}
    .nav__link:hover {
        background-color: #E65100;
    }
.router-link-exact-active {
    background-color: #BF360C;
}
</style>
