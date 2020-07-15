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
    /*background: rgb(160,255,248);*/
    /*background: linear-gradient(126deg, rgba(160,255,248,0.19091386554621848) 4%, rgba(153,193,224,0.20211834733893552) 48%, rgba(0,141,170,0.21052170868347342) 100%);*/


}
</style>
