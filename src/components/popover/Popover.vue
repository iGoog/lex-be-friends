<template>
<transition appear name="slide">
<div v-if="show" :class="{wide}" class="popoverModal">
    <slot></slot>
</div>
</transition>
</template>

<script>
	export default {
		name: "Popover",
        props: {
	        show: Boolean,
            wide: Boolean
        }
	}
</script>

<style scoped>
.popoverModal {
    background: linear-gradient(0deg,#00EEEE 0%, #F0F0F0 100%);
    padding: 2vh 2vw;
    position:absolute;
    opacity: 100%;
    z-index: 900;
    border-radius: 2vw;

    top: 10vh;
    min-height: 25vh;
    max-height: 70vh;
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);

    left: 28vw;
    width: 40vw;
}
.slide-enter-active, .slide-leave-active {
    transition: opacity 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940),
                transform 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940),
                transform-origin 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
.slide-enter-from {
    transform: translateY(-600px) rotateX(30deg) scale(6.5);
    transform-origin: 50% 200%;
    opacity: 0;
}
.slide-enter-to {
    transform: translateY(0) rotateX(0) scale(1);
    transform-origin: 50% -500px;
    /*transform-origin: 50% -500px;*/
    opacity: 1;
}

.slide-leave-from {
    transform: translateY(0) rotateX(0) scale(1);
    transform-origin: 50% 1400px;
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform-origin: 50% 100%;
    opacity: 1;
}


.popoverModal.wide {
    left: 8vw;
    width: 80vw;
}

</style>
