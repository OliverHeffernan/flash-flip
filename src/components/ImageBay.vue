<template>
	<div id="bay" :class="open ? 'bayopen' : 'bayclosed'">
		<div id="icons">
			<button @click="open = !open" class="iconButton">
				<i class="fa-solid fa-images"></i>
				<div class="tooltip">Open or close the image sidebar. Use images in your flashcards.</div>
			</button>
			<button @click="openFileOpener" class="iconButton">
				<i class="fa-solid fa-arrow-up-from-bracket"></i>
				<div class="tooltip">Upload file from hard drive</div>
			</button>
			<button @click="openDownloader" class="iconButton">
				<i class="fa-solid fa-download"></i>
				<div class="tooltip">Download cards as JSON or pdf.</div>
			</button>
		</div>
		<div class="content">
			Image bay not yet implemented. To get images in your cards, you can use the html tag &lt;img src="url of image" width="300px" height="auto"&gt;
			<table>
				<tr>
					<td>Code</td>
					<td>Description</td>
					<td>URL</td>
				</tr>
				<tr v-for="(img, index) in imgs" :key="index">
					<td>i{{ img.code }}</td>
					<td>
						<input type="text" v-model="img.description">
					</td>
					<td>
						<input :id="`url${img.code}`" type="text" v-model="img.url">
					</td>
					<td>
						<button class="iconButton" @click="removeImg(img.code)">
							<i class="fa-solid fa-trash"></i>
						</button>
					</td>
				</tr>
			</table>
			<button @click="addImg">Add image</button>
		</div>
	</div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["fileOpener", "downloader"]);

const open = ref(false);

let nextCode = 1;

const imgs = ref([
	{
		code: 0,
		description: "",
		url: ""
	}
]);

const openFileOpener = () => {
	console.log("emit");
	emit('fileOpener', 'yoyo');
}

const openDownloader = () => {
	emit('downloader', 'yoyo');
}

function removeImg(index) {
	let found = false;
	let value;
	for (let i = 0; i < imgs.value.length; i ++) {
		if (imgs.value[i].code == index) {
			found = true;
			value = i;
			break;
		}
	}
	if (!found) {
		return;
	}
	console.log("found");
	imgs.value.splice(value, 1);
}

function addImg() {
	imgs.value.push({
		code: nextCode++,
		description: "",
		url: ""
	});
}
</script>

<style scoped>
#bay {
	position: fixed;
	right: 0;
	top: 0;
	height: 100%;
	border-left: 1px solid var(--border);
	z-index: 3;
	background-color: var(--prim);

	transition: all 0.2s;
}

.bayopen {
	width: min(90%, 500px);
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.bayclosed {
	width: 30px;
}

.content {
	position: absolute;
	top: 10px;
	left: 40px;
}

#icons {
	width: 30px;
	display: block;
}
</style>
