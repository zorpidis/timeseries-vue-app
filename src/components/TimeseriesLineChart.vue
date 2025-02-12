<template>
  <div class="chart-container" v-if="timeseries && timeseries.length">
    <div class="color-pickers">
      <label for="colorGR">GR:</label>
      <input type="color" v-model="colorGR" />
      <label for="colorDE">DE:</label>
      <input type="color" v-model="colorDE" />
      <label for="colorFR">FR:</label>
      <input type="color" v-model="colorFR" />
    </div>
    
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
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
)

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
    const labels = computed(() => props.timeseries.map(item => item.DateTime))
    const price1 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_GR_DAM_Price)))
    const price2 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_DE_DAM_Price)))
    const price3 = computed(() => props.timeseries.map(item => parseFloat(item.ENTSOE_FR_DAM_Price)))
    const maxLabel = computed(() => labels.value[labels.value.length - 1])
    const minLabel = computed(() => labels.value[0])
    const allPrices = computed(() => [
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_GR_DAM_Price)),
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_DE_DAM_Price)),
      ...props.timeseries.map(item => parseFloat(item.ENTSOE_FR_DAM_Price))
    ])
    const maxPrice = computed(() => Math.max(...allPrices.value))

    const colorGR = ref('#0100a9')
    const colorDE = ref('#c76c4e')
    const colorFR = ref('#71b504')
    

    const chartData = computed(() => {
      if (!props.timeseries || props.timeseries.length === 0) {
        return { labels: [], datasets: [] }
      }
      return {
        labels: labels.value,
        datasets: [
          {
            label: 'Greece',
            backgroundColor: colorGR.value,
            borderColor: colorGR.value,
            data: price1.value,
            fill: false
          },
          {
            label: 'Germany',
            backgroundColor: colorDE.value,
            borderColor: colorDE.value,
            data: price2.value,
            fill: false
          },
          {
            label: 'France',
            backgroundColor: colorFR.value,
            borderColor: colorFR.value,
            data: price3.value,
            fill: false
          }
        ]
      }
    })

    const chartOptions = computed(() => {
      if (!props.timeseries || props.timeseries.length === 0) {
        return {}
      }

    

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
              text: 'Date'
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
          legend: {
            display: false 
          },
          tooltip: {
            enabled: false 
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          }
        }
      }
    })

    return { chartData, chartOptions, colorGR, colorDE, colorFR }
  }
})
</script>

<style>
.chart-container {
  position: relative;
  height: 700px;
}

@media (max-width: 767px) {
  .chart-container {
    margin-top: 10%;
  position: relative;
  height: 300px;
}
}

.color-pickers {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}


input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 20px;
	height: 20px;
  margin-right: 4.2vw;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
</style>