<template>
    <div class="flex items-center">
        <span class="text-6xl font-normal">{{ roundedTemperature.value }}</span>
    </div>
    <div class="flex items-top">
        <span class="text-2xl font-light">{{ roundedTemperature.unit }}</span>
    </div>
</template>

<script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        temperature: {
            type: Number,
            required: true,
        }
    });

    const roundedTemperature = {
        value: computed(() => Math.round(props.temperature)),
        unit: "°C"
    };
</script>