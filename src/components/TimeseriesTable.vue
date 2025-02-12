<template>
  <div class="table-container">
    <Modal :type="modalType"  @update:isVisible="handleModalVisibility" :message="modalMessage" :visible="isModalVisible" v-if="isModalVisible"/>
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
        <tr v-for="row in timeseries" :key="row.id" @click="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)" @keyup.enter="toggleEditMode(row,$event)" @keyup.escape="toggleEditMode(row,$event,row.ENTSOE_GR_DAM_Price,row.ENTSOE_DE_DAM_Price,row.ENTSOE_FR_DAM_Price)">
          <td>{{ formatDateTime(row.DateTime) }}</td>
          <td v-if="!editModes[row.id]" >{{ row.ENTSOE_GR_DAM_Price }} €</td>
          <td v-else class="input-td"><input type="number" v-model="row.ENTSOE_GR_DAM_Price"></td>
          <td v-if="!editModes[row.id]" >{{ row.ENTSOE_DE_DAM_Price }} €</td>
          <td v-else class="input-td"><input type="number" v-model="row.ENTSOE_DE_DAM_Price"></td>
          <td v-if="!editModes[row.id]" >{{ row.ENTSOE_FR_DAM_Price }} €</td>
          <td v-else class="input-td"><input type="number" v-model="row.ENTSOE_FR_DAM_Price"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import updateTimeseries from '@/composables/updateTimeseries'
import Modal from './Modal.vue'
import { ref } from 'vue'

export default {
  components: {
    Modal
  },
  props: ['timeseries'],
  setup() {
    const editModes = ref({})
    const editing = ref(false)
    const tempPrices = ref({})
    const isModalVisible = ref(false)
    const modalMessage = ref()
    const modalType = ref()
    

    const toggleEditMode = async (row,event,grPrice,dePrice,frPrice) => {
      if(event.type === 'click' && editing.value) {
        return
      }
      else if (event.type === 'click' && !editing.value) {
        editing.value = true
        editModes.value[row.id] = !editModes.value[row.id]
        tempPrices.value['grPrice'] = grPrice
        tempPrices.value['dePrice'] = dePrice
        tempPrices.value['frPrice'] = frPrice
      }
      else if((event.type === 'keyup' && event.key == 'Escape')) {
        row.ENTSOE_GR_DAM_Price = tempPrices.value['grPrice']
        row.ENTSOE_DE_DAM_Price = tempPrices.value['dePrice']
        row.ENTSOE_FR_DAM_Price = tempPrices.value['frPrice']
        editModes.value[row.id] = !editModes.value[row.id]
        editing.value = false
      }      
      else {
        const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value)

        if (!isNumber(row.ENTSOE_GR_DAM_Price) ||
            !isNumber(row.ENTSOE_DE_DAM_Price) ||
            !isNumber(row.ENTSOE_FR_DAM_Price) ||
            row.ENTSOE_GR_DAM_Price<=-2000 || row.ENTSOE_GR_DAM_Price>=2000 || 
            row.ENTSOE_DE_DAM_Price<=-2000 || row.ENTSOE_DE_DAM_Price>=2000 || 
            row.ENTSOE_FR_DAM_Price<=-2000 || row.ENTSOE_FR_DAM_Price>=2000
          ) {
          populateModal('Please enter a viable number between -2000 and 2000','warning')
          return
        }
        editModes.value[row.id] = !editModes.value[row.id]
        editing.value = false
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        row.ENTSOE_GR_DAM_Price = row.ENTSOE_GR_DAM_Price+''
        
        const { update, errorMessage} = updateTimeseries(row)
        await update()
        if(errorMessage.value){
          populateModal('Error editing data. '+errorMessage.value,'warning')
        }else{
          populateModal('Successfully edited the row.','success')
        }
      }
      
    }

    const formatDateTime = (dateTime) => {
      let date = new Date(dateTime)
      let day = String(date.getDate()).padStart(2, '0')
      let month = String(date.getMonth() + 1).padStart(2, '0')
      let year = date.getFullYear()
      let hours = String(date.getHours()).padStart(2, '0')
      let minutes = String(date.getMinutes()).padStart(2, '0')
      return `${day}-${month}-${year} ${hours}:${minutes}`
    }

    const populateModal = (message,type) => {
      modalMessage.value = message
      modalType.value = type
      isModalVisible.value = true
    }

    const handleModalVisibility = () => {
      isModalVisible.value = false
    }

    return { editModes, toggleEditMode, editing, formatDateTime,isModalVisible,handleModalVisibility,modalMessage,modalType }
  }
}
</script>

<style>
.table-container {
  height: 700px;
  overflow-y: auto;
  border-bottom: 1px solid var(--color-border);
}

.timeseries-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.timeseries-table th, .timeseries-table td {
  border: 1px solid var(--color-border);
  padding: 8px;
}

.timeseries-table th {
  background-color: var(--color-cell-odd);
  text-align: center;
}

.timeseries-table td {
  max-width: 30px;
}

.timeseries-table tr:nth-child(even) {
  background-color: var(--color-cell-even);
}

.timeseries-table tr:hover {
  background-color: var(--color-cell-odd);
}

.timeseries-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.timeseries-table input {
  width: 80%;
  box-sizing: border-box;
  padding: 0;
  background: transparent;
  border: 0;
  font-size: 17px;
  text-align: center;
}

.timeseries-table .input-td {
  background: var(--color-edit);
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>