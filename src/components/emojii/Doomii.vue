<template>
    <span>{{emojii}}</span>
</template>

<script>
    import * as DOOM from './Doomie.constants';
	export default {
		name: "Doomii",
        props: {
			doom: String
        },
        computed: {
			emojii: function()  {
				switch(this.doom) {
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

</style>
