<template>
    <span>{{emojii}}
        <span v-if="doom==null">
            <span class="facepalm">🤦</span>
            <span class="crossbones">☠</span>
            <span class="bandage">🤕</span>
            <span class="spider">🕷</span>
            <span class="snake">🐍</span>
            <span class="volcano">🌋</span>
            <span class="zombie">🧟‍♂️</span>
            <span class="bomb">💣</span>
            <span class="tornado">🌪</span>
            <span class="rain-and-thunder">⛈</span>
            <span class="heartbreak">💔</span>
            <span class="double-exclaim">‼</span>
            <span class="joker">🃏</span>
            <span class="sos">🆘</span>
            <span class="pirate">🏴‍☠️</span>
            <span class="vampire">🧛‍♂️</span>
            <span class="suit-heart-black">♥</span>
            <span class="suit-heart-white">♡</span>
            <span class="suit-spade-black">♠</span>
            <span class="suit-spade-white">♤</span>
            <span class="suit-diamond-black">♦</span>
            <span class="suit-diamond-white">♢</span>
            <span class="suit-club-black">♣</span>
            <span class="suit-club-white">♧</span>
        </span>
    </span>
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
					default: return '🙃';
                }
            }
        }
	}
</script>

<style scoped>

</style>
