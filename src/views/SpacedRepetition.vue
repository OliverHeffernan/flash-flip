<script setup>
import { defineProps, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CardContainer from "../components/CardContainer.vue";
import LoadingView from "../views/LoadingView.vue";

import { supabase } from '../lib/supabase';

const props = defineProps(['set_id']);

const loading = ref(true);

let cardSet;
let remainingCards;

const currentCard = ref();

function getNextCard() {
	if (remainingCards.length <= 0) {
		/*
		remainingCards = [...cardSet];
		remainingCards.forEach((card) => {
			card.due = card.interval;
		});
		*/
		return null;
	}
	let nextCard = remainingCards[0];
	remainingCards.forEach((card) => {
		card.due--;
	});
	remainingCards.forEach((card) => {
		if (!card.interval) {
			card.interval = 1;
		}

		if (!card.due) {
			card.due = 0;
		}

		if (!nextCard.interval) {
			nextCard.interval = 1;
		}

		if (!nextCard.due) {
			nextCard.due = 0;
		}

		if (card.due < nextCard.due) {
			nextCard = card;
		}
	});
	//remainingCards.splice(cardSet.indexOf(nextCard, 1));
	nextCard.due = nextCard.interval;
	return nextCard;
}

function priUp() {
	currentCard.value.interval--;
	currentCard.value.due = currentCard.value.interval;
	currentCard.value = getNextCard();
}

function priDown() {
	currentCard.value.interval++;
	currentCard.value.due = currentCard.value.interval;
	currentCard.value = getNextCard();
}

onMounted(async () => {
	window.onbeforeunload = () => 'Make sure you have saved your changes';
	if (props.set_id == "null"){
		loading.value = false;
		return;
	}
	
	const { data, error } = await supabase
		.from('sets')
		.select()
		.eq('id', props.set_id);

	if (error) {
		loading.value = false;
		return;
	}
	if (!data) {
		loading.value = false;
		return;
	}
	cardSet = JSON.parse(data[0].set_data).cards;
	remainingCards = [...cardSet];
	currentCard.value = getNextCard();
	loading.value = false;
});

</script>
<template>
	<RouterLink id="backButton" :to="{ name: 'Edit', params: { set_id: props.set_id }}">
		<i class="fa-solid fa-arrow-left"></i>
	</RouterLink>
	<LoadingView v-if="loading" />
	<div class="container">
		<CardContainer @known="priDown" @unknown="priUp" v-if="currentCard" :card="currentCard" :index="0" :spacedRepetition="true" />
	</div>
</template>
<style scoped>
.container {
	height: 85vh;
	width: 100vw;
}

#backButton {
	position: fixed;
	top: 10px;
	left: 10px;
	padding: 20px;
	font-size: 20px;
}
</style>
