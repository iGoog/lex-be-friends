<template>
    <div class="handArea"
         v-on:drop.prevent="dropCard()" v-on:dragover.prevent v-on:dragenter.prevent
    >
    <transition-group class="cardRow" name="fade" tag="ul" >
        <li v-for="card in hand" :id="card.id" :key="card.id" class="card"
            :ref="el => { liCards.set(card.id, el) }"
            :class="{
            	hoveringRight: card.id==hoverId && hoverRight,
            	hoveringLeft: card.id==hoverId && !hoverRight
            }"
            draggable="true" v-on:dragstart="draw( $el, card.id)"
            v-on:dragover.prevent="dragHover($event, card.id)"
        >
            <Card :="card" />
        </li>
    </transition-group>
    </div>
</template>

<script>
	import {reactive, ref, onBeforeUpdate, watch} from 'vue';
	import { useStore } from 'vuex'
    import Card from "./Card.vue";

	export default {
		name: "Hand",
		components: {Card},
        data() {
			return {
				hand: useStore().state.lexGame.game.playerHand,
				heldCard: useStore().state.lexGame.game.heldCard
            }
        },
		setup(props) {
			const store = useStore();
			const liCards = reactive(new Map());
			const hoverId = ref(-1);
			const hoverRight = ref(false);
			onBeforeUpdate(()=> liCards.clear());

			const calcPieceWidth = (offsetWidth) => (offsetWidth * 9.5) / 100;
			const pieceWidth = ref(calcPieceWidth(300));
            //const  { game: { playerHand } }  = store.state.lexGame;
            //const hand = computed(() => playerHand);
           // setTimeout(() => store.commit('lexGame/shuffleHand'), 2000);
			//setTimeout(() => store.commit('lexGame/pullCardFromHand', 2), 1000);
//			setTimeout(() => store.commit('lexGame/pullCardFromHand', 2), 4000);
            const draw = (e, id) => {
	            pieceWidth.value = calcPieceWidth(e.offsetWidth);
	            store.commit('lexGame/pullCardFromHand', id);
            }
			const dragExit = (msg) => {
            	console.log('dragExit ' + msg);
				hoverId.value = -1
			}
            const dragHover = (e, id) => {
	            hoverId.value = id;
	            hoverRight.value = (e.offsetX / pieceWidth.value > 0.5);
            }
            // ${e.offsetX} ${e.offsetY}
            const dropCard = () => {
            	console.log(`drop id now ${hoverId.value}`)
	            store.commit('lexGame/placeCardInHand', {
	                isBefore: !hoverRight.value,
                    id: hoverId.value
                });
	            hoverId.value = -1;
	            return false;
            }

            const dropZone = reactive(store.state.lexGame.gui.dropZone);

            watch(
                () => dropZone.count,
                (count, prevCount)=> {
                	if (dropZone.zone!='hand') {
                		console.log('watched and dropped');
		                hoverId.value = -1;
                    } else {
                		console.log('bubbled up');
                    }
                }
            );


            //return { hand };
            return { draw, dragHover, dragExit, dropCard,
                pieceWidth, liCards, hoverId, hoverRight };
        }
	}
</script>

<style scoped>

    .handArea {
        background-color: silver;
        width: 100%;
        height: 100%;
    }

    .cardRow {
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .fade-move, .fade-enter-active, .fade-leave-active {
        transition: all 0.5s cubic-bezier(.55,0,.1,1)
        /* 0.5s cubic-bezier(.55,0,.1,1);*/
    }
    /* 2. declare enter from and leave to state */
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: scale(0.0);
                /*scaleY(0.01) translate(0, 0);*/
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
        cursor: grab;
        /*background-color: darkcyan;*/
        /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);*/
        /*border-radius: 4px;*/
    }

    .hoveringRight {
        margin-right: 9vw;
    }
    .hoveringLeft {
        margin-left: 9vw;
    }

    /*.hovering {*/
    /*    width: 8.5vw;*/
    /*    height: 8.5vw;*/
    /*    background-color: yellow;*/
    /*    margin: 0.5vw;*/
    /*    padding: 0;*/
    /*}*/

</style>
