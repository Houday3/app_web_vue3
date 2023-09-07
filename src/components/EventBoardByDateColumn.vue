<script setup>
import dayjs from "dayjs";
import EventCard from "../components/EventCard.vue";
import NoEventCard from "../components/NoEventCard.vue";
import { defineProps } from "vue";

const props = defineProps(["eventsByDateObj"]);
const eventsByDateObj = props.eventsByDateObj;
const today = dayjs().startOf("day");

const formatDate = (date) => {
	if (dayjs(date).isSame(today, "day")) return "Today";
	//判断是否是明天
	else if (dayjs(date).isSame(today.add(1, "day"), "day")) return "Tomorrow";
	else return dayjs(date).format("DD");
};
</script>

<template>
	<div class="date-column-wrapper">
		<span class="date-label">{{ dayjs(eventsByDateObj.date).format("ddd") }}</span>
		<span class="date-label underline">{{ formatDate(eventsByDateObj.date) }}</span>
		<el-scrollbar class="bydate-column-scrollbar">
			<div class="bydate-column-scrollbar-wrapper">
				<template v-if="eventsByDateObj.events.length === 0">
					<NoEventCard></NoEventCard>
				</template>
				<template v-else>
					<div v-for="event in eventsByDateObj.events" :key="event.id" class="masonry-item">
						<EventCard :event="event" :eventId="event.id"></EventCard>
					</div>
				</template>
			</div>
		</el-scrollbar>
	</div>
</template>

<style scoped>
.date-column-wrapper {
	height: max-content;
	display: flex;
	flex-direction: column;
}
.bydate-column-scrollbar {
	padding-right: 10px;
	height: 775px;
}
.bydate-column-scrollbar-wrapper {
	overflow-x: hidden;
}
.date-label {
	font-weight: bold;
	margin-bottom: 8px;
	text-align: center;
}
.underline {
	position: relative;
	overflow: visible;
	padding-bottom: 8px;
}
.underline::after {
	content: "";
	position: absolute;
	left: 0; /* 从父元素左边界开始 */
	right: 0; /* 至父元素右边界 */
	bottom: 0; /* 放在底部 */
	height: 1px;
	background-color: #333;
	margin-left: -8px;
	margin-right: -8px;
}
.masonry-item {
	width: 100%;
	margin-bottom: 16px;
}
.masonry-item:first-child {
	margin-top: 8px;
}
</style>
