import { ref } from 'vue'

const getTimeseries = () => {
  const timeseries = ref([])

  const load = async () => {
    try{
      let data = await fetch('https://67a79d14203008941f681c13.mockapi.io/api/timeseries')
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