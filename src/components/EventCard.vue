<script setup>
import { defineProps, ref } from "vue";
import router from "../router";
import { showDetail } from "../store/store";
import dayjs from "dayjs";

const props = defineProps(["event"]);

const event = props.event;
const showInfo = ref(false);

const handleClick = async () => {
	await router.push({ name: "Detail", params: { eventId: event.id } });
	showDetail.value = true;
};

window.addEventListener("resize", () => {});
</script>

<template>
	<div class="square-wrapper">
		<el-card
			class="box-card"
			:style="{ backgroundImage: `url(${event.cover})` }"
			shadow="always"
			@mouseover="showInfo = true"
			@mouseleave="showInfo = false"
			@click="handleClick()"
		>
			<div class="info-wrapper" v-show="showInfo">
				<div class="info title">{{ event.name }}</div>
				<div class="info location">{{ event.location }}</div>
				<time class="info time">{{ dayjs(event.start).format("YYYY/MM/DD") + " - " + dayjs(event.end).format("YYYY/MM/DD") }}</time>
			</div>
		</el-card>
	</div>
</template>

<style scoped>
.square-wrapper {
	min-width: 240px;
	padding-top: 50%;
	padding-bottom: 50%;
	position: relative;
}
.box-card {
	cursor: pointer;
	position: absolute; /* 设置绝对定位 */
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-size: cover;
	background-position: center top;
	border-radius: 10px;
}
.box-card:hover::after {
	content: "";
	position: absolute; /* 设置绝对定位 */
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.8);
}
.info-wrapper {
	position: absolute; /* 设置绝对定位 */
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	color: #fff;
	z-index: 2;
	display: flex;
	flex-direction: column;
	justify-content: end;
	padding-left: 16px;
	padding-bottom: 16px;
}
.info {
	margin-bottom: 8px;
}
.title {
	font-size: 16px;
	font-weight: bold;
}
.location {
	font-size: 12px;
}
.time {
	font-size: 12px;
	color: #999;
}

.image {
	width: 100%;
	display: block;
}

@media (max-width: 480px) {
	.square-wrapper {
		min-width: 100px;
	}
}
</style>
