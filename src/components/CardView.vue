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
	<button @click="scroll(-1)">Prev</button>
	<button @click="scroll(1)">Next</button>
</template>
<script setup>
import { defineProps } from "vue";
import CardContainer from "./CardContainer.vue";

defineProps(["cardSet"]);

function scroll(dir) {
	const pane = document.getElementById("cardScroll");
	const scrollAmount = pane.offsetWidth;
	pane.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
}

</script>

<style scoped>
.wrapper {
	overflow: visible;
	width: 90vw;
	/*height: 80vw;*/
	height: calc(63.6402206194vw + 200px);
	position: relative;
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
