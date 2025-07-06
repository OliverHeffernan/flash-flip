<script setup>
import { supabase } from "../lib/supabase.js";
import { ref, defineEmits } from "vue";
import LoadingView from "../views/LoadingView.vue";
import TextLogo from "./TextLogo.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const emit = defineEmits(["signedIn"]);

const user = ref(null);
const loading = ref(true);

async function checkUser() {
	const thing = await supabase.auth.getUser();
	if (thing.error || !thing.data) {
		//router.push({ name: "Sign In" });
		loading.value = false;
		return;
	}
	const name = thing.data.user.user_metadata.display_name;
	user.value = name;
	loading.value = false;
	emit("signedIn");
	//console.log(user.value.data.user.user_metadata.display_name);
}

async function signOut() {
	await supabase.auth.signOut();
	router.push({ name: "Sign In" });
}

checkUser();
</script>
<template>
	<LoadingView v-if="loading" />
	<div class="bar">
		<ul class="margins">
			<li class="fl"><RouterLink to="/"><p class="homeLink"><TextLogo /></p></RouterLink></li>
			<li v-if="user" class="fl"><RouterLink to="/library"><p>Library</p></RouterLink></li>
			<li v-if="user" class="fl"><RouterLink to="/edit/null"><p>New Set</p></RouterLink></li>
			<li class="fr first">
				<p v-if="user">Signed in as {{ user }} </p>
				<RouterLink v-if="!user" to="/signin" class="bubbleButton">Sign In</RouterLink>
			</li>
			<li class="fr">
				<button v-if="user" @click="signOut" class="bubbleButton">Sign Out</button>
				<RouterLink v-if="!user" to="/signup" class="bubbleButton">Sign Up</RouterLink>
			</li>
		</ul>
	</div>
</template>
<style scoped>
.homeLink {
	/*font-weight: 700;*/
}
.bar {
	border-bottom: var(--border) solid 1px;
	width: 100%;
	margin: 0;
	padding: 5px 15px;
	box-sizing: border-box;
}

.bar .margins {
	display: flex;
	list-style: none;
	padding: 0;
}

.bar .margins {
	height: 52px;
	box-sizing: border-box;
}

.bar .margins li {
	height: 52px;
	margin: 0;
	display: flex;
	align-items: center;
}

.bar .margins a {
	text-decoration: none;
}

.bar .margins .fl {
	margin-right: 30px;
}

.bar .margins .first {
	margin-left: auto;
}

.bubbleButton {
	margin-left: 10px;
}
</style>
