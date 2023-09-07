<script setup>
import { reactive } from "vue";
const followList = reactive([
	{ followName: "Investment", id: 1 },
	{ followName: "Tech", id: 2 },
	{ followName: "hackeerhouse", id: 3 },
	{ followName: "Hackathou", id: 4 },
]);
</script>

<template>
	<el-row class="follow">
		<div class="follow-left">
			<img src="https://p.qqan.com/up/2020-11/16058518983314374.jpg" alt="" />
		</div>
	</el-row>
</template>

<style scoped>
* {
	padding: 0;
	margin: 0;
}
.follow {
	position: relative;
	width: 100%;
	height: 400px;
	background: linear-gradient(to left, rgb(234, 235, 249) 20%, rgb(136, 141, 194) 80%);
	border-radius: 30px;
}
.follow-left {
	position: absolute;
	left: 200px;
	width: 120px;
	height: 120px;
}
.follow-left img {
	width: 100%;
	border-radius: 60px;
}
</style>
