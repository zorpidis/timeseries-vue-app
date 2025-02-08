import { ref } from 'vue'

const getTimeseries = () => {
  const timeseries = ref([])

  const load = async () => {
    try{
      let data = await fetch('http://localhost:3000/timeseries')
      if(!data.ok) {
        throw new Error('Network response was not ok')
      }
      timeseries.value = await data.json()
    }
    catch(error) {
      console.error('There was a problem with your fetch operation:', error)
    }
  }

  return { timeseries, load }
}

export default getTimeseries