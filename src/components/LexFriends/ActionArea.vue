<template>
    <div class="actionArea">
        <span class="drawPile">
            <ul class="cardRow">
                <li v-for="card in topDrawPile" class="card cardStacked" >
                    <Card   :="card" />
                </li>
                <li @click="clickTopDraw()" v-if="topDraw!=null" class="card" :class="{wobbleRight: (heldDiscard.length>0)}">
                    <Card  :="topDraw"  />
                </li>
            </ul>
        </span>

        <span class="discardPile">
            <ul class="cardRow">
                <li v-for="card in topDiscardPile" class="card cardStacked">
                    <Card    :="card" />
                </li>
                <li @click="clickTopDiscard()" v-if="topDiscard!=null" class="card" :class="{wobbleRight2: (heldDiscard.length>0)}" >
                    <Card  :="topDiscard" />
                </li>
            </ul>
        </span>

        <span class="discardGrid"
              v-on:drop.prevent="discardAreaDrop()"
              v-on:dragover.prevent
              v-on:dragenter.prevent>
            <ul class="discardGridBottom">
                <li class="dropCardArea" :key="-999">
                    <Card :invisible="true" :invisText="'Discard'" />
                </li>
            </ul>
            <transition-group name="fade" tag="ul">

                <li v-for="card in heldDiscard" :key="card.id" class="card"
                    draggable="true"
                    v-on:dragstart="discardAreaDraw()"
                     v-on:dragover.prevent
                     v-on:dragenter.prevent
                >
                    <Card :="card" />
                </li>
            </transition-group>

        </span>

        <span class="actionButtons">
            <ul class="cardRow">
                <li class="card" @click="clickSubmit()">
                    <CardButton :="{content: '☝'}"></CardButton>
                </li>
            </ul>
        </span>

    </div>
</template>

<script>
	import './playCards.css';
    import {useStore} from 'vuex';
    import {reactive, computed} from 'vue';
    import Card from "./Card.vue";
	import CardButton from "./CardButton.vue";
	import {
		COMMIT_PLACE_CARD,
		ZONE_PLAYER_HAND,
		ZONE_HELD_DISCARD,
		COMMIT_PULL_CARD, DISPATCH_TURN_DRAW_FROM_ZONE, ZONE_DRAW_PILE, ZONE_DISCARD_PILE, DISPATCH_TURN_PLAY,
		stackGrabber, ZONE_PLAYER_PLAY
	} from "../../store/modules/lexGameConstants";

	export default {
		name: "ActionArea",
		components: {Card, CardButton},
		setup(props) {
			const store = useStore();
			const moduleState = store.state.lexGame;
			const drawPile = reactive(stackGrabber(moduleState, ZONE_DRAW_PILE).cards);
			const topDrawPile = computed(() => drawPile.slice(-5, -1));
			const topDraw = computed(() => drawPile.length > 0 ? drawPile[drawPile.length-1] : null);

			const discardPile = reactive(stackGrabber(moduleState, ZONE_DISCARD_PILE).cards);
			const topDiscardPile = computed(() => discardPile.slice(-5, -1).reverse());
			const topDiscard = computed(() => discardPile.length > 0 ? discardPile[discardPile.length-1] : null);

			const heldDiscard = reactive(stackGrabber(moduleState, ZONE_HELD_DISCARD).cards);

            const discardAreaDrop = () => {
            	if (heldDiscard.length > 0) store.commit(COMMIT_PLACE_CARD, {
		            zone: ZONE_PLAYER_HAND,
                    fromZone: ZONE_HELD_DISCARD
	            });
	            store.commit(COMMIT_PLACE_CARD, {
		            zone: ZONE_HELD_DISCARD
	            });
            }

            const discardAreaDraw = ( ) => {
            	console.log('discardAreaDraw');
            	store.commit(COMMIT_PULL_CARD, {id: heldDiscard[0].id ,zone: ZONE_HELD_DISCARD});
            }

            const clickTopDraw = () => {
            	store.dispatch(DISPATCH_TURN_DRAW_FROM_ZONE, {fromZone: ZONE_DRAW_PILE});
            }

			const clickTopDiscard = () => {
				if (heldDiscard.length>0) {
					store.dispatch(DISPATCH_TURN_DRAW_FROM_ZONE, {fromZone: ZONE_DISCARD_PILE});
				}
			}

			const clickSubmit = () => {
				const validLength = stackGrabber(moduleState, ZONE_PLAYER_PLAY).cards.length >= 2;
				if (validLength) {
                    store.dispatch(DISPATCH_TURN_PLAY);
                }
            }


			return {
            	topDrawPile, topDraw, topDiscardPile, topDiscard, heldDiscard,
				discardAreaDrop, discardAreaDraw, clickTopDraw, clickTopDiscard,
				clickSubmit
            }
        }
	}
</script>

<style scoped>
    .deckArea {
        height: 100%;
        width: 100%;
        background-color: cornflowerblue;
    }

    .discardGrid {
        display: inline-grid;
        width: 10vmin;
        clear: none;
    }
    .discardGrid ul {
        grid-column: 1;
        grid-row: 1;
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    .discardGridBottom {
        z-index: -1;
    }

    .drawPile {
        margin-right: 9vmin;
    }

    .actionButtons {
        margin-left: 9vmin;
    }

    .wobbleRight {
        animation: wobbleRightAnimation 5s infinite both;
    }
    .wobbleRight2 {
        animation: wobbleRightAnimation 5s 0.5s infinite both;
    }

    @keyframes wobbleRightAnimation {
        0%,16%, 100% {
            transform: translateY(0) rotate(0);
            transform-origin: 50% 50%;
        }
        2.4% {
            transform: translateY(-4vmin) rotate(6deg);
        }
        4.8% {
            transform: translateY(2vmin) rotate(-6deg);
        }
        7.2% {
            transform: translateY(-2vmin) rotate(3.6deg);
        }
        9.6% {
            transform: translateY(1.2vmin) rotate(-2.4deg);
        }
        12% {
            transform: translateY(-0.8vmin) rotate(1.2deg);
        }
    }

</style>
