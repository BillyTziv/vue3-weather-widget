<template>
  <div class="w-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

let chartInstance;
const chartCanvas = ref(null);

const props = defineProps({
  maxTemperatures: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  createChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

function createChart() {
  const canvas = chartCanvas.value;
  const ctx = canvas.getContext('2d');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: getMaxTemperatureLabels(),
      datasets: [
        {
          label: 'Max Temperature',
          data: props.maxTemperatures,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 5,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function getMaxTemperatureLabels() {
  const labels = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString('en', { weekday: 'short' });
    labels.push(day);
  }
  return labels;
}
</script>

<style scoped>
  canvas {
    width: 100%;
    height: 200px;
  }
</style>
