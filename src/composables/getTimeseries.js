import { ref } from 'vue'

const getTimeseries = () => {
  const timeseries = ref([])
  
  /*I'm setting the following function to async so that I can use the await
  keyword to wait for the fetch operation to complete in case I use an API 
  to fetch the data in the future*/
  const load = async () => {
    try{
      //this is added as a mock for a realistic wait time for a backend call in order to demonstrate the Spinner
      await new Promise(resolve => setTimeout(resolve, 1000))
      let data = await fetch('/db.json')
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