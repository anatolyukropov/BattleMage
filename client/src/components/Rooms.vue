<template>
    <div class="Rooms">
        <div class="tools">
            <h2 class="title">Присоединяйтесь к игре</h2>
            <base-button class="baseBtn" @click.native="$refs.modal.open()"
                >Создать игру</base-button
            >
            <base-button class="baseBtn">Присоединиться</base-button>
            <sweet-modal
                title="Выберите количество игроков"
                ref="modal"
                width="420"
            >
                <div class="modal_max-players-wrapper">
                    <span
                        @click="maxPlayers = $event.target.id"
                        class="modal_max-players"
                        v-for="index in 6"
                        :key="index"
                        :id="(index + 1).toString()"
                        >{{ index + 1 }}
                    </span>
                </div>

                <p class="modal_max-players_value">
                    Создать игру на {{ maxPlayers }}
                    {{ maxPlayers > 4 ? 'игроков' : 'игрока' }}
                </p>

                <base-button slot="button" @click.native="createRoom"
                    >Создать</base-button
                >
            </sweet-modal>
        </div>

        <div class="rooms-wrapper">
            <section
                class="room"
                v-for="room of rooms"
                :key="room.room_id"
                v-elevation="2"
            >
                <template v-if="typeof room.name === 'string'">
                    <span class="room__player"
                        >Игроков: 1/{{ room.maxplayers }}
                    </span>
                    <span>{{ room.name }}</span>
                </template>

                <template v-else>
                    <span class="room__player"
                        >Игроков: {{ room.name.length }}/{{ room.maxplayers }}
                    </span>
                    <span
                        class="room__player"
                        v-for="(player, index) of room.name"
                        :key="index"
                        >{{ player }}</span
                    >
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import baseButton from './uiComponencts/BaseBtn';
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'Rooms',
    components: { baseButton, SweetModal },
    data: function() {
        return {
            maxPlayers: 7,
            rooms: [],
            connectToRoom: Number,
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
        createRoom() {
            this.$refs.modal.close();
            this.$http.post('/rooms/', {
                maxPlayers: this.maxPlayers,
                userName: this.$store.state.Auth.user.userName,
            });
        },
    },
};
</script>

<style scoped>
.Rooms {
    border-radius: 4px;
    margin: 10px 10px 10px 100px;
    width: 55%;
    background-color: #ffffff;
    padding: 8px;
}

/*.title {
    font-family: CURSIVE;
    color: #616161;
    opacity: 0.8;
    text-shadow: #9e9e9e -2px 3px 5px;
}*/

.title {
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
    font-size: 30px;
    color: #616161;
    opacity: 0.9;

}

.tools {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.rooms-wrapper {

    width: 800px;
    margin: 100px auto;
}
.room {
    margin: 20px 0 20px 40px;
    padding: 2px 8px;
    min-height: 40px;
    line-height: 40px;
    width: max-content;
    border-radius: 10px;
    border: white solid 2px;
    box-shadow: 0 0 10px black;
    background-color: transparent;
}
.room__player {
    padding: 5px 10px;
    position: relative;
}
.room:hover {
    transition: background-color;
    transition-duration: 1s;
    background-color: #E3E4E6;
    cursor: pointer;
}

.sweet-content {
    text-align: center;
    margin: 0;
}
.modal_max-players-wrapper {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 32px;
    width: 100%;
    line-height: 32px;
    border-bottom: 1px solid #eaeaea;
    padding-left: 32px;
    padding-right: 64px;
}
.modal_max-players {
    margin-left: 10px;
    padding: 10px;
}
.modal_max-players:hover {
    cursor: pointer;
}
.modal_max-players_value {
    padding-top: 8px;
    text-align: center;
    height: 32px;
    width: 100%;
    line-height: 32px;
}
</style>
