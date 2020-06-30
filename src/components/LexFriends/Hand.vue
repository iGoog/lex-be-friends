<template>
    <div>
    <transition-group class="cardRow" name="fade" tag="ul">
        <li class="card" v-for="(card, i) in hand" :key="card.id"
            draggable="true" v-on:dragstart="draw(i)"
            v-on:dragover="dragHover($event, $el)">
            <Card :="card" />
        </li>
    </transition-group>
    </div>
</template>

<script>
	import {computed, ref} from 'vue';
	import { useStore } from 'vuex'
    import Card from "./Card.vue";

	export default {
		name: "Hand",
		components: {Card},
        data() {
			return {
				hand: useStore().state.lexGame.game.playerHand
            }
        },
		setup(props) {
			const store = useStore();
            //const  { game: { playerHand } }  = store.state.lexGame;
            //const hand = computed(() => playerHand);
           // setTimeout(() => store.commit('lexGame/shuffleHand'), 4000);
			//setTimeout(() => store.commit('lexGame/pullCardFromHand', 2), 1000);
//			setTimeout(() => store.commit('lexGame/pullCardFromHand', 2), 4000);
            const draw = (index) => store.commit('lexGame/pullCardFromHand', index);
            const dragHover = (e, el) => console.log(el.offsetWidth);
            // ${e.offsetX} ${e.offsetY}

            //return { hand };
            return { draw, dragHover };
        }
	}
</script>

<style scoped>
    .cardRow {
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .fade-move, .fade-enter-active, .fade-leave-active {
        transition: all 0.5s cubic-bezier(.55,0,.1,1);
    }
    /* 2. declare enter from and leave to state */
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: scaleY(0.01) translate(30px, 0);
    }
    /* 3. ensure leaving items are taken out of layout flow so that moving
          animations can be calculated correctly. */
    .fade-leave-active {
        position: absolute;
    }
    .card {
        width: 8.5vw;
        height: 8.5vw;
        font-weight: bold;
        margin: 0.5vw;
        padding: 0;
        /*background-color: darkcyan;*/
        /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);*/
        /*border-radius: 4px;*/
    }
</style>
