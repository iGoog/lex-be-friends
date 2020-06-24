<template>
<div id="lexFriends">
    <Title id="title"/>
    <Words id="words"/>
    <Score id="score"/>
    <Deck id="deck"/>
    <Play id="play"/>
    <Hand id="hand"/>
</div>

</template>
<script>
	import Title from "./LexFriends/Title.vue";
	import Score from "./LexFriends/Score.vue";
	import Deck from "./LexFriends/Deck.vue";
	import Play from "./LexFriends/Play.vue";
	import Hand from "./LexFriends/Hand.vue";
	import Words from "./LexFriends/Words.vue";
	export default {
		name: "LexFriends.vue",
		components: {Words, Hand, Play, Deck, Score, Title}
	}
</script>

<style scoped>
    #lexFriends {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-areas:
                "title score"
                "words score"
                "deck  deck"
                "play  play"
                "hand  hand";
        grid-template-rows: 1fr 8fr 2fr 2fr 3fr;
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
