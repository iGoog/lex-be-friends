<template>
    <div class="handArea"
         v-on:drop.prevent="dropCard()" v-on:dragover.prevent v-on:dragenter.prevent
    >
    <transition-group class="cardRow" name="fade" tag="ul" >
        <li v-for="card in hand" :id="card.id" :key="card.id" class="card"
            :class="{
            	hoveringRight: card.id==hoverId && hoverRight,
            	hoveringLeft: card.id==hoverId && !hoverRight
            }"
            draggable="true" v-on:dragstart="draw( card.id)"
            v-on:dragover.prevent="dragHover($event, card.id)"

            v-on:touchstart="fakedrag('dragstart', $event)"
            v-on:touchmove="fakedrag( 'dragover', $event)"
            v-on:touchend="fakedrag('drop', $event)"
            v-on:touchcancel="fakedrag('drop', $event)"
        >
            <Card :="card" />
        </li>
    </transition-group>
    </div>
</template>
<script>
	import {reactive, ref, watch} from 'vue';
	import { useStore } from 'vuex'
    import Card from "./Card.vue";
	import fakeTouchDragFactory from "../../compatability/fakeTouchDragFactory";

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

			const hoverId = ref(-500);
			const hoverRight = ref(false);
			const dropZone = reactive(store.state.lexGame.gui.dropZone);
			watch(
				() => dropZone.count,
				(count, prevCount)=> {
					if (dropZone.zone!='hand') {
						console.log('watched and dropped');
						hoverId.value = -500;
					} else {
						console.log('bubbled up');
					}
				}
			);
			const dragExit = (msg) => {
				hoverId.value = -500
			}
			let transitioned = true;
            const dragHover = (e, id) => {
            	if (id != hoverId.value) {
		            transitioned = false;
		            hoverId.value = id;
		            setTimeout(()=>transitioned=true, 200);
                } else if (transitioned) {
		            transitioned = false;
	            	hoverRight.value = !hoverRight.value;
	            	setTimeout(()=>transitioned=true, 600);
	            }


            }

			const draw = (id) => {
				store.commit('lexGame/pullCard', {id, zone: 'playerHand'});
			}
            const dropCard = () => {
	            store.commit('lexGame/placeCard', {
	                isBefore: !hoverRight.value,
                    id: hoverId.value,
                    zone: 'playerHand'
                });
	            hoverId.value = -500;
	            return false;
            }



            const fakedrag = fakeTouchDragFactory();

            return { draw, dragHover, dragExit, dropCard, fakedrag,
                 hoverId, hoverRight };
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
        align-content: center;
        list-style: none;
        padding: 0px;
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
        width: 8.5vmin;
        height: 8.5vmin;
        font-weight: bold;
        margin: 0.5vmin;
        padding: 0;
        cursor: grab;
        /*background-color: darkcyan;*/
        /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);*/
        /*border-radius: 4px;*/
    }

    .hoveringRight {
        margin-right: 9vmin;
    }
    .hoveringLeft {
        margin-left: 9vmin;
    }

</style>
