<template>
    <div class="actionArea">
        <span class="drawPile">
            <ul class="cardRow">
                <li v-for="card in topDrawPile" >
                    <Card  class="card cardStacked" :="card" />
                </li>
                <li v-if="topDraw!=null" >
                    <Card class="card" :="topDraw" />
                </li>
            </ul>
        </span>

        <span class="discardPile">
            <ul class="cardRow">
                <li v-for="card in topDiscardPile">
                    <Card  class="card cardStacked"  :="card" />
                </li>
                <li v-if="topDiscard!=null" >
                    <Card class="card" :="topDiscard" />
                </li>
            </ul>
        </span>

        <span class="discardArea">
            <ul class="cardRow"
                v-on:drop.prevent="discardAreaDrop()"
                v-on:dragover.prevent
                v-on:dragenter.prevent
            >
                <li >
                    <Card class="dropCardArea" :invisible="true" :invisText="'Discard'" />
                    <Card class="card" v-if="heldDiscard.length > 0" :="heldDiscard[0]" />

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


			return {
            	topDrawPile, topDraw, topDiscardPile, topDiscard, heldDiscard,
				discardAreaDrop
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

</style>
