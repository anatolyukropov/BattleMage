<template>
    <div id="app">
        <navBar />
        <router-view />
    </div>
</template>

<script>
import navBar from './components/navBar';
export default {
    components: { navBar },
    created() {
        if (localStorage.getItem('isLoggedIn')) {
            this.$store.commit('auth', {
                isLoggedIn: localStorage.getItem('isLoggedIn'),
            });
            if (localStorage.getItem('userName')) {
                this.$store.commit('setUser', localStorage.getItem('userName'))
            } else {
                this.$store.commit('auth', {
                    isLoggedIn: false,
                });
            }
        }
    },
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
</style>
