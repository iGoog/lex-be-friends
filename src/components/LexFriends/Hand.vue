<template>
    <div class="handArea"
         v-on:drop.prevent="dropCard($event)"
         v-on:dragover.prevent="dragHover($event)"
         v-on:dragenter.prevent
    >
    <transition-group class="cardRow" name="fade" tag="ul" >
        <li v-for="card in playCards" :id="card.id" :key="card.id" class="card"
            :class="{
            	hoveringRight: card.id==hoverId && hoverRight,
            	hoveringLeft: card.id==hoverId && !hoverRight
            }"
            draggable="true" v-on:dragstart="draw( card.id)"
            v-on:dragover.prevent="dragHover($event, card.id)"
            v-on:dragleave="dragLeave($event, card.id)"

            v-on:touchstart="fakedrag('dragstart', $event)"
            v-on:touchmove="fakedrag( 'dragover', $event)"
            v-on:touchend="fakedrag('drop', $event)"
            v-on:touchcancel="fakedrag('drop', $event)"
        >
            <Card :="card" :hide="demo" />
        </li>
    </transition-group>
    </div>
</template>
<script>
	import './playCards.css';
	import Card from "./Card.vue";
	import setupPlayCards from "./playCards";
	import * as g from '../../store/modules/lexGameConstants';
	import {ref} from 'vue';

	export default {
		name: "Hand",
		components: {Card},
		setup(props) {
			const playArea =  setupPlayCards(g.ZONE_PLAYER_HAND);
			const demo = ref(true);
			setTimeout(()=> demo.value = false, 1000 );

			return {...playArea, demo };
		}
	}
</script>

<style scoped>
    .aroundCard {
        width: 30px;
    }

    .handArea {
        background-color: silver;
        width: 100%;
        height: 100%;
    }


</style>
