<script setup>
import { Location, Search, Avatar } from "@element-plus/icons-vue";
import router from "../router";
import { showLogin, bydate, isLogin } from "../store/store";
import { reactive, ref } from "vue";
import eventData from "../data/eventData.json";

const searchInput = ref("");
const locationArr = ref([]);
const tagArr = ref([]);

const extractArr = () => {
	let i = 0,
		j = 0;
	for (const event of eventData) {
		if (!locationArr.value.includes(event.location) && i < 6) {
			locationArr.value.push(event.location);
			i++;
		}
		for (const tag of event.tag) {
			if (!tagArr.value.includes(tag) && j < 7) {
				tagArr.value.push(tag);
				j++;
			}
		}
		if (i >= 6 && j >= 6) break;
	}
	return { locationArr, tagArr };
};
extractArr();

const goHome = () => {
	router.push("/");
};

const Login = () => {
	showLogin.value = true;
};
const goProfile = () => {
	router.push({ name: "Profile", query: { userId: "u71929hf19h319f" } });
};
</script>

<template>
	<div class="header-wrapper">
		<div class="top-wrapper">
			<div class="top-wrapper-row">
				<div class="top-wrapper-row-logo" @click="goHome()">
					<img src="../assets/logo.svg" alt="Howdy3" style="width: 200px" />
				</div>
				<template v-if="isLogin">
					<div class="top-wrapper-row-login" @click="goProfile()">
						<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
					</div>
				</template>
				<template v-else>
					<div class="top-wrapper-row-login" @click="Login()">
						<el-button :icon="Avatar" round>登录</el-button>
					</div>
				</template>
			</div>
		</div>
		<div class="bottom-wrapper">
			<div class="first-row row">
				<div class="label" for="">Tags</div>
				<div class="tags-wrapper">
					<el-button class="tag" plain v-for="item in tagArr" :key="item.id">{{ item }}</el-button>
				</div>
			</div>
			<div class="second-row row">
				<div class="label" for="">Location</div>
				<div class="tags-wrapper">
					<el-button class="tag" plain v-for="item in locationArr" :key="item.id" :icon="Location">{{ item }}</el-button>
				</div>
			</div>
			<div class="function-row row">
				<div class="label" for="">Filter</div>
				<div class="function-wrapper">
					<el-input v-model="searchInput" :prefix-icon="Search" placeholder="Search for filter/name/date/region..." class="search-bar"> </el-input>
					<el-switch v-model="bydate" active-text="by Date" inactive-text="by Howdy" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.header-wrapper {
	position: relative;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 80%), url("../assets/header.png") no-repeat center right;
	background-size: cover;
	width: 100%;
	height: 500px;
}
.top-wrapper {
	position: relative;
}
.top-wrapper-row {
	display: flex;
	justify-content: space-between;
}
.top-wrapper-row-logo {
	cursor: pointer;
}
.top-wrapper-row-login {
	margin: 10px 20px;
	cursor: pointer;
}

.bottom-wrapper {
	padding: 0 16px;
}
.row {
	display: flex;
	flex-direction: row;
}
.tag {
	margin: 0 0 10px 10px !important;
}
.first-row,
.second-row {
	justify-content: start;
}
.function-row {
	justify-content: space-between;
}
.function-wrapper {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.search-bar {
	width: 250px;
	margin: 0 0 10px 10px;
}
.label {
	margin-left: 10px;
	min-width: 100px;
	height: 100%;
}
</style>
