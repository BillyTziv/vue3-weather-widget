<template>
  <div class="fullpage-bg h-screen flex justify-center items-center ">
    <div class="container mx-auto max-w-5xl p-5">
      <!-- <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Weather Widget
      </h1>

      <p class="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        - A simple widget made with Vue3 -
      </p> -->

      <section v-if="!isLoading">
        <div class="flex flex-wrap bg-white py-10 rounded-lg bg-opacity-30 px-4">
          <div class="flex flex-col md:flex-row w-full">
            <div class="flex flex-row">
              <CurrentWeatherIcon :weather="selectedWeather.weather" />
              <CurrentWeatherTemperature :temperature="selectedWeather.temp" />
            </div>
           
            <CurrentWeatherDetails
              :feelsLike="selectedWeather.feels_like"
              :pressure="selectedWeather.pressure"
              :humidity="selectedWeather.humidity"
              :windSpeed="selectedWeather.wind_speed"
              :windDeg="selectedWeather.wind_deg"
              :clouds="selectedWeather.clouds"
            />
          </div>

          <div class="flex w-full">
            <TemperatureLineChart :maxTemperatures="maxTemperatures" />
          </div>

          <div class="mt-5 overflow-x-auto">
            <DayPicker :forecastWeather="forecastWeather" @selectedDate="handleSelectedDate" />
          </div>
        </div>
      </section>

      <section v-else>
        <!-- Add Some Loading Shimmering Effect -->
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

  const weatherStore = useWeatherStore();

  // Used to display the selected weather data.
  const selectedWeather = ref(null);

  // const currentWeather = ref({});
  const forecastWeather = ref({});
  const maxTemperatures = ref([]);

  const isLoading = ref(true);

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

    let filteredForcastedWeather = JSON.parse(JSON.stringify(forecastWeather.value)).filter( ( item ) => {
      if( selectedDate === item.dt ) {
        return item;
      }
    });

    filteredForcastedWeather = filteredForcastedWeather[0];
    filteredForcastedWeather.temp = filteredForcastedWeather.temp.eve;

    filteredForcastedWeather.feels_like = filteredForcastedWeather.feels_like.eve;

    selectedWeather.value = filteredForcastedWeather;

    forecastWeather.value = forecastWeather.value.map( (item) => {
      if( item.dt === selectedDate ) {
        item.selected = true;
      }else {
        item.selected = false;
      }
      return item;
    })
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