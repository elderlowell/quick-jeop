import api from '@/api'

export default {
  getData: () => api().get(`/data`),
  postData: (data) => api().post('/saveData', {
    data: data
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
}
