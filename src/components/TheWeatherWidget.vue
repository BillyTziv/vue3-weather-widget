<template>
  <div class="fullpage-bg h-screen flex justify-center items-center ">
    <div class="container mx-auto max-w-5xl p-5">
      <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Weather Widget
      </h1>

      <p class="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        - A simple widget made with Vue3 -
      </p>

      <div v-if="!isLoading" class="flex flex-column ">
        <WeatherWidgetItem :data="weatherData.current.temp" label="Temperature" metric="°C"/>
        <WeatherWidgetItem :data="weatherData.current.feels_like" label="Feels Like" metric="°C"/>
        <WeatherWidgetItem :data="weatherData.current.pressure" label="Pressure" metric="%"/>
        <WeatherWidgetItem :data="weatherData.current.humidity" label="Humidity" metric="hPa"/>
        <WeatherWidgetItem :data="weatherData.current.wind_speed" label="Wind Speed" metric="m/s"/>
        <WeatherWidgetItem :data="weatherData.current.wind_deg" label="Wind Degrees" metric="deg"/>
        <WeatherWidgetItem :data="weatherData.current.clouds" label="Clouds" metric="%"/>
      </div>

      <div>
        <!-- Line Chart Goes Here -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useWeatherStore } from '../stores/weatherStore.js'
  import WeatherWidgetItem from './BaseWeatherWidgetItem.vue'

  const weatherStore = useWeatherStore();
  const weatherData = ref({});
  const isLoading = ref(true);

  const fetchWeatherAPIData = async () => {
    weatherData.value = {};
		isLoading.value = true;

		try {
			await weatherStore.fetchWeatherData();
		} catch (error) {
			console.error(error);
		} finally {
			weatherData.value = weatherStore.weatherData;
      console.log(weatherData.value);
			isLoading.value = false;
		}
	};

  onMounted(fetchWeatherAPIData);
</script>


<style scoped>
  .fullpage-bg {
    background-image: linear-gradient(to bottom, #ADD8E6, #FFB6C1);
  }
</style>