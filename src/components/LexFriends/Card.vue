<template>
        <svg :class="{svgFace: showFace && !invisible, flipAnimate, svgBack : !showFace && !invisible, invisible }"
             viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
             v-on:touchstart="($event)=>{fakedrag('dragstart', $event);fakedrag('click', $event);}"
             v-on:touchmove="fakedrag( 'dragover', $event)"
             v-on:touchend="fakedrag('drop', $event)"
             v-on:touchcancel="fakedrag('drop', $event)"
        >
            <text v-if="showFace" x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="50" >
                {{gameChar == 'wild'? '🦄' : gameChar }}
            </text>
            <text v-if="showFace" x="85%" y="15%" dominant-baseline="central" text-anchor="middle" font-size="20" >
                {{points}}
            </text>
            <text v-if="invisText" x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="20" >
                {{invisText}}
            </text>
        </svg>
</template>

<script>
    import { ref, watch } from 'vue';
    import fakeTouchDragFactory from "../../util/fakeTouchDragFactory";

	export default {
		name: "Card",
        props: {
			points: Number,
            gameChar: String,
            id: Number,
            hide: Boolean,
            invisible: Boolean,
            invisText: String
        },
        setup(props, context) {
	        const flipAnimate = ref(false);
	        const showFace = ref(!props.hide );

	        watch (
                () => [props.hide, props.id],
                ([hide, id], [prevHide, prevId]) => {
                	if (id!=prevId) {
		                showFace.value = !props.hide;
		                flipAnimate.value=false;
                    } else if (!hide && prevHide) {
		                flipAnimate.value = true;
                		setTimeout(()=> showFace.value = true, 250 );
		                // safari not showing shadow after animation without this
		                setTimeout(()=> flipAnimate.value = false, 510 );
                    } //TODO: handle hide flip
                }
            );

	        const fakedrag = fakeTouchDragFactory();
            return { flipAnimate, showFace, fakedrag };
        }
	}
</script>

<style scoped>

    .svgFace {
        /*background-color: cyan;*/
        background: linear-gradient(0deg,#00C9FF 0%, #92FE9D 100%);
        border-radius: 0.5vmin;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
        text-transform: uppercase;
    }
    .invisible {
        border-radius: 0.5vmin;
    }

    .svgBack {
        background: url("../../assets/cardBack.png");
        background-size: contain;
        transform: rotate(-180deg);
        border-radius: 0.5vmin;
        box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2),0 -2px 2px 0 rgba(0,0,0,.14),0 -1px 5px 0 rgba(0,0,0,.12);
    }
    .lifted {
        box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)
    }

    .flipAnimate {
        animation: flipAnimateFrames 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;

    }
    @keyframes flipAnimateFrames {
        0% {
            transform: translateY(100%) rotateX(-180deg);
            transform-origin: 50% 0%;
        }
        100% {
            transform: translateY(0) rotateX(0deg);
            transform-origin: 50% 100%;
        }
    }


</style>
