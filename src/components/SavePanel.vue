<script setup>
import { defineProps, ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabase.js";
import { useRoute } from "vue-router";
const route = useRoute();

const lastSaved = ref("");
const user = ref(null);
const setId = ref(route.query.setId | null);

const dispTime = computed(() => {
	const last = lastSaved.value;
	if (last == "") return "";
	const time = new Date();
	const day = time.getDate();
	const month = time.getMonth();
	const year = time.getFullYear();

	const lastDay = last.getDate();
	const lastMonth = last.getMonth();
	const lastYear = last.getFullYear();
	const lastHour = last.getHours();
	const lastMinute = last.getMinutes();

	if (lastYear != year || lastMonth != month || lastDay != day) {
		return `${lastDay} ${lastMonth} ${lastYear}`;
	}
	return `today ${lastHour}:${zeroPad(lastMinute)}`;
});

function zeroPad(number) {
	if (number > 9 || number < 0) return number.toString();
	return "0" + number;
}

const props = defineProps(["cards", "title"]);
const title = ref(props.title);

async function checkUser() {
	const thing = await supabase.auth.getUser();
	user.value = thing;
}

async function save() {
	try {
		await checkUser();
		if (!user.value) {
			alert("You are not signed in");
		}
		let data, error;
		// update if already existing
		if (setId.value) {
			({ data, error } = await supabase
				.from('sets')
				.update({
					set_data: `{"cards": ${JSON.stringify(props.cards)}}`,
					title: title.value,
					updated_at: new Date().toISOString(),
				})
				.eq('id', setId.value) // filter by id
				.select()
			);
		// otherwise create a new one
		} else {
			({ data, error } = await supabase
				.from('sets')
				.insert([{
					creator_id: user.value.data.user.id,
					set_data: `{"cards":${JSON.stringify(props.cards)}}`,
					title: title.value,
				}])
				.select()
			);
			setId.value = data[0].id;
		}
		if (error) {
			alert("Failed to save");
		}

		lastSaved.value = new Date();
	} catch (error) {
		alert(error);
	}
}

onMounted(checkUser);

</script>
<template>
	<div class="panel">
		<div class="margins">
			<input type="text" v-model="title">
			<button @click="save" class="iconButton"><i class="fa-solid fa-floppy-disk"></i></button>
			<div class="savedText" v-if="lastSaved != ''">Last saved {{ dispTime }}</div>
			<div class="savedText" v-else>Changes not saved</div>
		</div>
	</div>
</template>

<style scoped>
.panel {
	width: 100%;
	border-bottom: 1px solid var(--border);
	margin-bottom: 10px;
}

.margins {
	display: flex;
}

input {
	border-left: none;
	border-top: none;
	border-right: none;
	margin-bottom: 10px;
}

.savedText {
	opacity: 50%;
	align-content: center;
	margin-left: 10px;
}
</style>
