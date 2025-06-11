<template>
	<div class="wrapper">
		<div ref="pane" id="cardScroll" class="scrollX">
			<CardContainer
				v-for="(card, index) in cardSet"
				:key="index"
				:card="card"
				:index="index"
			/>
		</div>
	</div>
	<div id="centerButtons">
		<button v-if="cardIndex > 0" class="iconButton" @click="scroll(-1)"><i class="fa-solid fa-chevron-left"></i></button>
		<button v-else class="iconButton" style="opacity: 0.5;"><i class="fa-solid fa-chevron-left"></i></button>
		<button class="iconButton" @click="shuffle"><i class="fa-solid fa-shuffle"></i></button>
		<button v-if="cardIndex < cardSet.length - 1" class="iconButton" @click="scroll(1)"><i class="fa-solid fa-chevron-right"></i></button>
		<button v-else class="iconButton" style="opacity: 0.5;"><i class="fa-solid fa-chevron-right"></i></button>
	</div>
</template>
<script setup>
import { defineProps, defineEmits, onMounted, computed, ref } from "vue";
import CardContainer from "./CardContainer.vue";

defineProps(["cardSet"]);
const emit = defineEmits(["shuffle"]);

const loaded = ref(false);
const scrollLeft = ref(0);
const paneWidth = ref(0);

onMounted(() => {
	loaded.value = true;
	const pane = document.getElementById("cardScroll");
	if (pane) {
		pane.addEventListener('scroll', updateScrollData);
		updateScrollData();
		loaded.value = true;
	}
});


const cardIndex = computed(() => {
	if (!loaded.value) {
		return 0;
	}
	return Math.round((scrollLeft.value / paneWidth.value));
});

const updateScrollData = () => {
	const pane = document.getElementById("cardScroll");
	if (pane) {
		scrollLeft.value = pane.scrollLeft;
		paneWidth.value = pane.offsetWidth;
	}
};

function scroll(dir) {
	const pane = document.getElementById("cardScroll");
	const scrollAmount = pane.offsetWidth;
	pane.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
}

function shuffle() {
	emit("shuffle");
}

</script>

<style scoped>
.wrapper {
	overflow: visible;
	/*width: 90vw;*/
	/*height: 80vw;*/
	/*height: calc(63.6402206194vw + 200px);*/
	width: calc(100% - 30px);
	aspect-ratio: 1.414 / 1;
	padding-bottom: 200px;
	position: relative;
}

#centerButtons {
	width: calc(100% - 30px);
	text-align: center;
}

.scrollX {
	display: flex;
	/*
	width: 90vw;
	height: 60vw;
	*/
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
	scroll-snap-type: x mandatory;
	perspective: 1000px;
}
</style>
