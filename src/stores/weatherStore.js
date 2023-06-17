import { defineStore } from 'pinia';

const baseURL = 'https://api.openweathermap.org';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    error: null,
  }),
  actions: {
    async fetchWeatherDataFromAPI() {
      try {
        const response = await fetch(`${baseURL}/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric`);
        const data = await response.json();
        this.weatherData = data;
      } catch (error) {
        this.error = error.message;
      }
    }
  },
});