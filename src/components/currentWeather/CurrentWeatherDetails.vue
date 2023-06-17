<template>
    <div v-if="weatherInfo" class="flex flex-col md:flex-row lg:flex-row xl:flex-row my-5">
        <div class="grid grid-cols-2 gap-x-3 px-4">
            <label class="font-light">{{ weatherInfo.feelsLike.label }}</label>
            <span class="font-bold">: {{ weatherInfo.feelsLike.value }} {{ weatherInfo.feelsLike.unit }}</span>

            <label class="font-light">{{ weatherInfo.pressure.label }}</label>
            <span class="font-bold">: {{ weatherInfo.pressure.value }} {{ weatherInfo.pressure.unit }}</span>

            <label class="font-light">{{ weatherInfo.humidity.label }}</label>
            <span class="font-bold">: {{ weatherInfo.humidity.value }} {{ weatherInfo.humidity.unit }}</span>
        </div>

        <div class="grid grid-cols-2 gap-x-3 px-4">
            <label class="font-light">{{ weatherInfo.windSpeed.label }}</label>
            <span class="font-bold">: {{ weatherInfo.windSpeed.value }} {{ weatherInfo.windSpeed.unit }}</span>

            <label class="font-light">{{ weatherInfo.windDeg.label }}</label>
            <span class="font-bold">: {{ weatherInfo.windDeg.value }} {{ weatherInfo.windDeg.unit }}</span>

            <label class="font-light">{{ weatherInfo.clouds.label }}</label>
            <span class="font-bold">: {{ weatherInfo.clouds.value }} {{ weatherInfo.clouds.unit }}</span>
        </div>
    </div>
</template>

<script setup>
   import { ref, defineProps, watchEffect } from 'vue';

    const props = defineProps({
        feelsLike: { type: Number, required: true },
        pressure: { type: Number, required: true },
        humidity: { type: Number, required: true },
        windSpeed: { type: Number, required: true },
        windDeg: { type: Number, required: true },
        clouds: { type: Number, required: true },
    });

    const weatherInfo = ref(null);

    watchEffect(() => {
        weatherInfo.value = {
            feelsLike: { label: "Feels Like", value: parseInt(props.feelsLike), unit: "°C" },
            pressure: { label: "Pressure", value: props.pressure, unit: "hPa" },
            humidity: { label: "Humidity", value: props.humidity, unit: "%" },
            windSpeed: { label: "Wind Speed", value: props.windSpeed, unit: "m/s" },
            windDeg: { label: "Wind Degrees", value: props.windDeg, unit: "deg" },
            clouds: { label: "Clouds", value: props.clouds, unit: "%" },
        };
    });
</script>