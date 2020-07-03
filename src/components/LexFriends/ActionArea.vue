<template>
    <div class="actionArea">
        <span class="drawPile">
            <ul class="cardRow">
                <li v-for="card in topDrawPile" class="card cardStacked" >
                    <Card   :="card" />
                </li>
                <li v-if="topDraw!=null" class="card">
                    <Card  :="topDraw" />
                </li>
            </ul>
        </span>

        <span class="discardPile">
            <ul class="cardRow">
                <li v-for="card in topDiscardPile" class="card cardStacked">
                    <Card    :="card" />
                </li>
                <li v-if="topDiscard!=null" class="card" >
                    <Card  :="topDiscard" />
                </li>
            </ul>
        </span>

        <div class="discardGrid"
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

        </div>

    </div>
</template>

<script>
	import './playCards.css';
    import {useStore} from 'vuex';
    import {reactive, computed} from 'vue';
    import Card from "./Card.vue";
	import * as g from "../../store/modules/lexGameConstants";

	export default {
		name: "ActionArea",
		components: {Card},
		setup(props) {
			const store = useStore();

			const drawPile = reactive(store.state.lexGame.game.drawPile);
			const topDrawPile = computed(() => drawPile.slice(-5, -1));
			const topDraw = computed(() => drawPile.length > 0 ? drawPile[drawPile.length-1] : null);

			const discardPile = reactive(store.state.lexGame.game.discardPile);
			const topDiscardPile = computed(() => discardPile.slice(-5, -1).reverse());
			const topDiscard = computed(() => discardPile.length > 0 ? discardPile[discardPile.length-1] : null);

			const heldDiscard = reactive(store.state.lexGame.game.heldDiscard);

            const discardAreaDrop = () => {
            	if (heldDiscard.length > 0) store.commit(g.COMMIT_PLACE_CARD, {
		            zone: g.ZONE_PLAYER_HAND,
                    fromZone: g.ZONE_HELD_DISCARD
	            });
	            store.commit(g.COMMIT_PLACE_CARD, {
		            zone: g.ZONE_HELD_DISCARD
	            });
            }

            const discardAreaDraw = ( ) => {
            	console.log('discardAreaDraw');
            	store.commit(g.COMMIT_PULL_CARD, {id: heldDiscard[0].id ,zone: g.ZONE_HELD_DISCARD});
            }


			return {
            	topDrawPile, topDraw, topDiscardPile, topDiscard, heldDiscard,
				discardAreaDrop, discardAreaDraw
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

</style>
