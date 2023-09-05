<script setup>
import data from "../data/eventData.json";
import { ref } from "vue";
import EventCard from "../components/EventCard.vue";

const eventList = ref(data);

</script>

<template>
	<div>
		<template v-for="event of eventList">
			<EventCard :event="event"></EventCard>
		</template>
	</div>
</template>

<style scoped></style>
