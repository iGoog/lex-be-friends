<template>
    <span>{{emojii}}</span>
</template>

<script>
    const FACEPALM = 'facepalm';
    const CROSSBONES = 'crossbones';
    const BANDAGE = 'bandage';
    const SPIDER = 'spider';
    const SNAKE = 'snake';
    const VOLCANO = 'volcano';
    const ZOMBIE = 'zombie';
    const BOMB = 'bomb';
    const TORNADO = 'tornado';
    const RAIN_AND_THUNDER = 'rain-and-thunder';
    const HEARTBREAK = 'heartbreak';
    const DOUBLE_EXCLAIM = 'double-exclaim';
    const JOKER = 'joker';
    const SOS = 'sos';
    const PIRATE = 'pirate';
    const VAMPIRE = 'vampire';
    const SUITE_WHITE_HEART = 'suite-white-heart';
    const SUITE_BLACK_HEART = 'suite-black-heart';
    const SUITE_WHITE_SPADE = 'suite-white-spade';
    const SUITE_BLACK_SPADE = 'suite-black-spade';
    const SUITE_WHITE_DIAMOND = 'suite-white-diamond';
    const SUITE_BLACK_DIAMOND = 'suite-black-diamond';
    const SUITE_WHITE_CLUB = 'suite-white-club';
    const SUITE_BLACK_CLUB = 'suite-black-club';
    export {
	    FACEPALM, CROSSBONES, BANDAGE, SPIDER, SNAKE, VOLCANO,
	    ZOMBIE, BOMB, TORNADO, RAIN_AND_THUNDER, HEARTBREAK,
	    DOUBLE_EXCLAIM, JOKER, SOS, PIRATE, VAMPIRE, SUITE_WHITE_HEART,
	    SUITE_WHITE_CLUB, SUITE_WHITE_DIAMOND, SUITE_WHITE_SPADE,
	    SUITE_BLACK_CLUB, SUITE_BLACK_DIAMOND, SUITE_BLACK_HEART,
	    SUITE_BLACK_SPADE
    };
	export default {
		name: "Doomii",
        props: {
			doom: String
        },
        computed: {
			emojii: function()  {
				switch(this.doom) {
					case FACEPALM: return '🤦';
					case CROSSBONES: return '☠';
					case BANDAGE: return '🤕';
					case SPIDER: return '🕷';
					case SNAKE: return '🐍';
					case VOLCANO: return '🌋';
					case ZOMBIE: return '🧟‍♂️';
					case BOMB: return '💣';
					case TORNADO: return '🌪';
					case RAIN_AND_THUNDER: return '⛈';
					case HEARTBREAK: return '💔';
					case DOUBLE_EXCLAIM: return '‼';
					case JOKER: return '🃏';
					case SOS: return '🆘';
					case PIRATE: return '🏴‍☠️';
					case VAMPIRE: return '🧛‍♂️';
					case SUITE_BLACK_SPADE: return '♠';
					case SUITE_BLACK_HEART: return '♥';
					case SUITE_BLACK_DIAMOND: return '♦';
					case SUITE_BLACK_CLUB: return '♣';
					case SUITE_WHITE_SPADE : return '♤';
					case SUITE_WHITE_DIAMOND : return '♢';
					case SUITE_WHITE_CLUB : return '♧';
					case SUITE_WHITE_HEART : return '♡';
					default: return '🙃';
                }
            }
        }
	}
</script>

<style scoped>

</style>
