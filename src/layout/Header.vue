<script setup>
import { ref } from "vue";
import router from "../router";
import { bydate } from "../store/store";

const handleClick = async () => {
	await router.push({ name: "Home" });
};
</script>

<template>
	<div class="header-wrap">
		<div class="logo" @click="handleClick()"><h1>HOWDY3 Header</h1></div>
		<el-switch v-model="bydate" active-text="by Date" inactive-text="by Howdy" />
	</div>
</template>

<style scoped>
.header-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.logo {
	cursor: pointer;
	width: fit-content;
}
</style>
