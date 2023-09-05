<script setup>
import { defineProps } from "vue";
import router from "../router";
import { showDetail } from "../store/store";

const props = defineProps(["event"]);

const event = props.event;

const handleClick = async () => {
	await router.push({ name: "Detail", params: { eventId: event.id } });
	showDetail.value = true;
};
</script>

<template>
	<div>
		<el-card class="box-card" :body-style="{ padding: '0px' }" @click="handleClick()">
			<img :src="event.cover" class="image" lazy />
			<div style="padding: 14px">
				<div class="top-span">
					<div>{{ event.name }}</div>
					<div>{{ event.location }}</div>
				</div>
				<div class="bottom">
					<time class="time">{{ event.start }}</time>
				</div>
			</div>
		</el-card>
	</div>
</template>

<style scoped>
.box-card {
	width: 360px;
	margin: 10px;
	cursor: pointer;
}
.top-span {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.time {
	font-size: 12px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.image {
	width: 100%;
	display: block;
}
</style>
