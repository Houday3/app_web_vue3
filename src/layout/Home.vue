<script setup>
import Header from "./Header.vue";
import EventBoardByHowdy from "../layout/EventBoardByHowdy.vue";
import EventBoardByDate from "../layout/EventBoardByDate.vue";
import DetailPage from "../layout/DetailPage.vue";
import { showDetail, bydate } from "../store/store";
import { onMounted } from "vue";

onMounted(() => {
	console.log("mounted");
});
</script>

<template>
	<DetailPage v-if="showDetail"></DetailPage>
	<el-container :class="{ 'container-bydate': bydate }">
		<el-header :class="{ 'header-bydate': bydate }"> <Header></Header></el-header>
		<el-main :class="{ 'main-bydate': bydate }">
			<template v-if="bydate">
				<EventBoardByDate></EventBoardByDate>
			</template>
			<template v-else>
				<EventBoardByHowdy></EventBoardByHowdy>
			</template>
		</el-main>
		<el-footer :class="{ 'footer-bydate': bydate }">Footer</el-footer>
	</el-container>
</template>

<style scoped>
.container-bydate {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.header-bydate {
}
.main-bydate {
	flex-grow: 1;
}
.footer-bydate {
}
</style>
