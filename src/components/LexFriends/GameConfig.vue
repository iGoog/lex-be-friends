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
</template>


<script>
    /*
    players : [
			{ emojii: '🏴‍☠️', name: '', turnOrder: 1, active: true, cards: 10, points: 0, id: '', sharedSecret: '', ready: false, watching: false}
		],
     */
	import PopoverShade from "../popover/PopoverShade.vue";
	import Popover from "../popover/Popover.vue";
	import * as doomii from "../emojii/Doomie.constants";
	import { DISPATCH_SET_USER } from "../../store/modules/lexGameConstants";

    import {useStore} from 'vuex';
	import {ref, computed} from 'vue';
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
	        const showAPrompt = computed( () => promptUser.value );
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

            return {promptUser, userName, showAPrompt, emojii, doomii,
	            clickSelectEmojii, clickNameOkButton, isSelected
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


</style>
<style>

</style>
