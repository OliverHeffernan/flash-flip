<template>
	<div class="pageSpread">
		<h1>Welcome to FlashFlip</h1>
		<h2>A free to use flash card app for students.</h2>
		<RouterLink to="/login" class="bubbleButton">Log In</RouterLink>
		<RouterLink to = "/signup" class="bubbleButton">Sign Up</RouterLink>
	</div>
</template>
<style scoped>
.pageSpread {
	text-align: center;
}

.bubbleButton:first-of-type {
	margin-right: 10px;
}
</style>
