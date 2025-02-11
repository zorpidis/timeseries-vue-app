<template>
  <div v-if="!filteredTimeseries.length">
    <Spinner />
  </div>
  <div v-else class="home">
    <div class="date-selector">
      <label for="date-picker">Select date range:</label>
      <VueDatePicker class="date-picker" dark="{{document.documentElement.getAttribute('data-theme')=='dark'}}" id="date-picker" v-model="dateRange" :enable-time-picker="false" :range="{partialRange: false}"/>
    </div>
    <div class="content">
      <TimeseriesTable class="table" :timeseries="filteredTimeseries"/>
      <TimeseriesLineChart class="chart" :timeseries="filteredTimeseries" theme="{{document.getAttribute('data-theme')}}"/>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TimeseriesTable from '@/components/TimeseriesTable.vue';
import TimeseriesLineChart from '@/components/TimeseriesLineChart.vue';
import getTimeseries from '@/composables/getTimeseries';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'HomeView',
  components: { TimeseriesTable, VueDatePicker, TimeseriesLineChart, Spinner },
  setup() {
    const { timeseries, load } = getTimeseries()
    load()
    const isDarkMode = ref(document.documentElement.getAttribute('data-theme') === 'dark');
    
    const dateRange = ref([])
    const filteredTimeseries = computed(() => {
      if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
        return timeseries.value
      }
      console.log(dateRange.value)
      const start = new Date(dateRange.value[0])
      const end = new Date(dateRange.value[1])
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)

      return timeseries.value.filter(item => {
        const itemDate = new Date(item.DateTime)
        return itemDate >= start && itemDate <= end
      });
    });

    return { timeseries, filteredTimeseries, dateRange, isDarkMode };
  }
}
</script>

<style>
.home {
  padding: 20px;
}

.date-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.date-selector label {
  margin-right: 10px;
}

.date-selector .date-picker {
  width: 300px;
}

.content {
  display: flex;
  width: 100%;
}

.table {
  flex: 1;
  max-width: 33%;
}

.chart {
  flex: 2;
  max-width: 67%;
}

@media screen and (max-width: 768px) {
  .date-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-selector .date-picker {
    width: 100%;
  }

  .content {
    flex-direction: column;
    height: 100vh;
  }

  .table, .chart {
    max-width: 100%;
  }
}

@media screen and (max-width: 490px) {
  .date-selector {
    width: 100%;
  }
}

@media screen and (max-height: 768px) {
  .table, .chart {
    height: 60vh;
  }
}
</style>