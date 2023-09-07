<script setup>
import Header from "./Header.vue";
import { ArrowRightBold, ArrowLeftBold } from "@element-plus/icons-vue";
import EventBoardByHowdy from "../layout/EventBoardByHowdy.vue";
import EventBoardByDate from "../layout/EventBoardByDate.vue";
import DetailPage from "../layout/DetailPage.vue";
import { showDetail, bydate, detailEventId } from "../store/store";
import { onMounted, ref } from "vue";

const eventBoardByDate = ref();

const handleRight = () => {
	eventBoardByDate.value.goRight();
};
const handleLeft = () => {
	eventBoardByDate.value.goLeft();
};

onMounted(() => {});
</script>

<template>
	<DetailPage v-if="showDetail" :key="detailEventId"></DetailPage>
	<el-container :class="{ 'container-bydate': bydate }">
		<el-header :class="{ 'header-bydate': bydate }"> <Header></Header></el-header>
		<el-main :class="{ 'main-bydate': bydate }">
			<template v-if="bydate">
				<div class="button-wheel right" @click="handleRight()">
					<el-icon><ArrowRightBold /></el-icon>
				</div>
				<div class="button-wheel left" @click="handleLeft()">
					<el-icon><ArrowLeftBold /></el-icon>
				</div>
				<EventBoardByDate ref="eventBoardByDate"></EventBoardByDate>
			</template>
			<template v-else>
				<EventBoardByHowdy></EventBoardByHowdy>
			</template>
		</el-main>
		<el-footer :class="{ 'footer-bydate': bydate }">Footer</el-footer>
	</el-container>
</template>

<style scoped>
/* .container-bydate {
	height: 100vh;
	display: flex;
	flex-direction: column;
} */
.el-header,
.el-main,
.el-footer {
	padding: 0;
}
.el-header {
	height: fit-content;
}
.el-main {
	position: relative;
}
/* .main-bydate {
	flex-grow: 1;
} */
.button-wheel {
	width: 30px;
	height: 30px;
	position: absolute;
	top: 20px;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0.3;
}
.button-wheel:hover {
	opacity: 1;
	background: rgba(ff, ff, ff, 0.5);
}
.button-wheel.right {
	right: 20px;
}
.button-wheel.left {
	left: 20px;
}
</style>
