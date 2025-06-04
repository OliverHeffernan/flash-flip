<template>
	<div :class="isOpen || open ? 'popupCont open' : 'popupCont closed'">
		<div class="popup">
			<button class="iconButton" @click="closePopup">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<input type="file" ref="fileInput" id="fileInput" accept=".flsh">
			<button @click="loadFile">Load File</button>
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
	console.log("load file");
	const file = fileInput.value.files[0];

	const reader = new FileReader();

	reader.onload = function(e) {
		console.log("return");
		emit("openFile", JSON.parse(e.target.result).cards);
	}
	reader.onerror = function(e) {
		console.log("An error occured", e);
		return "ERROR";
	}
	reader.readAsText(file);
	closePopup();
}
</script>
