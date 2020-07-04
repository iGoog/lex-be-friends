<template>
        <svg :class="{svgFace:true}"
             viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
             v-on:touchstart="fakedrag('click', $event)"
        ><defs>
            <filter id="shadow">
                <feDropShadow dx="2" dy="4" stdDeviation="0.2" flood-opacity="0.7" />
            </filter>
        </defs>
            <circle cx="50" cy="50%" r="40" style="fill:pink; filter:url(#shadow);" />
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="40" >
                {{content }}
            </text>
        </svg>
</template>

<script>
    import fakeTouchDragFactory from "../../util/fakeTouchDragFactory";
//TODO: handle hover and click effects
	export default {
		name: "CardButton",
        props: {
			content: String
        },
        setup(props, context) {
	        const fakedrag = fakeTouchDragFactory();
            return { fakedrag };
        }
	}
</script>

<style scoped>

    .svgFace {
        /*background-color: cyan;*/
        /*background: linear-gradient(0deg,#00C9FF 0%, #92FE9D 100%);*/
        /*border-radius: 50%;*/
        /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);*/
        /*text-transform: uppercase;*/
    }


</style>
