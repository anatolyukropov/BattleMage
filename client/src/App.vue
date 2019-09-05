<template>
    <div id="app">
        <navBar />
        <router-view />
    </div>
</template>

<script>
import navBar from './components/navBar'
export default {
    components: { navBar },
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
</style>
