<template>
	<ImageBay />
	<input type="file" ref="fileInput" id="fileInput" accept=".flsh">
	<button @click="readFileAsString">Load File</button>
	<table v-if="editing" id="cardEditCont">
		<tr class="cardedit"
			v-for="(card, index) in cardSet"
			:key="index"
		>
			<td>{{index + 1}}.</td>
			<td>
				<textarea
					@keyup.enter="onQuestionEnter(index)"
					class="questionInput"
					type="text"
					v-model="card.question"
					placeholder="question"
					@input="resize($event.target)"
				/>
			</td>
			<td>
				<textarea
					@keyup.enter="onAnswerEnter"
					type="text"
					class="answerInput"
					v-model="card.answer"
					placeholder="answer"
					@input="resize($event.target)"
				/>
			</td>
			<td>
				<button
					class="iconButton"
					v-if="index != 0 || cardSet.length > 1"
					@click="removeCard(index)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
			</td>
		</tr>
		<button class="iconButton" @click="editing = !editing">
			<i :class="editing ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
		</button>
		<button class="iconButton" @click="newCard">
			<i class="fa-solid fa-plus"></i>
		</button>
	</table>
	<button v-if="!editing" class="iconButton" @click="editing = !editing">
		<i :class="editing ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
	</button>
	<button @click="doShuffle">Shuffle</button>
	<button @click="logJSON">Download JSON</button>
	<button @click="downloadPDF">Download as pdf</button>
	<CardView :cardSet="cardSet" />
</template>

<script setup>
import { ref, nextTick } from "vue";
import CardView from "./components/CardView.vue";
import ImageBay from "./components/ImageBay.vue";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const editing = ref(true);

const emptyCard = {
	question: "",
	answer: ""
};

let cardSet = ref([{... emptyCard}]);

function newCard() {
	cardSet.value.push({... emptyCard});
}

function logJSON() {
	const content = JSON.stringify({ "cards": cardSet.value });
	downloadTextFile(content, "set.flsh");
}

const fileInput = ref();
function readFileAsString() {
	const file = fileInput.value.files[0];

	const reader = new FileReader();

	reader.onload = function(e) {
		console.log(e.target.result);
		cardSet.value = JSON.parse(e.target.result).cards;
		console.log(cardSet.value);
	}
	reader.onerror = function(e) {
		console.log("An error occured", e);
	}
	reader.readAsText(file);
}

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

async function downloadPDF() {
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
		scrollY: 0,/*
		windowWidth: element.scrollWidth,
		windowHeight: element.scrollHeight,*/
		ignoreElements: (el) => el.tagName === 'SCRIPT'
	};

	const elms = document.getElementsByClassName("side");
	for (let i = 0; i < elms.length; i++) {
		const ogTransform = elms[i].style.transform;
		elms[i].style.transform = 'none';
		const canvas = await html2canvas(elms[i], options);
		elms[i].style.transform = ogTransform;

		const imgData = canvas.toDataURL('image/png');

		pdf.addImage(imgData, 'PNG', 0, 0, width, height);

		if (i != elms.length - 1) {
			pdf.addPage();
		}
	}
	pdf.save('cards.pdf');
}

function doShuffle() {
	cardSet.value = shuffleCards([...cardSet.value]);
}

function shuffleCards(set) {
	let shuffled = [];
	while (set.length > 0) {
		const random = Math.floor(Math.random() * set.length);
		shuffled.push(set[random]);
		set.splice(random, 1);
	}

	console.log(shuffled);
	return shuffled;
}

function removeCard(index) {
	if (index == 0 && cardSet.value.length == 1) {
		return;
	}
	cardSet.value.splice(index, 1);
}

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

async function onAnswerEnter() {
	const index = cardSet.value.length - 1;
	//let thing = document.getElementsByClassName('answerInput')[index].value;
	let thing = cardSet.value[index].answer;
	if (thing.endsWith("\n\n")) {
		// remove the double line break from the textarea
		//document.getElementsByClassName('answerInput')[index].value = thing.substring(0, thing.length - 2);
		cardSet.value[index].answer = thing.substring(0, thing.length - 2);
		// create the new card, then wait for it to be created, then focus on its question
		newCard();
		await nextTick();
		document.getElementsByClassName("questionInput")[cardSet.value.length - 1].focus();
	}
}

function resize(el) {
	el.style.height = 'auto';
	el.style.height = el.scrollHeight + 'px';
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}

textarea {
	resize: none;
	height: auto;
}

.iconButton {
	font-size: 15px;
	border: none;
	background: none;
}
</style>
