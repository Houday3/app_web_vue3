<script setup>
import { onMounted, ref } from "vue";
import { Close } from "@element-plus/icons-vue";
import { showDetail } from "../store/store";
import { useRoute } from "vue-router";
import data from "../data/eventData.json";

const route = useRoute();

const eventList = ref(data);
const event = eventList.value.find((event) => event.id === route.params.eventId);

onMounted(() => {
	console.log("mounted", event.id);
});
</script>

<template>
	<div class="modal-overlay" @click.self="showDetail = false">
		<div class="modal-content">
			<el-button class="button-close" @click="showDetail = false" :icon="Close" size="small" circle />
			<el-image class="cover" :src="event.cover" fit="cover">
				<template #placeholder>
					<div class="image-slot">Loading<span class="dot">...</span></div>
				</template></el-image
			>
			<div class="content-wrap">
				<h2 class="title">{{ event.title }}</h2>
				<el-descriptions :column="1" size="large">
					<el-descriptions-item label="Description">
						<p>{{ event.description }}</p></el-descriptions-item
					>
					<el-descriptions-item label="Location">{{ event.location }}</el-descriptions-item>
					<el-descriptions-item label="Start">{{ event.start }}</el-descriptions-item>
					<el-descriptions-item label="End">{{ event.end }}</el-descriptions-item>
					<el-descriptions-item label="Remarks">
						<el-tag size="small">School</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province </el-descriptions-item>
				</el-descriptions>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5); /* 蒙层 */
	display: flex;
	z-index: 5000;
	justify-content: center;
	align-items: center;
}

.modal-content {
	position: relative;
	overflow: hidden;
	overflow-y: auto;
	background-color: #fff;
	width: 80vw;
	max-width: 1000px;
	height: 90vh;
	border-radius: 10px;
	z-index: 5001;
}
.content-wrap {
	padding: 0 20px 20px 20px;
}
.button-close {
	position: absolute;
	top: 5px;
	right: 5px;
	z-index: 5999;
}
.cover {
	width: 100%;
	height: 400px;
}
</style>
