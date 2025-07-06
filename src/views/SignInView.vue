<script setup>
import ErrorBubble from '../components/ErrorBubble.vue';
import LoadingView from './LoadingView.vue';
import AccountBar from '../components/AccountBar.vue';

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { supabase } from '../lib/supabase';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref(null);

const loading = ref(true);
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
		router.push({ name: "Library" });
	} catch (err) {
		error.value = err.message || 'Failed to sign in. Please check your credentials.';
	} finally {
		loading.value = false;
	}
}

async function checkUser() {
	const thing = await supabase.auth.getUser();
	//console.log(user.value.data.user.id);
	console.log(thing);
	if (!thing.data.user) {
		loading.value = false;
		return;
	}

	router.push({ name: "Library" });
}

checkUser();
</script>

<template>
	<AccountBar />
	<LoadingView v-if="loading" />
	<div class="margins">
		<h2>Sign In</h2>
		<h3>Email</h3>
		<input v-model="email" type="email" placeholder="example@example.com">
		<h3>Password</h3>
		<input v-model="password" type="password" placeholder="password...">
		<button class="bubbleButton" :disabled="loading" @click="handleSignIn()">Sign In</button>

		<ErrorBubble :errorMsg="error" />
		<div v-if="success">You are now signed in.</div>
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
