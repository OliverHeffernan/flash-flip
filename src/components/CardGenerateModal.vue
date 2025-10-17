<template>
	<LoadingView v-if="loading" />
	<div class="modal popup">
		<button @click="emit('close')" class="close iconButton"><i class="fa-solid fa-xmark"></i></button>
		<h3>Paste your notes below, or provide a description of what you are studying.</h3>
		<textarea v-model="topic" cols="30" rows="10" placeholder="Paste your notes here, or give a description of the topics you are studying."></textarea>
		<p>How many cards do you want? <input type="number" v-model="cardCount" ></p>
		<h3>Any other instructions (optional)</h3>
		<textarea v-model="instructions" cols="30" rows="10" placeholder="Type any instructions for what type of questions and answers you want in the set. For example, you could ask for some fill in the gaps questions, or definition questions."></textarea>
		<button class="bubbleButton fullWidth" @click="generateCards"><i class="fa-solid fa-wand-magic-sparkles"></i>Generate</button>
		<ErrorBubble :errorMsg="errorMsg" />
	</div>
</template>

<style scoped>

.modal {
	width: 80vw;
	height: 80vh;
	overflow-y: auto;
	overflow-x: none;
	position: fixed;
	z-index: 19;

	background-color: var(--prim);
}

textarea {
	width: 100%;
}

</style>
<script setup>

import { createClient } from '@supabase/supabase-js';
import ErrorBubble from "./ErrorBubble.vue";
import LoadingView from "../views/LoadingView.vue";

import { ref, defineEmits } from 'vue';

const emit = defineEmits('cardsGenerated', 'close');

const client = createClient(process.env.VUE_APP_SUPABASE_URL, process.env.VUE_APP_SUPABASE_ANON_KEY);

const topic = ref("");
const instructions = ref("");
const cardCount = ref("");
const errorMsg = ref("");

const loading = ref(false);

async function generateCards() {
	if (loading.value) return;
	loading.value = true;
	errorMsg.value = "";
	if (!parseInt(cardCount.value)) {
		errorMsg.value += "Card count is not a number.";
	}

	if (errorMsg.value != "") {
		loading.value = false;
		return;
	}


	const { data, error } = await client.functions.invoke('generate-flashcards', {
		body: { name: 'Functions', topic: topic.value, instructions: instructions.value, cardCount: parseInt(cardCount.value) },
	});
	console.log(data);
	if (error) {
		console.log(error);
		return error;
	}
	emit('cardsGenerated', data);
	loading.value = false;
	return data;
}

</script>
