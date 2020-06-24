<template>
    <div class="card">
        <span class="points">{{points}}</span>
        <span class="gameChar">{{gameChar}}</span>
    </div>
</template>

<script>
	export default {
		name: "Card",
        props: {
			points: Number,
            gameChar: String,
            id: Number
        }
	}
</script>

<style scoped>

</style>
