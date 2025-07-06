<script setup>
import { defineProps } from "vue";
defineProps(["icon", "title", "description"]);
</script>
<template>
	<div class="card">
		<i :class="icon"></i>
		<h3>{{ title }}</h3>
		<p>{{ description }}</p>
	</div>
</template>
<style scoped>
.card {
	flex: 0 1 calc(33.333% - 10px);
	box-sizing: border-box;
	border: 1px solid var(--border);
	padding: 15px;
	border-radius: 15px;
	background-color: var(--sec);
}
</style>
