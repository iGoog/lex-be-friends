<template>
    <div class="scoreArea">
        <div class="player"  v-for="{points, emojii, name, active} in players"
             :class="{active}">
            {{points}} <Doomii :doom="emojii" /> {{name}}
        </div>
    </div>
</template>

<script>
	import {useStore} from "vuex";
	import {reactive} from 'vue';
	import Doomii from "../emojii/Doomii.vue";

	export default {
		name: "Score",
		components: {Doomii},
		setup(props) {
			const store = useStore();
			const moduleState = store.state.lexGame;
			const players =  reactive(moduleState.players);
			return { players };
		}
	}
</script>

<style scoped>
.scoreArea {
    /*background-color: burlywood;*/
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    text-align: left;
    padding: 0.5vmin;
    border: solid;
    border-radius: 2vmin;
}
.player {
    font-size: 3vmin;
    white-space: nowrap;
    border-radius: 1vmin;
    padding: 0.2vmin;
}
.active {
    background: rgb(217,227,51);
    background: linear-gradient(25deg, rgba(217,227,51,0.45840342973126746) 4%, rgba(227,51,128,0.45840342973126746) 28%, rgba(98,121,209,0.3351541300113795) 45%, rgba(148,187,233,0.06204480083048847) 77%);
}
</style>
