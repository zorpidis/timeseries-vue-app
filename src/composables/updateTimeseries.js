import { ref } from 'vue'

const updateTimeseries = (row) => {
  const errorMessage = ref(null)

  const update = async () => {
    try{
      let data = await fetch('http://localhost:3000/timeseries/'+row.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
      })
      if(!data.ok) {
        throw new Error('Network response was not ok')
      }
    }
    catch(error) {
      errorMessage.value = error.message
      console.log(errorMessage.value)
    }
  }
  return { update,errorMessage }
}

export default updateTimeseries