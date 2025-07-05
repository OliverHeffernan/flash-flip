<script setup>
import { ref, onMounted } from 'vue';
import { useRoute/*, useRouter*/ } from 'vue-router';
import { supabase } from '../lib/supabase.js';

const route = useRoute();
//const router = useRouter();
const loading = ref(true);
const success = ref(false);
const error = ref(null);

onMounted(async () => {
	try {
		const { access_token, type } = route.query;

		if (type === 'signup' && access_token) {
			const { error: sessionError } = await supabase.auth.setSession({
				access_token,
				refresh_token: route.query.refresh_token,
			});

			if (sessionError) {
				throw sessionError;
			}

			const { data: {user} } = await supabase.auth.getUser();
			if (user?.confiermed_at) {
				success.value = true;
			} else {
				throw new Error('Email not confirmed yet.');
			}
		} else {
			throw new Error('Invalid confirmation link.');
		}
	} catch(error) {
		error.value = error.message || 'Failed to confirm email. Please try again.';
	} finally {
		loading.value = false;
	}
});
</script>
<template>
	<div class="margins">
		<h2>Email Confirmation</h2>
		<p v-if="loading">Processing your confirmation...</p>
		<p v-if="success">Your email has been confirmed!</p>
		<p v-if="error">{{ error }}</p>
	</div>
</template>
