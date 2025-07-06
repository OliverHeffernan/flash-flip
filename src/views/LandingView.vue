<script setup>
import { ref } from "vue";
import AccountBar from "../components/AccountBar.vue";
import TextLogo from "../components/TextLogo.vue";
import FeatureCard from "../components/FeatureCard.vue";

const signedIn = ref(false);
function signIn() {
	signedIn.value = true;
}
</script>
<template>
	<AccountBar @signedIn="signIn" />
	<div class="pageSpread">
		<h1>Welcome to <TextLogo /></h1>
		<h2>A free, student-friendly flashcard app for smarter studying.</h2>
		<RouterLink v-if="!signedIn" to="/signin" class="bubbleButton fr">Sign In</RouterLink>
		<RouterLink v-if="!signedIn" to = "/signup" class="bubbleButton">Sign Up</RouterLink>
	</div>
	<div class="margins">
		<h1>Features</h1>
		<div class="flex">
			<FeatureCard
				icon="fa-solid fa-cloud"
				title="Cloud Storage"
				description="Store your flashcards in the cloud for seamless access and backup across all your devices."
			/>
			<FeatureCard
				icon="fa-solid fa-file-pdf"
				title="Download PDF"
				description="Export your flashcards as PDFs for convenient offline study anytime, anywhere."
			/>
			<FeatureCard
				icon="fa-brands fa-html5"
				title="HTML Formatting"
				description="Enhance your flashcards with HTML formatting for bold, italics, colors, and more to create clear, standout study aids."
			/>
		</div>
	</div>
</template>
<style scoped>
h1 {
	text-align: center;
}
h2 {
	margin-bottom: 40px;
}
.flex {
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	z-index: 5;
	padding-bottom: 20px;
}

.pageSpread a {
	text-decoration: none;
}

.pageSpread {
	text-align: center;
	padding: 150px 0;
	background-color: var(--sec);
}

.fr {
	margin-right: 10px;
}
</style>
