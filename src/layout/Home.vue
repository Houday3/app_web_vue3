<script setup>
import Header from "./Header.vue";
import EventBoard from "../layout/EventBoard.vue";
import DetailPage from "../components/DetailPage.vue";
import { showDetail } from "../store/store";
import { onMounted } from "vue";

onMounted(() => {
	console.log("mounted");
});
</script>

<template>
	<DetailPage v-if="showDetail"></DetailPage>
	<div>
		<Header></Header>
	</div>
	<div>
		<EventBoard></EventBoard>
	</div>
</template>

<style scoped></style>
