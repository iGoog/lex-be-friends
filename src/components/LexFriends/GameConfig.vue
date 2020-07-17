<template>
    <PopoverShade :show="showAPrompt"></PopoverShade>
    <Popover :show="promptUser"  >
        <h1>Enter your name</h1>
        <h1><input class="fatInput" v-model="userName" /></h1>
        <h1>&amp; choose your emojii</h1>
        <h1>
            <Doomii :selectable="true" class="selectEmojii" v-for="(val, name) in doomii" :doom="val"
                    :isSelected="isSelected(val)"
                    @click="clickSelectEmojii(val)"/>
        </h1>
        <p><button type="submit" @click="clickNameOkButton()">ok</button></p>
    </Popover>
    <Popover :show="waitingRoom" :col-spread="true">
            <div class="waitingArea">
                <div class="player"  v-for="player in players">
                   {{statusChar(player)}} <Doomii :doom="player.emojii" /> {{player.name}}
                </div>
            </div>
            <div class="waitingAreaButtons">
<!--                <button type="button" @click="clickJustWatch()">Just Watch</button>-->
                <div></div>
                <button type="button" @click="clickReady()">Ready</button>
            </div>
    </Popover>
</template>


<script>
	import PopoverShade from "../popover/PopoverShade.vue";
	import Popover from "../popover/Popover.vue";
	import * as doomii from "../emojii/Doomie.constants";
	import { DISPATCH_SET_USER } from "../../store/modules/lexGameConstants";

    import {useStore} from 'vuex';
	import {ref, computed, reactive} from 'vue';
    import Doomii from "../emojii/Doomii.vue";

	export default {
		name: "GameConfig",
		components: {Doomii, Popover, PopoverShade},
        setup(props) {
			const store = useStore();
	        const state = store.state.lexGame;
	        if (state.players.length <= 0 ) throw new Error('Expected there to be at least one player');
	        const user = state.players[0];

	        const promptUser = computed(()=> user.name=='');
	        const waitingRoom = computed(()=> (!promptUser.value && !state.mode.gameLaunched ) );
	        const statusChar = ({ready=false, watching=false}={})=> ready ? '✅' : watching ? '👀' : '❌';

	        const showAPrompt = computed( () => (promptUser.value || waitingRoom.value) );
	        const userName = ref('');
	        const emojii = ref('');

	        const clickNameOkButton = () => {
		        store.dispatch(DISPATCH_SET_USER, {name: userName.value, emojii: emojii.value});
            }
            const clickSelectEmojii = (mojii) => {
	        	emojii.value = mojii;
            }
            const isSelected = (val) => {
	        	return val == emojii.value;
            }
	        const players =  reactive(state.players);

	        const clickReady = () => {
		        store.dispatch('lexGame/setReadyForGame');
            }

            const clickJustWatch = () => {
	            store.dispatch('lexGame/setWatchGame');
            }

            return {promptUser, userName, showAPrompt, emojii, doomii,
	            clickSelectEmojii, clickNameOkButton, isSelected, waitingRoom, players, statusChar,
	            clickReady, clickJustWatch
	        }
        }
	}
</script>

<style scoped>
    .fatInput {
        width: 24vw;
        text-align: center;
        font-size: 4vmin;

    }
    h1 {
        font-size: 4vmin;
    }
    button {
        font-size: 4vmin;
    }
    .waitingArea {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        text-align: left;
        padding: 0.5vmin;
    }
    .player {
        font-size: 3vmin;
        white-space: nowrap;
        border-radius: 1vmin;
        padding: 0.2vmin;
    }
    .waitingAreaButtons {
        display: flex;
        justify-content: space-between;
    }


</style>
<style>


</style>
