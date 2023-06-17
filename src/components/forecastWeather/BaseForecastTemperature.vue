<template>
    <div class="text-md px-1">
        {{ meanTemperature }}
    </div>
</template>
  
<script setup>
    import { defineProps, computed } from 'vue';
  
    const props = defineProps({
        temperature: {
            type: Object,
            required: true,
        }
    });
  
    const meanTemperature = computed(() => {
        const averageTemperature = (props.temperature.day + props.temperature.night) / 2;
        return formatTemperature(averageTemperature);
    });
    
    function formatTemperature(temperature) {
        return `${temperature.toFixed(0)}°C`;
    }
</script>