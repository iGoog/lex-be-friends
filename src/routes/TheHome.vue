<template>
<div class="page">
    <div class="main zone">
        <h1>Ahoy Y'all! </h1>
        <p>Diversions await your miscreant crew.</p>
        <p>{{roomName}}</p>
    </div>
    <div class="games">
        <router-link class="zone" :to="{name:'TheWhaleWordGame'}" >A Whale of a Word Rummy</router-link>
<!--        <span class="zone">Rum Rummy</span>-->
<!--        <span class="zone">Dice Rummy</span>-->
<!--        <span class="zone">Y'arr Cards!</span>-->
    </div>
</div>
</template>

<script>
    import  { ref } from 'vue';
    import randomWords from '../esm-words-random';
	export default {
		name: "TheHome",
        setup() {
			const roomName = ref('');
	        randomWords(3, roomName);
	        return { roomName };
        }

	}
</script>

<style scoped>
/*
    --tart-orange: hsla(0, 86%, 65%, 1);
    --dark-liver: hsla(285, 3%, 27%, 1);
    --laurel-green: hsla(87, 24%, 67%, 1);
*/

.page {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 2fr repeat(2, 1fr);
    grid-column-gap: 0.4vmin;
    grid-row-gap: 0.4vmin;
    width: 100%;
    height: 100%;
    font-size: 3vmin;
}

.main { grid-area: 2 / 2 / 4 / 6; }
.menu { grid-area: 1 / 3 / 2 / 6; }
.logo { grid-area: 1 / 2 / 2 / 3; }
.games {
    grid-area: 3 / 2 / 4 / 6;
    font-size: 10pt;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 1vmin;
}


.zone {
    background: hsla(285, 3%, 27%, 1);
    color: hsla(87, 24%, 67%, 1);
    padding: 1vmin;
    border: 0.4vmin solid hsla(0, 86%, 65%, 1);
    border-radius: 0.4vmin;
    margin: 1vmin;
}

</style>
