<script setup>
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["set"]);
const emit = defineEmits(['delete']);

function deleteSet() {
	emit('delete', { id: props.set.id, title: props.set.title });
}

</script>
<template>
	<div class="box">
		<RouterLink :to="{ name: 'Edit', params: { set_id: set.id }}"><h3>{{ set.title }}</h3></RouterLink>
		<i v-if="set.public" class="fa-solid fa-globe"></i>
		<i v-else class="fa-solid fa-lock"></i>
		<button @click="deleteSet" class="iconButton"><i class="fa-solid fa-trash"></i></button>
	</div>
</template>

<style scoped>
.box {
	border: var(--border) solid 1px;
	padding: 10px;
	border-radius: 10px;
	flex: 0 1 calc(33.333% - 10px);
	box-sizing: border-box;
}

h3 {
	margin-top: 0;
}

h3:hover {
	text-decoration: underline;
}

</style>
