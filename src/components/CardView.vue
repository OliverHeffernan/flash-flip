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
		<button class="iconButton" @click="scroll(-1)"><i class="fa-solid fa-chevron-left"></i></button>
		<button class="iconButton" @click="shuffle"><i class="fa-solid fa-shuffle"></i></button>
		<button class="iconButton" @click="scroll(1)"><i class="fa-solid fa-chevron-right"></i></button>
	</div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import CardContainer from "./CardContainer.vue";

defineProps(["cardSet"]);
const emit = defineEmits(["shuffle"]);

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
