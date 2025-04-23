<template>
	<div class="cardedit"
		v-for="(card, index) in cardSet"
		:key="index"
	>
		{{index + 1}}. 
		<input
			@keyup.enter="onQuestionEnter(index)"
			class="questionInput"
			type="text"
			v-model="card.question"
		/>
		<input
			@keyup.enter="onAnswerEnter"
			type="text"
			class="answerInput"
			v-model="card.answer"
		/>
		<button
			v-if="index != 0 || cardSet.length > 1"
			@click="removeCard(index)"
		> Remove Card </button>
	</div>
	<button @click="newCard">Add new card</button>
	<CardView :cardSet="cardSet" />
</template>

<script setup>
import { ref, nextTick } from "vue";
import CardView from "./components/CardView.vue";


const emptyCard = {
	question: "",
	answer: ""
};

let cardSet = ref([{... emptyCard}]);

function newCard() {
	cardSet.value.push({... emptyCard});
}

function removeCard(index) {
	if (index == 0 && cardSet.value.length == 1) {
		return;
	}
	cardSet.value.splice(index, 1);
}

function onQuestionEnter(index) {
	document.getElementsByClassName('answerInput')[index].focus();
}

async function onAnswerEnter() {
	newCard();
	// then wait for the new div to be mounted
	await nextTick();
	document.getElementsByClassName("questionInput")[cardSet.value.length - 1].focus();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
