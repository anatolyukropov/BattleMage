<template>
    <div class="Rooms">
        <h1 class="title">Присоединяйтесь к игре</h1>
        <section class="room" v-for="room of rooms" :key="room.room_id">
            <span class="room__player"
                >Игроков: {{ room.name.length }}/{{ room.maxplayers }}
            </span>
            <span
                class="room__player"
                v-for="(player, index) of room.name"
                :key="index"
                >{{ player }}</span
            >
        </section>
    </div>
</template>

<script>
export default {
    name: 'Rooms',
    data: function() {
        return {
            rooms: [],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            let rooms = await this.$http.get('/rooms');
            this.rooms = rooms.data.response.reduce(this.reducer, []);
        },
        reducer(a, b, index) {
            // эта функция преобразовывает arr вида [{maxplayer : 4, name : 'test', room_id: 1}, {maxplayer : 4, name : 'test1', room_id: 1} ]
            // в arr вида [{maxplayer : 4, name : ['test', 'test1'], room_id: 1}]
            // то есть собирает все объекты с одним room_id в единый объект
            if (index != 0 && a[a.length - 1].room_id === b.room_id) {
                if (typeof a[a.length - 1].name == 'string') {
                    a[a.length - 1].name = [a[a.length - 1].name];
                }
                a[a.length - 1].name.push(b.name);
                return a;
            }
            a.push(b);
            return a;
        },
    },
};
</script>

<style scoped>
.Rooms {
    width: 70%;
    background-color: #eeff41;
}
.room {
    margin: 20px 0 20px 40px;
    min-height: 40px;
    line-height: 40px;
    width: max-content;
    border-radius: 10px;
    border: white solid 2px;
    box-shadow: 0 0 10px black;
    background-color: #e0e0e0;
}
.room__player {
    padding: 5px 10px;
    position: relative;
}
.room:hover {
    transition: background-color;
    transition-duration: 1s;
    background-color: #eeff41;
    cursor: pointer;
}
.title {
    text-align: center;
}
</style>
