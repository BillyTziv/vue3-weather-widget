<template>
    <div class="text-md px-1">
        {{ formattedHumidity.value }}{{ formattedHumidity.unit }}
    </div>
</template>

<script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        humidity: {
            type: Number,
            required: true,
        }
    });

    const formattedHumidity = {
        value: computed(() => props.humidity),
        unit: "%"
    };
</script>