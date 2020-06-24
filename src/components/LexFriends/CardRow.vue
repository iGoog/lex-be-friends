<template>
<div v-for="card in cards">
    <Card :="card" />
</div>
</template>

<script>
	import Card from "./Card.vue";
	export default {
		name: "CardRow",
		components: {Card},
		props: {
			cards: Array
        }
	}
</script>

<style scoped>

</style>
