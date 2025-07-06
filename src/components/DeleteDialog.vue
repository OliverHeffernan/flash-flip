<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(['title']);
const emit = defineEmits(['delete', 'cancel']);

</script>
<template>
	<div v-if="title" class="popup">
		<p>Are you sure you would like to delete "{{title}}"? This action is irriversible.</p>
		<p>
			<button @click="emit('delete')" class="bubbleButton">Yes</button>
			<button @click="emit('cancel')" class="bubbleButton">No</button>
		</p>
	</div>
</template>
<style scoped>
.popup {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 15px;
	border: solid 1px var(--errorBorder);
	background-color: color-mix(in srgb, var(--errorBorder) 20%, var(--prim));
	font-size: 15px;
	border-radius: 10px;
	z-index: 50;
	box-shadow: 0 0 250px 500px rgba(0, 0, 0, 0.8);
}

p {
	margin: 0;
}

.popup button:first-of-type {
	margin-right: 10px;
}
.popup button {
	margin-top: 10px;
	border: solid 1px var(--errorBorder);
	background-color: color-mix(in srgb, var(--errorBorder) 10%, var(--prim));
	width: calc(50% - 5px);
}
</style>
