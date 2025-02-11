<template>
  <div class="chart-container" v-if="timeseries && timeseries.length">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

export default defineComponent({
  name: 'TimeseriesLineChart',
  components: {
    Line
  },
  props: {
    timeseries: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const labels = computed(() => props.timeseries.map(item => item.DateTime));
    const price1 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_GR_DAM_Price)));
    const price2 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_DE_DAM_Price)));
    const price3 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_FR_DAM_Price)));
    const maxLabel = computed(() => labels.value[labels.value.length - 1]);
    const minLabel = computed(() => labels.value[0]);
    const allPrices = computed(() => [
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_GR_DAM_Price)),
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_DE_DAM_Price)),
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_FR_DAM_Price))
    ]);
    const maxPrice = computed(() => Math.max(...allPrices.value));

    console.log('Labels:', labels.value);
    console.log('Price1:', price1.value);
    console.log('Price2:', price2.value);
    console.log('Price3:', price3.value);

    const chartData = computed(() => {
      if (!props.timeseries || props.timeseries.length === 0) {
        console.log('No timeseries data available');
        return { labels: [], datasets: [] };
      }
      return {
        labels: labels.value,
        datasets: [
          {
            label: 'Greece',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: price1.value,
            fill: false
          },
          {
            label: 'Germany',
            backgroundColor: '#7acbf9',
            borderColor: '#7acbf9',
            data: price2.value,
            fill: false
          },
          {
            label: 'France',
            backgroundColor: '#79f879',
            borderColor: '#79f879',
            data: price3.value,
            fill: false
          }
        ]
      };
    });

    const chartOptions = computed(() => {
      if (!props.timeseries || props.timeseries.length === 0) {
        return {};
      }

      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDarkTheme ? '#77abb7' : '#2c3e50';
      const gridColor = isDarkTheme ? '#254B62' : '#ddd';

      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              tooltipFormat: 'MMM dd, yyyy HH:mm',
              displayFormats: {
                hour: 'MMM dd, HH:mm'
              }
            },
            min: minLabel.value,
            max: maxLabel.value,
            title: {
              display: true,
              text: 'Date',
              color: textColor
            }
          },
          y: {
            min: 0,
            max: maxPrice.value,
            title: {
              display: true,
              text: 'Price'
            }
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'x'
            }
          }
        }
      };
    });

    return { chartData, chartOptions };
  }
});
</script>

<style>
.chart-container {
  position: relative;
  height: 800px;
}
</style>