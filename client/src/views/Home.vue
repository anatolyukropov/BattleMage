<template>
    <div class="home">
        <rooms />
        <Chat></Chat>
    </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'
import Rooms from '@/components/Rooms.vue'

export default {
    name: 'home',
    components: {
        Chat,
        Rooms,
    },
}
</script>

<style>
.home {
    height: calc(100vh - 64px);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
}
</style>
