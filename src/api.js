import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json'
    }
  })
}
