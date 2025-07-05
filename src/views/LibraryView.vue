<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';

const router = useRouter();

const user = ref(null);

const sets = ref(null);

async function checkUser() {
	const thing = await supabase.auth.getUser();
	user.value = thing;
	console.log(user.value.data.user.id);
}

async function getSets() {
	const { data, error } = await supabase
		.from('sets')
		.select()
		.eq('creator_id', user.value.data.user.id);
	console.log(data);
	console.log(error);
	if (error) {
		console.log(error);
		return;
	}

	sets.value = data;
}

onMounted(async () => {
	await checkUser();
	if (user.value) {
		getSets();
		return;
	}
	router.push({ name: 'Sign In' });
});
</script>

<template>
	<div class="margins">
		<h1>Library</h1>
		<h3 v-for="set in sets" :key="set.id">{{ set.title }}</h3>
		<RouterLink to="/edit" class="bubbleButton">New Set</RouterLink>
	</div>
</template>
