<template>
    <div class="playArea"
         v-on:drop.prevent="dropCard()"
         v-on:dragover.prevent="dragHover($event)"
         v-on:dragenter.prevent
    >
        <div class="glow"><span class="fakery"></span></div>
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

.cardRow {

}

.playArea {

}

.glow {
    width: 98vw;
    height: 10vmin;
    border-radius: 2vmin;
    z-index: -1;
    position: absolute;
    overflow: hidden;
    text-align: center;
}

.fakery {
    background-color: blue;
    width: 30vmin;
    height: 30vmin;
    margin-top: -10vmin; /* (30-10)/2 */
    border-radius: 2vmin;
    background: radial-gradient(circle,
    rgba(227,51,128,1) 0%,
    rgba(227,51,128,1) 4.6%,
    rgba(120,98,209,1) 11.6%,
    rgba(148,187,233,1) 20.0%,
    rgba(148,187,233,0) 26.0%
    );
    /*background: radial-gradient(circle, blue 0%, red 100%);*/
    opacity: 50%;
    background-size: 15vw 15vw;
    background-position: center center;
    background-repeat: no-repeat;
    z-index: -10;
    display: inline-block;
    animation: glow 5s linear infinite both;
}

@keyframes glow {
    0% {
        transform: scale(0.2);
        opacity: 50%;
    }
    50% {
        transform: scale(25);
        opacity: 30%;
    }
    100% {
        transform: scale(10);
        opacity: 0;
    }
}
</style>
