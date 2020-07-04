<template>
    <div class="titleArea">
        <h1><Doomii :doom="doom"></Doomii></h1>
    </div>
</template>

<script>
	import * as DOOM from "../emojii/Doomie.constants";

	import Doomii from "../emojii/Doomii.vue";
	export default {
		name: "Title",
		components: {Doomii},
        data: vm => ({
			doom: DOOM.PIRATE
        })
	}
</script>

<style scoped>
.titleArea {
    width: 100%;
    height: 100%;
    background-color: cornsilk;
}
</style>
