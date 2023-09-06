<script setup>
import { Picture } from "@element-plus/icons-vue";
</script>

<template>
	<div>
		<el-card class="box-card" :body-style="{ padding: '0px' }">
			<el-image class="image">
				<template #error>
					<el-icon><Picture /></el-icon>
				</template>
			</el-image>
			<div style="padding: 14px">
				<div class="top-span">
					<div>No Event</div>
				</div>
				<div class="bottom"></div>
			</div>
		</el-card>
	</div>
</template>

<style scoped>
.box-card {
	min-width: 240px;
	min-height: 240px;
}
.top-span {
	display: flex;
	justify-content: center;
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
	min-height: 150px;
	min-width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
