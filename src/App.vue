<template>
	<!--
	<div>Welcome to flash-flip</div>
	<RouterLink to="/edit">Edit</RouterLink>
-->
	<RouterView />
</template>
<script setup>

import { RouterView/*, RouterLink*/ } from 'vue-router';

</script>
<style>
:root {
	--prim: #0B1119;
	--sec: #13202E;
	--text: #FFFFFF;
	--border: #656668;
	--btnBG: #13202E;
	--btnBorder: #6180BF;
	--errorBorder: #FF4C71;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/*text-align: center;*/
	color: var(--text);
	background-color: var(--prim);
	margin-top: 60px;
	margin: 0;
	padding: 0;
}

body {
	margin: 0;
	padding: 0;
}

* {
	color: var(--text);
}

body, textarea, .side, button, input {
	background-color: var(--prim);
}

input {
	padding: 5px;
	margin: 0;
	font-size: 15px;
	border: var(--border) 1px solid;
	border-radius: 5px 5px 0 0;
}

input:hover {
	border-bottom-color: color-mix(in srgb, var(--text) 50%, transparent);
	border-bottom-width: 2px;
}

input:focus {
	border-bottom-color: var(--text);
	border-bottom-width: 2px;
	outline: none;
}

textarea {
	resize: none;
	height: auto;
	font-size: 15px;
}

.iconButton {
	position: relative;
	font-size: 15px;
	border: none;
	background: none;
}

.margins {
	width: min(100vw - 80px, 800px);
	margin: 0 auto;
}

#cardEditCont {
	width: calc(100% - 30px);
}

.tableContent {
	width: calc(50% - 10px);
}

.tableContent textarea {
	width: calc(100% - 30px);
	margin-left: 10px;

	border: 1px solid var(--border);
	border-radius: 10px;
	padding: 10px;
}

.label {
	width: 10px;
}

.bubbleButton {
	padding: 15px;
	border: solid 1px var(--btnBorder);
	background-color: var(--btnBG);
	font-size: 15px;
	border-radius: 10px;
	white-space: nowrap;
	margin-left: 0;
	margin-right: 0;
}

.bubbleButton i {
	color: inherit;
}

.fullWidth {
	margin-left: 8px;
	width: calc(100% - 48px);
}

.tooltip {
	position: absolute;
	right: 100%;
	font-size: 15px;
	white-space: nowrap;
	background-color: rgb(30,30,30);
	color: white;
	padding: 5px;
	pointer-events: none;
	border-radius: 8px 0 8px 8px;
	transition: opacity 0.1s linear 0.4s;
	transition-delay: 0s;
	opacity: 0;
	min-width: 200px;
	max-width: 1000px;
	text-wrap: wrap;
	text-align: left;
}

.right {
	left: 100%;
}

.left {
	right: 100%;
}

.iconButton:hover .tooltip, button:hover .tooltip {
	opacity: 1;
	transition-delay: 0.8s;
}

.popupCont {
	transition: opacity 0.2s;
	display: flex;
	z-index: 5;
}

.open {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
}

.closed {
	opacity: 0;
	pointer-events: none;
}

.popup {
	background-color: var(--prim);
	border: solid 1px var(--border);
	padding: 20px;
	padding-top: 40px;
	border-radius: 20px;
	width: auto;

	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 15px;
}

.popup .iconButton {
	position: absolute;
	top: 5px;
	right: 5px;
}

.updown {
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: auto 0;
}

.updown button {
	margin: -5px;
}
</style>
