<template>
	<!-- the right side bar -->
	<ImageBay 
		@fileOpener="fileOpener = true"
		@downloader="downloader = true"
	/>

	<SavePanel v-if="title" :cards="cardSet" :title="title" />
	<LoadingView v-if="loading" />
	
	<div class="margins">
		<!-- a modal box for opening files -->
		<FileOpener
			:open="fileOpener"
			@close="fileOpener = false"
			@openFile="readFileAsString"
		/>
		<!-- a modal box for downloading files -->
		<DownloaderPopup
			:open="downloader"
			@close="downloader = false"
			@downloadJSON="logJSON"
			@downloadPDF="downloadPDF"
		/>
		<!-- the card edit table -->
		<table v-if="editing" id="cardEditCont">
			<!-- repeating for each card -->
			<tr class="cardedit"
				v-for="(card, index) in cardSet"
				:key="index"
			>
				<td class="label">{{index + 1}}.</td>
				<!-- question edit -->
				<td class="tableContent">
					<textarea
						@keyup.enter="onQuestionEnter(index)"
						class="questionInput"
						type="text"
						v-model="card.question"
						placeholder="question"
						@input="resize($event.target)"
					/>
				</td>
				<!-- answer edit -->
				<td class="tableContent">
					<textarea
						@keyup.enter="onAnswerEnter"
						type="text"
						class="answerInput"
						v-model="card.answer"
						placeholder="answer"
						@input="resize($event.target)"
					/>
				</td>
				<!-- delete button -->
				<td class="tableContent">
					<button
						class="iconButton"
						v-if="index != 0 || cardSet.length > 1"
						@click="removeCard(index)"
					>
						<i class="fa-solid fa-trash"></i>
						<div class="tooltip left">Remove the card.</div>
					</button>
				</td>
				<!-- Shift up and down buttons -->
				<td class="tableContent">
					<div class="iconButton updown">
						<button
							class="iconButton"
							v-if="cardSet.length > 1 && index != 0"
							@click="shiftCard(index, -1)"
						>
							<i class="fa-solid fa-chevron-up"></i>
							<div class="tooltip left">Shift this card up one position.</div>
						</button>
						<button
							class="iconButton"
							v-if="(index != 0 || cardSet.length > 1) && index != cardSet.length - 1"
							@click="shiftCard(index, 1)"
						>
							<i class="fa-solid fa-chevron-down"></i>
							<div class="tooltip left">Shift this card down one position.</div>
						</button>
					</div>
				</td>
			</tr>
			<!-- hide and show the table -->
			<button class="iconButton" @click="editing = !editing">
				<i :class="editing ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
				<div class="tooltip right">Show/hide the card edit boxes.</div>
			</button>
		</table>
		<button v-if="editing" class="bubbleButton fullWidth" @click="newCard">
			<i class="fa-solid fa-plus"></i> Add card
		</button>
		<button v-if="!editing" class="iconButton" @click="editing = !editing">
			<i :class="editing ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
		</button>
		<!--<button class="iconButton" @click="doShuffle"><i class="fa-solid fa-shuffle"></i></button>-->
		<CardView @shuffle="doShuffle" :cardSet="cardSet" />
	</div>
</template>

<script setup>
import { ref, nextTick, defineProps, onMounted } from "vue";
import CardView from "../components/CardView.vue";
import ImageBay from "../components/ImageBay.vue";
import DownloaderPopup from "../components/DownloaderPopup.vue";
import FileOpener from "../components/FileOpener.vue";
import SavePanel from "../components/SavePanel.vue";
import LoadingView from "./LoadingView.vue";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase';

const props = defineProps(['set_id']);

onMounted(async () => {
	console.log("set_id: ", props.set_id);
	if (props.set_id == "null"){
		title.value = "Untitled Set";
		loading.value = false;
		return;
	}
	
	const { data, error } = await supabase
		.from('sets')
		.select()
		.eq('id', props.set_id);
	console.log("data: ", data);
	console.log("error: ", error);

	if (error) {
		loading.value = false;
		return;
	}
	if (!data) {
		loading.value = false;
		return;
	}
	cardSet.value = JSON.parse(data[0].set_data).cards;
	title.value = data[0].title;
	loading.value = false;
});

const editing = ref(true);

const emptyCard = {
	question: "",
	answer: ""
};

const fileOpener = ref(false);
const downloader = ref(false);

const title = ref(null);
const cardSet = ref([{... emptyCard}]);
const loading = ref(true);

/**
 * add an empty card
 */
function newCard() {
	cardSet.value.push({... emptyCard});
}

/**
 * Move the card to a different position. Relative.
 * index is the current index of the card.
 * dir should be either 1 or -1. 1 moving it down, and -1 moving it up.
 */
function shiftCard(index, dir) {
	if (index > cardSet.value.length - 1 || index < 0) { return; }

	const newIndex = index + dir;
	if (newIndex >= cardSet.value.length || newIndex < 0) { return; }

	const elm = cardSet.value[index];
	cardSet.value.splice(index, 1);
	cardSet.value.splice(newIndex, 0, elm);
}

/**
 * download the json file
 */
function logJSON() {
	const content = JSON.stringify({ "cards": cardSet.value });
	downloadTextFile(content, "set.flsh");
}

/**
 * loads the file from file input
 */
const readFileAsString = async (payload) => {
	console.log(payload);
	cardSet.value = payload;
	await nextTick()
	resizeAll();
};

/**
 * downloads a textfile. Used to download the json file
 */
function downloadTextFile(content, fileName) {
	const blob = new Blob([content], { type: 'text/plain' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}

/**
 * creates and downloads the pdf.
 */
async function downloadPDF() {
	// setting up the pdf
	const pdf = new jsPDF('l', 'mm', 'a4');
	const width = pdf.internal.pageSize.getWidth();
	const height = pdf.internal.pageSize.getHeight();
	const options = {
		scale: 2,
		dpi: 300,
		logging: false,
		useCORS: true,
		allowTaint: false,
		backgroundColor: '#FFFFFF',
		scrollX: 0,
		scrollY: 0,
		ignoreElements: (el) => el.tagName === 'SCRIPT'
	};

	// getting all of the elements that will be rendered in the pdf
	const elms = document.getElementsByClassName("side");

	// looping through the elements
	for (let i = 0; i < elms.length; i++) {
		// getting the element
		const elm = elms[i];
		// remembering it's original transform, so that we can revert it after.
		const ogTransform = elm.style.transform;

		// setting it's transform to none, so that it is facing forward.
		elm.style.transform = 'none';
		// taking the element and converting it to a canvas.
		const canvas = await html2canvas(elm, options);
		// reverting the transform
		elm.style.transform = ogTransform;
		// converting the canvas to an image, that can be used in the pdf.
		const imgData = canvas.toDataURL('image/png');

		// add the image to the pdf
		pdf.addImage(imgData, 'PNG', 0, 0, width, height);

		// if it is not the last image to be added, add a page to the pdf.
		if (i != elms.length - 1) {
			pdf.addPage();
		}
	}
	// download the pdf
	pdf.save('cards.pdf');
}

/**
 * apply a shuffle to the cardSet
 */
function doShuffle() {
	cardSet.value = shuffleCards([...cardSet.value]);
}

/**
 * shuffle a card set, returns the shuffled version
 */
function shuffleCards(set) {
	let shuffled = [];
	while (set.length > 0) {
		const random = Math.floor(Math.random() * set.length);
		shuffled.push(set[random]);
		set.splice(random, 1);
	}

	return shuffled;
}

// remove card from the card set, given the index.
function removeCard(index) {
	if (index == 0 && cardSet.value.length == 1) {
		return;
	}
	cardSet.value.splice(index, 1);
}

/**
 * when enter is pressed on the question field, it should shift focus to the answer
 */
function onQuestionEnter(index) {
	//let thing = document.getElementsByClassName('questionInput')[index].value;
	let thing = cardSet.value[index].question;
	if (thing.endsWith("\n\n")) {
		// remove the double line break from the textarea
		//document.getElementsByClassName('questionInput')[index].value = thing.substring(0, thing.length - 2);
		cardSet.value[index].question = thing.substring(0, thing.length - 2);
		// focus on the answer
		document.getElementsByClassName('answerInput')[index].focus();
	}
}

/**
 * When enter is pressed on the answer field, it should create a new card,
 * and then focus on the new card s question
 */
async function onAnswerEnter() {
	const index = cardSet.value.length - 1;
	//let thing = document.getElementsByClassName('answerInput')[index].value;
	let thing = cardSet.value[index].answer;
	if (thing.endsWith("\n\n")) {
		// remove the double line break from the textarea
		cardSet.value[index].answer = thing.substring(0, thing.length - 2);
		// create the new card, then wait for it to be created, then focus on its question
		newCard();
		await nextTick();
		document.getElementsByClassName("questionInput")[cardSet.value.length - 1].focus();
	}
}

/**
 * Resize a given textarea based on it's content.
 */
function resize(el) {
	el.style.height = 'auto';
	el.style.height = el.scrollHeight + 'px';
}

/**
 * apply the resize method on all textareas.
 */
function resizeAll() {
	const elms = document.getElementsByTagName("textarea");
	for (let i = 0; i < elms.length; i++) {
		resize(elms[i]);
	}
}
</script>

<style scoped>
.side {
	background-color: var(--prim);
}
</style>
