<template>
    <button v-if="selectable" :class="{isSelected}">{{emojii}}</button>
    <span v-else>{{emojii}}</span>
</template>

<script>
    import * as DOOM from './Doomie.constants';
	export default {
		name: "Doomii",
        props: {
			doom: String,
            selectable: Boolean,
	        isSelected: Boolean
        },
        computed: {
			emojii: vm =>  {
				switch(vm.doom) {
					case DOOM.FACEPALM: return '🤦';
					case DOOM.CROSSBONES: return '☠';
					case DOOM.BANDAGE: return '🤕';
					case DOOM.SPIDER: return '🕷';
					case DOOM.SNAKE: return '🐍';
					case DOOM.VOLCANO: return '🌋';
					case DOOM.ZOMBIE: return '🧟‍♂️';
					case DOOM.BOMB: return '💣';
					case DOOM.TORNADO: return '🌪';
					case DOOM.RAIN_AND_THUNDER: return '⛈';
					case DOOM.HEARTBREAK: return '💔';
					case DOOM.DOUBLE_EXCLAIM: return '‼';
					case DOOM.JOKER: return '🃏';
					case DOOM.SOS: return '🆘';
					case DOOM.PIRATE: return '🏴‍☠️';
					case DOOM.VAMPIRE: return '🧛‍♂️';
					case DOOM.SUITE_BLACK_SPADE: return '♠';
					case DOOM.SUITE_BLACK_HEART: return '♥';
					case DOOM.SUITE_BLACK_DIAMOND: return '♦';
					case DOOM.SUITE_BLACK_CLUB: return '♣';
					case DOOM.SUITE_WHITE_SPADE : return '♤';
					case DOOM.SUITE_WHITE_DIAMOND : return '♢';
					case DOOM.SUITE_WHITE_CLUB : return '♧';
					case DOOM.SUITE_WHITE_HEART : return '♡';
					default: return '🙃';
                }
            }
        }
	}
</script>

<style scoped>
button {
    background: rgba(205,187,0,0);
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    font-size: 4vmin;
    padding: 0.2em;
    border-radius: 0.1em;
}
button:hover {
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
}

.isSelected {
    background-color: orange;
}
.selectEmojii {

}
</style>
