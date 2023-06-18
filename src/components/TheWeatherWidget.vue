<template>
  <div class="fullpage-bg h-screen flex justify-center items-center ">
    <div class="container mx-auto max-w-5xl p-5">
     <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Weather Widget
      </h1>

      <p class="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        - A simple widget made with Vue3 -
      </p> 

      <section v-if="!isLoading">
        <div class="flex flex-wrap bg-white py-10 rounded-lg bg-opacity-30 px-4">
          <!-- Current Weather -->
          <div class="flex flex-col md:flex-row w-full">
            <div class="flex flex-row">
              <!-- Current Weather Icon -->
              <CurrentWeatherIcon
                :weather="selectedWeather.weather"
              />

              <!-- Current Weather Teamperature -->
              <CurrentWeatherTemperature
                :temperature="selectedWeather.temp"
              />
            </div>
           
            <!-- Current Weather Details -->
            <CurrentWeatherDetails
              :feelsLike="selectedWeather.feels_like"
              :pressure="selectedWeather.pressure"
              :humidity="selectedWeather.humidity"
              :windSpeed="selectedWeather.wind_speed"
              :windDeg="selectedWeather.wind_deg"
              :clouds="selectedWeather.clouds"
            />
          </div>

          <!-- Max Temperature Line Chart -->
          <div class="flex w-full">
            <TemperatureLineChart
              :maxTemperatures="maxTemperatures"
            />
          </div>

          <!-- Day Picker -->
          <div class="mt-5 overflow-x-auto">
            <DayPicker
              :forecastWeather="forecastWeather"
              @selectedDate="handleSelectedDate"
            />
          </div>
        </div>
      </section>

      <section v-else>
        <!-- Loading Effect -->
      </section>
    </div>
  </div>
</template>

<script setup>
  /*** VueJS Libraries ***/
  import { ref, onMounted } from 'vue'

  /*** State Management ***/
  import { useWeatherStore } from '../stores/weatherStore.js'

  /*** Required Components ***/
  import CurrentWeatherIcon from './currentWeather/CurrentWeatherIcon.vue'
  import CurrentWeatherTemperature from './currentWeather/CurrentWeatherTemperature.vue'
  import CurrentWeatherDetails from './currentWeather/CurrentWeatherDetails.vue'
  import DayPicker from './TheDayPicker.vue'
  import TemperatureLineChart from './charts/TheTemperatureLineChart.vue'

  import cloneDeep from 'lodash/cloneDeep';

  const weatherStore = useWeatherStore();
  const isLoading = ref(true);

  const selectedWeather = ref(null);
  const forecastWeather = ref({});
  const maxTemperatures = ref([]);

  const getCurrentWeatherData = async () => {
		isLoading.value = true;

		try {
			await weatherStore.fetchWeatherDataFromAPI();
		} catch (error) {
			console.error(error);
      isLoading.value = false;
		} finally {
			selectedWeather.value = weatherStore.weatherData.current;
      forecastWeather.value = weatherStore.weatherData.daily;

      maxTemperatures.value = forecastWeather.value.map( (item) => {
        if( item.temp.max ) return item.temp.max;
      })

			isLoading.value = false;
		}
	};

  function getForecastWeatherDataByDate( selectedDate ) {
    let filteredForecastedWeather = cloneDeep(forecastWeather.value).find(item => selectedDate === item.dt);

    // Selected date is not available.
    if( !selectedWeather.value ) {
      console.error("You have selected an invalid date.");
      return;
    }

    filteredForecastedWeather.temp = filteredForecastedWeather.temp.eve;
    filteredForecastedWeather.feels_like = filteredForecastedWeather.feels_like.eve;

    selectedWeather.value = filteredForecastedWeather;

    // Mark selected date, so that we can add some style later.
    forecastWeather.value.forEach(item => {
      item.selected = (item.dt === selectedDate);
    });
	};

  const handleSelectedDate = ( date ) => {
    getForecastWeatherDataByDate( date )
  };

  onMounted(getCurrentWeatherData);
</script>

<style scoped>
  .fullpage-bg {
    background-image: linear-gradient(to bottom, #ADD8E6, #FFB6C1);
  }
</style>