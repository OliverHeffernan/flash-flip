<template>
	<input type="text" v-model="cardSet[index].question" />
	<input type="text" v-model="cardSet[index].answer" />
</template>
<script setup>
import { defineProps, onMounted } from "vue";
//import CardSet from "../classes/CardSet.js";

const props = defineProps(["index", "cardSet"]);

let cardSet;
onMounted(() => {
	cardSet = props.cardSet;
});
</script>
