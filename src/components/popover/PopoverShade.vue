<template>
    <transition appear name="fade">
        <div v-show="show"  class="popoverShade"></div>
    </transition>

</template>

<script>
	export default {
		name: "PopoverShade",
        props: {
			show: Boolean
        }
	}
</script>

<style scoped>
.popoverShade {
    background: linear-gradient(0deg,#000000 0%, #111111 100%);
    opacity: 85%;
    position: absolute;
    /* body margin: 5vh 0px 7vh 0px*/
    width: 100%;
    height: 100vh;
    z-index: 100;
    padding: 0;
    margin: -2vh 0 0 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1.2s;
}
.fade-leave-to, .fade-enter-from {
    opacity: 0;
}
.fade-leave-from, .fade-enter-to {
    opacity: 85%;
}
</style>
