<template>
    <div class="actionArea">
        <span class="drawPile">
            <ul class="cardRow">
                <li v-for="card in topDrawPile" class="card cardStacked" >
                    <Card :="card" />
                </li>
                <li v-if="topDraw!=null" class="card">
                    <Card :="topDraw" />
                </li>
            </ul>
        </span>

        <span class="discardPile">
            <ul class="cardRow">
                <li v-for="card in topDiscardPile" class="card cardStacked" >
                    <Card :="card" />
                </li>
                <li v-if="topDiscard!=null" class="card">
                    <Card :="topDiscard" />
                </li>
            </ul>
        </span>

        <span class="">
            <ul class="cardRow">
                <li class="card dropCardArea"><Card :invisible="true" :invisText="'Discard'" /></li>
            </ul>

        </span>

    </div>
</template>

<script>
	import './playCards.css';
    import {useStore} from 'vuex';
    import {reactive, computed} from 'vue';
    import Card from "./Card.vue";

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



			return {topDrawPile, topDraw, topDiscardPile, topDiscard}
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
