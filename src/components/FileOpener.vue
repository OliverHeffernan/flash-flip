<template>
	<div :class="isOpen || open ? 'popupCont open' : 'popupCont closed'">
		<div class="popup">
			<button class="iconButton" @click="closePopup">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<input type="file" ref="fileInput" id="fileInput" accept=".flsh">
			<button class="bubbleButton fullWidth fileButton" @click="loadFile">Load File</button>
		</div>
	</div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps(["open"]);

const emit = defineEmits(["close", "openFile"]);

function closePopup() {
	emit("close");
}

const fileInput = ref();
function loadFile() {
	const file = fileInput.value.files[0];

	const reader = new FileReader();

	reader.onload = function(e) {
		emit("openFile", JSON.parse(e.target.result).cards);
	}
	reader.onerror = function(e) {
		console.log(e);
		return "ERROR";
	}
	reader.readAsText(file);
	closePopup();
}
</script>

<style scoped>
.fileButton {
	margin-top: 20px;
	width: calc(100% - 15px);
}
</style>
