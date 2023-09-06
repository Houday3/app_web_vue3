<script setup>
import router from "./router";
import { detailEventId } from "./store/store";
import Home from "./layout/Home.vue";

router.push({ name: "Home" });
</script>

<template>
	<router-view></router-view>
</template>

<style scoped></style>
