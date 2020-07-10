<template>
    <div class="wordsArea"><div class="flex">
            <div class="fullWord" v-for="(word, i ) in playedWords" :key="i">
                <ul class="wordRow">
                    <li v-for="card in word.cards" :key="card.id">
                        <Card :="card"/>
                    </li>
                    <li :key="`edit${i}`" @click="clickEdit(i)">
                        <CardButton :="{content: '✍'}" />
                    </li>
                </ul>
            </div>

    </div></div>
</template>

<script>
	import {useStore} from "vuex";
	import {reactive, ref, watch} from "vue";
	import fakeTouchDragFactory from "../../util/fakeTouchDragFactory";
	import Card from "./Card.vue";
	import CardButton from "./CardButton.vue";
	import {COMMIT_EDIT_FROM_BOARD} from "../../store/modules/lexGameConstants";

	export default {
		name: "Words",
		components: {CardButton, Card},
		setup() {
			const store = useStore();
			const playedWords = reactive(store.state.lexGame.playFieldStacks);

			const clickEdit = (editIndex) => {
                store.commit(COMMIT_EDIT_FROM_BOARD, {editIndex});
            }

			return { playedWords, clickEdit };
        }
	}
</script>

<style scoped>
.wordsArea {
    width: 100%;
    height: 100%;
    background-color: blanchedalmond;
    text-align: left;
}
.flex {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
}
.flex .fullWord {
    margin: 0.2vmin 1vmin 0vmin 1vmin;
}
.wordRow {
    display: inline-flex;
    justify-content: center;
    align-content: center;
    list-style: none;
    padding: 0px;
    padding-inline-start: 0px;
}
.wordRow li {
    width: 4vmin;
    height: 4vmin;
    margin: 0.2vmin;
    padding: 0;

}
    ul {
        margin-block-start: 1vmin;
        margin-block-end: 0em;
    }
</style>
