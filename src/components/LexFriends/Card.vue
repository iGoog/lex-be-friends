<template>
<!--     <span :class="{ removeAnimate: isRemoveAnimate }" draggable="true" v-on:dragstart="dragstart()">-->
        <svg class="svgFace" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect class="whoa" x="0" y="0" width="100%" height="100%" stroke="darkgrey" stroke-width="3px" fill="transparent"/>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="50" >
                {{gameChar == 'wild'? '🦄' : gameChar }}
            </text>
            <text x="85%" y="15%" dominant-baseline="central" text-anchor="middle" font-size="20" >
                {{points}}
            </text>
        </svg>
<!--    </span>-->
</template>

<script>
    import { ref } from 'vue';
	export default {
		name: "Card",
        props: {
			points: Number,
            gameChar: String,
            id: Number
        },
        setup(props, context) {
	        const isRemoveAnimate = ref(false);
			let dragstart = (e) => {
				isRemoveAnimate.value = true;
            }
            return { dragstart, isRemoveAnimate };
        }
	}
</script>

<style scoped>

    .svgFace {
        background-color: cyan;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
        text-transform: uppercase;
    }
    .lifted {
        box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)
    }



</style>
