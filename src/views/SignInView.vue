<script setup>
import ErrorBubble from '../components/ErrorBubble.vue';

import { ref } from 'vue';
import { supabase } from '../lib/supabase';

const email = ref('');
const password = ref('');
const error = ref(null);

const loading = ref(false);
const success = ref(false);

async function handleSignIn() {
	console.log("kia ora");
	try {
		loading.value = true;
		error.value = null;
		success.value = false;

		const { data, error: signInError } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});

		if (signInError) throw signInError;
		console.log(data);

		success.value = true;
	} catch (err) {
		error.value = err.message || 'Failed to sign in. Please check your credentials.';
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<div class="margins">
		<h2>Sign In</h2>
		<h3>Email</h3>
		<input v-model="email" type="email" placeholder="example@example.com">
		<h3>Password</h3>
		<input v-model="password" type="password" placeholder="password...">
		<button class="bubbleButton" :disabled="loading" @click="handleSignIn()">Sign In</button>

		<ErrorBubble :errorMsg="error" />
	</div>
</template>

<style scoped>
input {
	width: 100%;
}

.bubbleButton {
	margin-top: 10px;
}
</style>
