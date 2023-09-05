<script setup>
import router from "../router";

const handleClick = async () => {
	await router.push({ name: "Home" });
};
</script>

<template>
	<div>
		<div class="logo" @click="handleClick()"><h1>HOWDY3 Header</h1></div>
	</div>
</template>

<style scoped>
.logo {
	cursor: pointer;
	width: fit-content;
}
</style>
