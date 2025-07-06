<template>
	<div class="wrapper">
		<div
			id="cont"
			class="cont cardCont"
			:class="flipped ? 'flipped' : 'notflipped'"
			@click="flipped = !flipped"
			ref="cont"
		>
			<div ref="question" class="question side">
				<div
					class="center"
					v-html="`Q: ${getHtml(card.question)}`"
					:style="{
						transform: `scale(${qScale})`
					}"
				>
				</div>
				<div
					v-if="index==0"
					class="clickTip"
				>
					Click the card to flip to answer.
				</div>
			</div>
			<div ref="answer" class="answer side">
				<div
					class="center"
					v-html="`A: ${getHtml(card.answer)}`"
					:style="{
						transform: `scale(${aScale})`
					}"
				>
				</div>
			</div>
			<!--<button @click="flipped = !flipped">Flip</button>-->
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import DOMPurify from 'dompurify';

defineProps(["card", "index"]);

const flipped = ref(false);

const qScale = ref(1);
const aScale = ref(1);

/**
 * Sanitizes a given string, to avoid XSS.
 * Allows some tags, so that people can style their cards, but avoids XSS.
 */
function getHtml(text) {
	// check for malicious html injection
	let result = DOMPurify.sanitize(text, {
		ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'img', 'sup', 'sub'],
		ALLOWED_ATTR: ['href', 'title']
	});

	return result.replaceAll("\n", "<br>");
}
</script>

<style>

.clickTip {
	position: absolute;
	bottom: 20px;
	width: 100%;
	text-align: center;
	opacity: 30%;
	transition: opacity 0.2s;
}

.wrapper {
	scroll-snap-align: center;
	perspective: 1000px;
	height: 100%;
	width: 100%;
	flex: 0 0 100%;
}

.cardImg {
	height: 100px;
	width: auto;
}

#cont {
	height: calc(100% - 200px);
	width: calc(100% - 20px);
	text-align: center;
	/*border: 1px grey solid;*/
	position: relative;

	transition: transform 0.8s;

	flex: 0 0 100%;
	perspective: 1000px;
	margin: 0;
	transform-origin: center;
	transform-style: preserve-3d;
	margin: 100px 10px;
}

.nex, .prev {
	display: none;
}
.nex {
	transform: translateX(100vw);
}

.prev {
	transform: translateX(-100vw);
}

.center {
	position: absolute;
	top: 50%;
	width: 100%;
	transform: translateY(-50%);
}

.question, .answer {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	overflow: hidden;
	transition: transform 0.5s;
	/*background-color: white;*/

	border: 1px grey solid;
	border-radius: 10px;
	backface-visibility: hidden;

	white-space: normal;
	word-wrap: break-word;
	scale: 95%;
}

.question:hover .clickTip, .answer:hover .clickTip {
	opacity: 50%;
}

.question {
	transform: rotateY(0deg);
}

.answer {
	transform: rotateY(180deg);
}

.flipped {
	transform: rotateY(180deg);
}

</style>
