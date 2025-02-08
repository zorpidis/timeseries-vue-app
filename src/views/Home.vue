<template>
  <div class="home">
    <div class="date-selector">
      <label for="date-picker">Select date range:</label>
      <VueDatePicker class="date-picker" id="date-picker" v-model="dateRange" :enable-time-picker="false" :range="{partialRange: false}"/>
    </div>
    <TimeseriesTable :timeseries="filteredTimeseries"/>
    <TimeseriesLineGraph :timeseries="filteredTimeseries"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TimeseriesTable from '@/components/TimeseriesTable.vue';
import TimeseriesLineGraph from '@/components/TimeseriesLineChart.vue';
import getTimeseries from '@/composables/getTimeseries';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'HomeView',
  components: { TimeseriesTable, VueDatePicker, TimeseriesLineGraph },
  setup() {
    const { timeseries, load } = getTimeseries();
    load();
    const dateRange = ref([]);


    const filteredTimeseries = computed(() => {
      if (!dateRange.value[0] || !dateRange.value[1]) {
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

    return { timeseries, filteredTimeseries, dateRange };
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

@media screen and (max-width: 768px) {
  .date-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-selector .date-picker {
    width: 100%;
  }
}

@media screen and (max-width: 490px) {
  .date-selector {
    width: 100%;
  }
}
</style>