<template>
    <div>
        <h1>Lex Be Friends! ?<Doomii :doom='doom' />?</h1>
    </div>
</template>

<script>
	import * as DOOM from "../emojii/Doomie.constants";

	import Doomii from "../emojii/Doomii.vue";
	export default {
		name: "Title",
		components: {Doomii},
        data: vm => ({
			doom: DOOM.BANDAGE
        })
	}
</script>

<style scoped>

</style>
