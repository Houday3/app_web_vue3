<script setup>
import data from "../data/eventData.json";
import { onMounted, onBeforeUnmount, ref } from "vue";
import dayjs from "dayjs";
import EventBoardByDateColumn from "../components/EventBoardByDateColumn.vue";

const eventList = data; //获取eventData.json中的数据

const eventsByDate = ref([]);
const eventsByDateShow = ref([]);
const eventsByDateShowFront = ref([]);
const eventsByDateShowBack = ref([]);
const today = dayjs().startOf("day");

let firstDate = today;
let lastDate = today;
let firstDateDiff = 0;
let lastDateDiff = 0;

for (let event of eventList) {
	const eventDate = dayjs(event.start).startOf("day");

	firstDateDiff = eventDate.diff(firstDate, "day");
	if (firstDateDiff < 0) {
		firstDate = eventDate;
	}
	lastDateDiff = eventDate.diff(lastDate, "day");
	if (lastDateDiff > 0) {
		lastDate = eventDate;
	}
}

for (let i = 0; i <= lastDate.diff(firstDate, "day"); i++) {
	const date = firstDate.add(i, "day").format("YYYY-MM-DD");
	eventsByDate.value.push({
		date: date,
		events: [],
	});
}

for (let event of eventList) {
	const eventDate = dayjs(event.start).startOf("day");
	const eventDataStr = eventDate.format("YYYY-MM-DD");
	const eventDateIndex = eventsByDate.value.findIndex((item) => item.date === eventDataStr);
	if (eventDateIndex === -1) {
		eventsByDate.value.push({
			date: eventDataStr,
			events: [event],
		});
	} else {
		eventsByDate.value[eventDateIndex].events.push(event);
	}
}

//将eventsByDate中的数据按照日期排序
let minColumnWidth = 256; // 每列的最小宽度
let columnCount; // 列数

const setColumnCount = () => {
	columnCount = Math.floor(window.innerWidth / minColumnWidth);
	columnCount = columnCount > 5 ? 5 : columnCount;
	// console.log(eventsByDate.value[0].date);
	//计算eventsByDate第一个元素的date与今天的差值
	let firstDateDiff = dayjs(eventsByDate.value[0].date).diff(today, "day");
	let start = firstDateDiff < 0 ? -firstDateDiff : 0;
	let end = start + columnCount;
	//设置eventsByDateShow
	eventsByDateShow.value = eventsByDate.value.slice(start, end);
	eventsByDateShowFront.value = eventsByDate.value.slice(start, start);
	eventsByDateShowBack.value = eventsByDate.value.slice(end, end + 1);
};
setColumnCount();

// 添加 resize 事件监听器
window.addEventListener("resize", () => {
	setColumnCount();
});

//加载eventsByDateShowBack
const loadEventsShowBack = (loadCount) => {
	let start, end, lastElement;
	if (eventsByDateShowBack.value.length === 0) {
		lastElement = eventsByDateShow.value[eventsByDateShow.value.length - 1];
	} else {
		lastElement = eventsByDateShowBack.value[eventsByDateShowBack.value.length - 1];
	}
	start = eventsByDate.value.findIndex((item) => item.date === lastElement.date) + 1;
	end = start + loadCount;
	eventsByDateShowBack.value.push(...eventsByDate.value.slice(start, end));
};

//加载eventsByDateShowFront
const loadEventsShowFront = (loadCount) => {
	let start, end, firstElement;
	if (eventsByDateShowFront.value.length === 0) {
		firstElement = eventsByDateShow.value[0];
	} else {
		firstElement = eventsByDateShowFront.value[0];
	}
	start = eventsByDate.value.findIndex((item) => item.date === firstElement.date) - loadCount;
	end = start + loadCount;
	start = start < 0 ? 0 : start;
	eventsByDateShowFront.value.unshift(...eventsByDate.value.slice(start, end));
};

const isReachEnd = async (event) => {
	console.log("wheel");
	const scrollContainer = document.querySelector(".masonry-container-wrapper"); // 替换为实际的滚动容器的选择器
	if (event.deltaX > 0) {
		const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
		console.log(scrollContainer.scrollLeft);
		if (scrollContainer.scrollLeft >= maxScrollLeft - 1) {
			console.log("Reached the end of the X axis.");
			// 加载eventsByDateShowBack
			loadEventsShowBack(3);
		}
	} else if (event.deltaX < 0) {
		if (scrollContainer.scrollLeft <= 0) {
			console.log("Reached the start of the X axis.");
			// 加载eventsByDateShowFront
			loadEventsShowFront(3);
		}
	}
};

const max = ref(0);
const value = ref(0);
const innerRef = ref();
const scrollbarRef = ref();

const wheelRight = new WheelEvent("wheel", {
	deltaX: 50,
	bubbles: true,
	cancelable: true,
});
const wheelLeft = new WheelEvent("wheel", {
	deltaX: -50,
	bubbles: true,
	cancelable: true,
});

const goRight = () => {
	const scrollContainer = document.querySelector(".masonry-container-wrapper");
	scrollContainer.scrollLeft += 1000;
	window.dispatchEvent(wheelRight);
	// scrollbarRef.value.setScrollLeft(50);
};
const goLeft = () => {
	const scrollContainer = document.querySelector(".masonry-container-wrapper");
	scrollContainer.scrollLeft += -1000;
	window.dispatchEvent(wheelLeft);
};

defineExpose({
	goRight,
	goLeft,
});

onMounted(() => {
	//监听鼠标滚轮事件
	window.addEventListener("wheel", isReachEnd);
	//el-scrollbar的高度设置
	// const view = scrollbarRef.value.$el.querySelector(".el-scrollbar__view");
	// view.style.height = `${scrollbarRef.value.$el.clientHeight + 10}px`;
});
onBeforeUnmount(() => {
	window.removeEventListener("wheel", isReachEnd);
	window.removeEventListener("resize", () => {});
});
</script>

<template>
	<el-scrollbar class="scroll-container" ref="scrollbarRef">
		<div class="masonry-container-wrapper">
			<div class="masonry-container front">
				<div v-for="(item, index) in eventsByDateShowFront" :key="index" class="masonry-column">
					<EventBoardByDateColumn :eventsByDateObj="item" :key="item.date"></EventBoardByDateColumn>
				</div>
			</div>
			<div class="masonry-container">
				<div v-for="(item, index) in eventsByDateShow" :key="index" class="masonry-column">
					<EventBoardByDateColumn :eventsByDateObj="item"></EventBoardByDateColumn>
				</div>
			</div>
			<div class="masonry-container back">
				<div v-for="(item, index) in eventsByDateShowBack" :key="index" class="masonry-column">
					<EventBoardByDateColumn :eventsByDateObj="item"></EventBoardByDateColumn>
				</div>
			</div>
		</div>
	</el-scrollbar>
</template>

<style scoped>
.scroll-container {
	height: fit-content;
	/* margin: 0 16px; */
	/* padding-bottom: 10px; */
}
.masonry-container-wrapper {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: scroll;
	padding-bottom: 10px;
}
.masonry-container {
	display: flex;
	height: 100%;
}
.masonry-column {
	min-width: 242px;
	display: flex;
	flex-direction: column;
	flex-basis: calc(50% - 16px);
	padding-left: 10px;
}
.el-scrollbar {
	flex-grow: 1;
	box-sizing: border-box;
}
.date-label {
	font-weight: bold;
	margin-bottom: 8px;
	text-align: center;
}
/*
@media (min-width: 768px) {
	.masonry-column {
		flex-basis: calc(33.33% - 16px);
	}
}

@media (min-width: 1024px) {
	.masonry-column {
		flex-basis: calc(25% - 16px);
	}
} */
.masonry-item {
	width: 100%;
	margin-bottom: 16px;
}
</style>
