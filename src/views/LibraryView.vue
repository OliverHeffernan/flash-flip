<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';

import SetBox from '../components/SetBox.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
import AccountBar from '../components/AccountBar.vue';

const router = useRouter();

const user = ref(null);

const sets = ref(null);

async function checkUser() {
	try {
		const thing = await supabase.auth.getUser();
		user.value = thing;
	} catch (error) {
		router.push({ name: "Sign In" });
	}
}

async function getSets() {
	try {
		const { data, error } = await supabase
			.from('sets')
			.select()
			.eq('creator_id', user.value.data.user.id);
		if (error) {
			return;
		}

		sets.value = data;
	} catch (error) {
		router.push({ name: "Sign In" });
	}
}

const delTitle = ref(null);
let delId = null;

function deleteDialog(payload) {
	const { id, title } = payload;

	delTitle.value = title;
	delId = id;
	//deleteSet(id);
}

async function deleteSet(id) {
	const error = await supabase
		.from('sets')
		.delete()
		.eq('id', id).error;
	if (error) {
		alert(error);
		return;
	}
	removeSetFromArray(id);

	alert("Set deleted");
}

function removeSetFromArray(id) {
	for (let i = 0; i < sets.value.length; i++) {
		if (sets.value[i].id != id) continue;
		sets.value.splice(i, 1);
		return;
	}
}

function cancelDelete() {
	delTitle.value = null;
	delId = null;
}

async function confirmedDelete() {
	await deleteSet(delId);
	cancelDelete();
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
	<AccountBar />
	<DeleteDialog :title="delTitle" @delete="confirmedDelete" @cancel="cancelDelete" />
	<div class="margins">
		<h1>Library</h1>
		<div class="flex">
			<SetBox @delete="deleteDialog" v-for="set in sets" :key="set.id" :set="set" />
		</div>

		<RouterLink to="/edit/null" class="bubbleButton">New Set</RouterLink>
	</div>
</template>

<style scoped>
.flex {
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	z-index: 5;
	padding-bottom: 20px;
}
</style>
