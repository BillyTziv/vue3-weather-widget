<template>
    <div class="text-lg font-light">
        {{ formattedDate }}
    </div>
</template>

<script setup>
    import { ref, defineProps, watchEffect } from 'vue';

    const props = defineProps({
        day: {
            type: Number,
            required: true
        }
    });

    const formattedDate = ref(null);

    watchEffect(() => {
        formattedDate.value = formatDate(props.day);
    });

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const day = getDayOfWeek(date.getDay());
        return `${day}`;
    }

    function getDayOfWeek(dayIndex) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek[dayIndex];
    }
</script>