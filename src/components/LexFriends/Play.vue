<template>
    <div class="playArea"
         v-on:drop.prevent="dropCard()"
         v-on:dragover.prevent="dragHover($event)"
         v-on:dragenter.prevent
    >
        <transition-group class="cardRow" name="fade" tag="ul" >
            <li v-for="card in playCards" :id="card.id" :key="card.id"
                :class="{
            	hoveringRight: card.id==hoverId && hoverRight,
            	hoveringLeft: card.id==hoverId && !hoverRight
            }"
                draggable="true"
                v-on:dragstart="draw( card.id)"
                v-on:dragover.prevent="dragHover($event, card.id)"
                v-on:dragleave="dragLeave($event, card.id)"
            >
                <Card class="card" :="card" />
            </li>
        </transition-group>
    </div>
</template>
<script>
    import './playCards.css';
	import Card from "./Card.vue";
	import setupPlayCards from "./playCards";
	import * as g from '../../store/modules/lexGameConstants';

	export default {
		name: "Play",
		components: {Card},
		setup(props) {
			const playArea =  setupPlayCards(g.ZONE_PLAYER_PLAY);

			return playArea;
		}
	}
</script>

<style scoped>


.playArea {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: darkorange;
}
</style>
