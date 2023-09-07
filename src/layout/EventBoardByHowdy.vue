<script setup>
import data from "../data/eventData.json";
import { ref } from "vue";
import EventCard from "../components/EventCard.vue";

const eventList = ref(data);
</script>

<template>
	<div class="masonry-container">
		<div v-for="item in eventList" :key="item.id" class="masonry-item" :style="{ height: item.height + 'px' }">
			<EventCard :event="item" :key="item.id"></EventCard>
		</div>
	</div>
</template>

<style scoped>
.masonry-container {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding: 0 16px;
}

.masonry-item {
	flex-basis: calc(50% - 16px);
}

@media (min-width: 768px) {
	.masonry-item {
		flex-basis: calc(33.33% - 16px);
	}
}

@media (min-width: 1024px) {
	.masonry-item {
		flex-basis: calc(25% - 16px);
	}
}
@media (min-width: 1280px) {
	.masonry-item {
		flex-basis: calc(20% - 16px);
	}
}
</style>
