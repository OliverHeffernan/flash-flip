<template>
	<div :class="isOpen || open ? 'popupCont open' : 'popupCont closed'">
		<div id="downloader" class="popup">
			<button class="iconButton" @click="closePopup">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<div id="buttons">
				<button id="json" class="bubbleButton" @click="downloadJSON">
					Download JSON
					<div class="tooltip">Download your cards in JSON format, so that you can reopen them and continue editing them. Or edit in your chosen code editor.</div>
				</button>
				<button id="pdf" class="bubbleButton" @click="downloadPDF">
					Download PDF
					<div class="tooltip">Download your cards as a pdf, so that you can view them when offline.</div>
				</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["open"]);

const emit = defineEmits(["close", "downloadJSON", "downloadPDF"]);

function downloadJSON() {
	emit("downloadJSON");
}

function downloadPDF() {
	emit("downloadPDF");
}

function closePopup() {
	emit("close");
}
</script>
<style scoped>
#json {
	background-color: #FFB13355;
	border-color: #FFB133;
	font-size: 15px;
	margin-bottom: 5px;
}

#pdf {
	background-color: #F24B4B55;
	border-color: #F24B4B;
	font-size: 15px;
}

#buttons {
	display: flex;
	flex-direction: column;
}
</style>
