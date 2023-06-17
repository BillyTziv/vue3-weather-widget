<template>
  <div class="w-full overflow-x-auto">
    <div class="flex justify-between">
      <div v-for="day in props.forecastWeather" :key="day.dt">
        <button @click="selectForecastWeather(day.dt)" :class="{
          'bg-opacity-5 border-opacity-25' : !day.selected }" class="p-2 mx-1 rounded-lg border border-teal-500 bg-teal-500 bg-opacity-20 hover:bg-opacity-20 hover:border-opacity-50 ease-in-out duration-100" >
          <ForecastDate :day="day.dt" />
          <ForecastIcon :icon="day.weather" />

          <div class="flex">
            <ForecastTemperature :temperature="day.temp" />
            <span>&#124;</span>
            <ForecastHumidity :humidity="day.humidity" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { getCurrentInstance, defineProps } from 'vue';

  import ForecastDate from './forecastWeather/BaseForecastDate.vue'
  import ForecastHumidity from './forecastWeather/BaseForecastHumidity.vue'
  import ForecastTemperature from './forecastWeather/BaseForecastTemperature.vue'
  import ForecastIcon from './forecastWeather/BaseForecastIcon.vue'

  const props = defineProps({
    forecastWeather: {
      type: Array,
      required: true
    }
  })

  const { emit } = getCurrentInstance();

  const selectForecastWeather = ( selectedDate ) => {
      emit('selectedDate', selectedDate);
  };
</script>