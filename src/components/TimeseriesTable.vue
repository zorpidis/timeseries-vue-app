<template>
  <div class="table-container">
    <table class="timeseries-table">
      <thead>
        <tr>
          <th rowspan="2">MTU</th>
          <th colspan="3">Day-ahead Price</th>
        </tr>
        <tr>
          <th colspan="1" rowspan="1">GR</th>
          <th colspan="1" rowspan="1">DE</th>
          <th colspan="1" rowspan="1">FR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in timeseries" :key="row.DateTime">
          <td>{{ formatDateTime(row.DateTime) }}</td>
          <td @click="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" v-if="!editModes[row.DateTime]" >{{ row.ENTSOE_GR_DAM_Price }} €</td>
          <td class="input-td" v-else><input type="number" v-model="row.ENTSOE_GR_DAM_Price" @keyup.enter="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" @keyup.escape="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)"  autofocus></td>
          <td @click="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" v-if="!editModes[row.DateTime]" >{{ row.ENTSOE_DE_DAM_Price }} €</td>
          <td class="input-td" v-else><input type="number" v-model="row.ENTSOE_DE_DAM_Price" @keyup.enter="toggleEditMode(row,$event)" @keyup.escape="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" autofocus></td>
          <td @click="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" v-if="!editModes[row.DateTime]" >{{ row.ENTSOE_FR_DAM_Price }} €</td>
          <td class="input-td" v-else><input type="number" v-model="row.ENTSOE_FR_DAM_Price" @keyup.enter="toggleEditMode(row,$event)" @keyup.escape="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" autofocus></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import updateTimeseries from '@/composables/updateTimeseries';
import { ref } from 'vue';

export default {
  props: ['timeseries'],
  setup() {
    const editModes = ref({})
    const editing = ref(false)
    const tempPrices = ref({})
    

    const toggleEditMode = (row,event,grPrice,dePrice,frPrice) => {
      if(event.type === 'click' && editing.value) {
        return
      }
      else if (event.type === 'click' && !editing.value) {
        editing.value = true
        editModes.value[row.DateTime] = !editModes.value[row.DateTime]
        tempPrices.value['grPrice'] = grPrice
        tempPrices.value['dePrice'] = dePrice
        tempPrices.value['frPrice'] = frPrice
      }
      else if(event.type === 'keyup' && event.key == 'Escape') {
        row.ENTSOE_GR_DAM_Price = tempPrices.value['grPrice']
        row.ENTSOE_DE_DAM_Price = tempPrices.value['dePrice']
        row.ENTSOE_FR_DAM_Price = tempPrices.value['frPrice']
        editModes.value[row.DateTime] = !editModes.value[row.DateTime]
        editing.value = false
      }      
      else {
        const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

        if (!isNumber(row.ENTSOE_GR_DAM_Price) || !isNumber(row.ENTSOE_DE_DAM_Price) || !isNumber(row.ENTSOE_FR_DAM_Price)) {
          alert('Please enter a valid number')
          return
        }
        editModes.value[row.DateTime] = !editModes.value[row.DateTime]
        editing.value = false
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        /* I have comented out this section as it is not going to be working
        on the version hosted in vercel. However I am keeping it as is for future
        demonstration purposes.
        
        const { update, errorMessage} = updateTimeseries(row)
        update()*/
      }
      
    };

    const formatDateTime = (dateTime) => {
      let date = new Date(dateTime);
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let year = date.getFullYear();
      let hours = String(date.getHours()).padStart(2, '0');
      let minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    return { editModes, toggleEditMode, editing, formatDateTime}
  }
}
</script>

<style>
.table-container {
  height: 700px;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;
}

.timeseries-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.timeseries-table th, .timeseries-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.timeseries-table th {
  background-color: #f2f2f2;
  text-align: center;
}

.timeseries-table td {
  max-width: 30px;
}

.timeseries-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.timeseries-table tr:hover {
  background-color: #ddd;
}

.timeseries-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.timeseries-table input {
  width: 10vw;
  box-sizing: border-box;
  padding: 0;
  background: transparent;
  border: 0;
  font-size: 17px;
  text-align: center;
}

.timeseries-table .input-td {
  background: #3e8de7;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>