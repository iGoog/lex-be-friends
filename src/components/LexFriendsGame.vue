<!-- no scroll or double tap zoom with v-on:touchmove.stop.prevent v-on:touchstart.stop.prevent -->
<template>
<div id="lexFriends"
     v-on:touchmove.stop.prevent v-on:touchstart.stop.prevent
     v-on:drop.stop.prevent="playCard(g.ZONE_OUT_FIELD)" v-on:dragover.prevent v-on:dragenter.prevent
>
    <Title id="title"/>
    <Words id="words"/>
    <Score id="score"/>
    <ActionArea id="deck" />
    <Play id="play" v-on:drop.stop.prevent="playCard(g.ZONE_PLAYER_PLAY)" v-on:dragover.prevent v-on:dragenter.prevent />
    <Hand id="hand" v-on:drop.stop.prevent="playCard(g.ZONE_PLAYER_HAND)" v-on:dragover.prevent v-on:dragenter.prevent />
</div>
</template>
<script>

	function vh(v) {
		let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}
	window.onload = () => window.scroll(0,vh(5));


	import Title from "./LexFriends/Title.vue";
	import Score from "./LexFriends/Score.vue";
	import ActionArea from "./LexFriends/ActionArea.vue";
	import Play from "./LexFriends/Play.vue";
	import Hand from "./LexFriends/Hand.vue";
	import Words from "./LexFriends/Words.vue";
	import { useStore } from 'vuex';
	import * as g from '../store/modules/lexGameConstants';

	export default {
		name: "LexFriends.vue",
		components: {Words, Hand, Play, ActionArea, Score, Title},
        setup(props) {
	        const store = useStore();
            const playCard = (zone) => {
	            store.commit(g.COMMIT_DROP_CARD, zone);
	            if (zone === g.ZONE_OUT_FIELD) store.commit(g.COMMIT_PLACE_CARD);
            }
            return { playCard, g };
        }
	}
</script>
<style>
    body {
        margin: 5vh 0px 7vh 0px !important;
        background: rgb(0,0,0);
        background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,23,133,1) 10%, rgba(28,26,170,0.8015405991498161) 50%, rgba(0,23,133,1) 90%, rgba(0,0,0,1) 100%);
    }
</style>
<style scoped>
    #lexFriends {
        display: grid;
        width: 100vw;
        height: 88vh;
        grid-template-areas:
                "title score"
                "words score"
                "deck  deck"
                "play  play"
                "hand  hand";
        grid-template-rows: 1fr 8fr 2fr 2fr 2fr;
        grid-template-columns: 3fr 1fr;

    }
    #title {
        grid-area: title;
    }
    #score {
        grid-area: score;
    }
    #words {
        grid-area: words;
    }
    #deck {
        grid-area: deck;
    }
    #play {
        grid-area: play;
    }
    #hand {
        grid-area: hand;
    }

</style>
